// Codigo de contribuinte:
// 0 - Não informado
// 1 - Contribuinte ICMS
// 2 - Contribuinte Isento
// 9 - Não Contribuinte

import { ClientData } from "@/types/client";

/**
 * Interface para o payload de contato esperado pela API da Tiny.
 */
export interface TinyContactPayload {
  contato: {
    sequencia?: string;
    codigo?: string;
    nome: string;
    tipo_pessoa: "F" | "J";
    cpf_cnpj: string;
    ie?: string;
    rg?: string;
    im?: string;
    endereco: string;
    numero: string;
    complemento?: string;
    bairro?: string;
    cep: string;
    cidade?: string;
    uf?: string;
    pais?: string;
    contatos?: string;
    fone?: string;
    fax?: string;
    celular?: string;
    email?: string;
    id_vendedor?: string;
    situacao?: "A" | "I" | "E";
    obs?: string;
    contribuinte?: "1" | "2" | "9";
    tipos_contato?: { tipo: string }[];
    email_nfe?: string;
  };
}

/**
 * Mapeia os dados do formulário de cliente para o formato de payload da API da Tiny.
 * @param clientData - Os dados do cliente vindos do formulário.
 * @returns O objeto de payload formatado para a API da Tiny.
 */
export function toTinyContactPayload(
  clientData: Partial<ClientData>
): TinyContactPayload {
  // Remove caracteres não numéricos do CPF/CNPJ para determinar o tipo de pessoa
  const cleanedCpfCnpj = clientData.cpfCnpj?.replace(/\D/g, "") || "";
  const tipoPessoa = cleanedCpfCnpj.length === 11 ? "F" : "J";

  // Concatena observações relevantes em um único campo
  const obs = [
    clientData.localEntrega
      ? `Local de Entrega: ${clientData.localEntrega}`
      : "",
    clientData.horarioInicio && clientData.horarioFim
      ? `Horário de Entrega: ${clientData.horarioInicio} às ${clientData.horarioFim}`
      : "",
    clientData.temAlmoco && clientData.almocoInicio && clientData.almocoFim
      ? `Intervalo de Almoço: ${clientData.almocoInicio} às ${clientData.almocoFim}`
      : "",
    clientData.diasSemana && clientData.diasSemana.length > 0
      ? `Dias de Entrega: ${clientData.diasSemana
          .map((dia) => dia.charAt(0).toUpperCase() + dia.slice(1))
          .join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join(" | ")
    .slice(0, 200);

  const contato: TinyContactPayload = {
    contato: {
      sequencia: "1",
      // O código pode ser gerado pela API da Tiny, então enviamos vazio.
      nome: clientData.nomeCompleto || "",
      tipo_pessoa: tipoPessoa,
      cpf_cnpj: cleanedCpfCnpj,
      ie: clientData.inscricaoEstadual || "",
      rg: "", // Campo não presente no formulário
      im: "", // Campo não presente no formulário
      endereco: clientData.endereco || "",
      numero: clientData.numero || "",
      complemento: clientData.complemento || "",
      // Campos que idealmente seriam preenchidos por uma API de CEP
      bairro: clientData.bairro || "",
      cep: clientData.cep?.replace(/\D/g, "") || "",
      cidade: clientData.cidade || "",
      uf: clientData.uf || "",
      pais: "Brasil",
      contatos: clientData.nomeCompleto || "",
      fone: clientData.telefoneFixo1 || "",
      fax: clientData.telefoneFixo2 || "",
      celular: clientData.whatsapp || "",
      email: clientData.email || "",
      // id_vendedor: "", // A ser definido se necessário
      situacao: "A" as const, // "A" para Ativo
      obs: obs,
      tipos_contato: [
        {
          tipo: "Cliente",
        },
      ],

      // 1 - Contribuinte ICMS, 2 - Contribuinte Isento, 9 - Não Contribuinte
      contribuinte: clientData.inscricaoEstadual
        ? ("1" as const)
        : ("9" as const),
      email_nfe: clientData.emailNF || "",
    },
  };

  // Retorna o objeto de payload formatado
  return contato;
}
