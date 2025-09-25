export interface ClientData {
  // Dados Básicos
  nomeCompleto: string;
  cpfCnpj: string;
  inscricaoEstadual: string;

  // Endereço
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  localEntrega: string;

  // Horário de funcionamento
  horarioInicio: string;
  horarioFim: string;
  diasSemana: string[];

  // Horário de almoço
  temAlmoco: boolean;
  almocoInicio: string;
  almocoFim: string;

  // Contato
  nomeComprador: string;
  telefoneFixo1: string;
  telefoneFixo2: string;
  whatsapp: string;
  email: string;
  emailNF: string;
}

export type StepNumber = 1 | 2 | 3;

export interface StepConfig {
  number: StepNumber;
  title: string;
  label: string;
}

export const STEPS: StepConfig[] = [
  { number: 1, title: "Dados Básicos", label: "Dados Básicos" },
  { number: 2, title: "Endereço", label: "Endereço" },
  { number: 3, title: "Informações de Contato", label: "Contato" },
];
