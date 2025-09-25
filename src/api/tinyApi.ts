import axios from "axios";
import qs from "qs";
import { TinyContactPayload } from "@/mappers/clienteMappers";

const base_url = "https://api.tiny.com.br/api2/";

interface TinyApiParams {
  key: string;
  value: string | object;
}

interface TinyApiResponse {
  data: {
    retorno?: {
      status: string;
      registros?: unknown[];
    };
  };
}

export const tinyApi = async (
  apiUrl: string,
  data: TinyApiParams[] = [],
  method: "GET" | "POST" = "GET"
): Promise<TinyApiResponse | null> => {
  let body = "";
  let contentData = "";
  const params = new URLSearchParams();
  for (const item of data) {
    if (item.key == "data") contentData = JSON.stringify(item.value);
    else if (typeof item.value == "object")
      body = `&${item.key}=` + JSON.stringify(item.value);
    else if (item.key == "data_xml")
      contentData = qs.stringify({ xml: item.value });
    else params.append(item.key, item.value);
  }
  let response = null;

  try {
    response = await axios({
      method,
      url: `${base_url}${apiUrl}?${params.toString()}${body}`,
      data: contentData,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    return response;
  } catch (error) {
    console.log("🚀 ~ file: tinyApi.js:33 ~ module.exports= ~ error:", error);
    return response;
  }
};

/**
 * Envia uma requisição para incluir um novo contato na API da Tiny.
 */
export const postIncluirContato = async (
  payload: TinyContactPayload
): Promise<TinyApiResponse | null> => {
  if (!process.env.TINY_API_TOKEN) {
    throw new Error("Token da API da Tiny não configurado em .env");
  }

  const data = [
    { key: "token", value: process.env.TINY_API_TOKEN },
    { key: "formato", value: "json" },
    // O payload já está no formato { contatos: [{ contato: {...} }] }
    // A API da Tiny espera o JSON dentro de um campo `dados`
    { key: "contato", value: { contatos: [payload] } },
  ];

  // O endpoint para incluir um contato é 'contato.incluir.php'
  // O método, baseado na documentação da Tiny, deve ser POST
  return await tinyApi("contato.incluir.php", data, "POST");
};
