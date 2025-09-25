"use client";

import { useState } from "react";
import { ClientData, StepNumber } from "@/types/client";
import { useFormValidation } from "@/hooks/useFormUtils";
import { createCliente } from "@/actions/clienteAction"; // Importa a server action
import ProgressIndicator from "@/components/ProgressIndicator";
import DadosBasicos from "@/components/steps/DadosBasicos";
import Endereco from "@/components/steps/Endereco";
import Contato from "@/components/steps/Contato";
import SuccessMessage from "@/components/SuccessMessage";

const initialData: Partial<ClientData> = {
  nomeCompleto: "",
  cpfCnpj: "",
  inscricaoEstadual: "",
  cep: "",
  endereco: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  complemento: "",
  localEntrega: "",
  horarioInicio: "",
  horarioFim: "",
  diasSemana: [],
  temAlmoco: false,
  almocoInicio: "",
  almocoFim: "",
  telefoneFixo1: "",
  telefoneFixo2: "",
  whatsapp: "",
  email: "",
  emailNF: "",
};

export default function CadastroCliente() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<Partial<ClientData>>(initialData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const { errors, validateStep, clearErrors, setErrors } = useFormValidation();

  // Estados locais para loading e erro
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof ClientData,
    value: string | string[] | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (validateStep(formData, currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as StepNumber);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepNumber);
      clearErrors();
    }
  };

  const handleSubmit = async () => {
    console.log("Botão Finalizar clicado. Validando o passo final...");
    if (validateStep(formData, currentStep)) {
      console.log("Validação do passo passou. Iniciando submissão...");
      setLoading(true);
      setApiError(null);

      try {
        // Chamar a server action diretamente
        console.log("Enviando dados para a server action:", formData);
        const response = await createCliente(formData as ClientData);
        console.log("Resposta recebida da server action:", response);

        if (response.success && response.data) {
          console.log("Submissão bem-sucedida. Exibindo mensagem de sucesso.");
          setClientId(response.data.id);
          setShowSuccess(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          let errorMessage = response.message || "Ocorreu um erro desconhecido.";

          if (response.errors) {
            console.error("A action retornou erros de validação:", response.errors);
            setErrors(response.errors);

            // Formata os erros para exibição no banner principal
            const errorDetails = Object.values(response.errors).join('; ');
            errorMessage = `Por favor, corrija os seguintes erros: ${errorDetails}`;

            // Mapeia campos para suas respectivas etapas
            const fieldToStep: Record<string, StepNumber> = {
              nomeCompleto: 1, cpfCnpj: 1,
              cep: 2, endereco: 2, numero: 2, bairro: 2, cidade: 2, uf: 2, localEntrega: 2, diasSemana: 2,
              email: 3,
            };

            // Encontra o primeiro campo com erro e navega para a etapa correspondente
            const firstErrorField = Object.keys(fieldToStep).find(field => response.errors?.[field]);
            if (firstErrorField) {
              const stepToGo = fieldToStep[firstErrorField];
              setCurrentStep(stepToGo);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          } else {
            console.error("A action retornou um erro genérico.");
          }

          setApiError(errorMessage); // Define a mensagem de erro detalhada
        }
      } catch (error) {
        console.error("Uma exceção ocorreu ao chamar a action:", error);
        setApiError("Erro de comunicação com o servidor. Tente novamente.");
      } finally {
        console.log("Finalizando o processo de submissão.");
        setLoading(false);
      }
    } else {
      console.error(
        "A validação do passo final falhou. Verifique os campos do formulário."
      );
      // Forçar a exibição de uma mensagem de erro genérica se a validação falhar silenciosamente
      setApiError(
        "Preencha todos os campos obrigatórios em todas as etapas antes de finalizar."
      );
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setCurrentStep(1);
    setShowSuccess(false);
    setClientId(null);
    clearErrors();
    setApiError(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DadosBasicos
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <Endereco
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <Contato
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Cadastro de Clientes
            </h1>
            <p className="text-gray-600">
              Preencha os dados para completar o cadastro
            </p>
          </div>

          <SuccessMessage onReset={handleReset} clientId={clientId} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Cadastro de Clientes
          </h1>
          <p className="text-gray-600">
            Preencha os dados para completar o cadastro
          </p>
        </div>

        <ProgressIndicator currentStep={currentStep} />

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Exibir erro da API se houver */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erro ao cadastrar cliente
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{apiError}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setApiError(null)}
                    className="inline-flex text-red-400 hover:text-red-600"
                  >
                    <span className="sr-only">Fechar</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {renderCurrentStep()}
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePrev}
              className={`btn-secondary px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                currentStep === 1 ? "invisible" : ""
              }`}
            >
              ← Anterior
            </button>

            <div className="flex-1"></div>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Próximo →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`btn-primary px-8 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Salvando...
                  </>
                ) : (
                  <>✓ Finalizar Cadastro</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
