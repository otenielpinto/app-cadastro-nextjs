"use server";

import { TMongo } from "@/infra/mongoClient";
import { ClientData } from "@/types/client";
import { toTinyContactPayload } from "@/mappers/clienteMappers";
import { postIncluirContato } from "@/api/tinyApi";
import { newUUId } from "@/utils/lib";
import { createLog } from "./logActions";

// Interface para a resposta da API
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

// Interface para dados do cliente criado
interface ClienteCreated {
  id: string;
  nomeCompleto: string;
  cpfCnpj: string;
  email: string;
  createdAt: string;
}

// Função para validar CPF/CNPJ (simplificada)
function isValidCpfCnpj(cpfCnpj: string): boolean {
  const cleaned = cpfCnpj.replace(/\D/g, "");
  return cleaned.length === 11 || cleaned.length === 14;
}

// Função para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função de validação dos dados
function validateClientData(data: Partial<ClientData>): Record<string, string> {
  const errors: Record<string, string> = {};

  // Validações obrigatórias
  if (!data.nomeCompleto?.trim()) {
    errors.nomeCompleto = "Nome completo é obrigatório";
  }

  if (!data.cpfCnpj?.trim()) {
    errors.cpfCnpj = "CPF/CNPJ é obrigatório";
  } else if (!isValidCpfCnpj(data.cpfCnpj)) {
    errors.cpfCnpj = "CPF/CNPJ deve ter 11 ou 14 dígitos";
  }

  if (!data.email?.trim()) {
    errors.email = "Email é obrigatório";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Email deve ter formato válido";
  }

  if (!data.cep?.trim()) {
    errors.cep = "CEP é obrigatório";
  }

  if (!data.endereco?.trim()) {
    errors.endereco = "Endereço é obrigatório";
  }

  if (!data.numero?.trim()) {
    errors.numero = "Número é obrigatório";
  }

  if (!data.bairro?.trim()) {
    errors.bairro = "Bairro é obrigatório";
  }

  if (!data.cidade?.trim()) {
    errors.cidade = "Cidade é obrigatória";
  }

  if (!data.uf?.trim()) {
    errors.uf = "UF é obrigatório";
  }

  // Validação de dias da semana
  if (!data.diasSemana || data.diasSemana.length === 0) {
    errors.diasSemana = "Pelo menos um dia da semana deve ser selecionado";
  }

  return errors;
}

export async function createCliente(
  clientData: ClientData
): Promise<ApiResponse<ClienteCreated>> {
  try {
    console.log("Iniciando cadastro de cliente:", clientData.nomeCompleto);

    // Validar dados
    const errors = validateClientData(clientData);

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Existem erros de validação no formulário.",
        errors,
      };
    }

    // Conectar ao MongoDB
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Preparar dados para inserção
    const clienteToInsert = {
      ...clientData,
      id: newUUId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Inserir no banco
    const result = await clientdb
      .collection("tmp_cliente")
      .insertOne(clienteToInsert);

    // Desconectar do MongoDB
    await TMongo.mongoDisconnect(client);

    // Verificar se foi inserido com sucesso no DB local
    if (!result.insertedId) {
      throw new Error("Falha ao inserir cliente no banco de dados");
    }

    // Após o sucesso local, tenta enviar para a API da Tiny
    try {
      console.log("Mapeando e enviando dados para a API da Tiny...");
      const tinyPayload = toTinyContactPayload(clienteToInsert);
      const tinyResponse = await postIncluirContato(tinyPayload);
      await createLog({
        timestamp: new Date().toISOString(),
        payload: tinyPayload,
        response: tinyResponse?.data?.retorno,
      });

      if (tinyResponse?.data?.retorno?.status === "OK") {
        console.log(
          "Contato enviado com sucesso para a API da Tiny.",
          tinyResponse.data.retorno
        );
      } else {
        console.error(
          "Erro ao enviar contato para a API da Tiny:",
          tinyResponse?.data?.retorno?.registros || "Resposta inesperada"
        );
      }
    } catch (tinyError) {
      console.error("Erro crítico ao chamar a API da Tiny:", tinyError);
    }

    console.log(
      "Cliente cadastrado com sucesso no DB local:",
      result.insertedId
    );

    // Retornar resposta de sucesso
    return {
      success: true,
      message: "Cliente cadastrado com sucesso",
      data: {
        id: clienteToInsert.id,
        nomeCompleto: clienteToInsert.nomeCompleto,
        cpfCnpj: clienteToInsert.cpfCnpj,
        email: clienteToInsert.email,
        createdAt: clienteToInsert.createdAt,
      },
    };
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);

    return {
      success: false,
      message: "Erro interno do servidor",
      errors: {
        server: error instanceof Error ? error.message : "Erro desconhecido",
      },
    };
  }
}
