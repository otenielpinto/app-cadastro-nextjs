"use client";

import { useState } from "react";
import { ClientData, StepNumber } from "@/types/client";
import { useFormValidation } from "@/hooks/useFormUtils";
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
  complemento: "",
  localEntrega: "",
  horarioInicio: "",
  horarioFim: "",
  diasSemana: [],
  temAlmoco: false,
  almocoInicio: "",
  almocoFim: "",
  nomeComprador: "",
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
  const { errors, validateStep, clearErrors } = useFormValidation();

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

  const handleSubmit = () => {
    if (validateStep(formData, currentStep)) {
      // Simular envio dos dados
      console.log("Dados do cliente:", formData);

      // Mostrar mensagem de sucesso
      setShowSuccess(true);

      // Scroll para o topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setCurrentStep(1);
    setShowSuccess(false);
    clearErrors();
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

          <SuccessMessage onReset={handleReset} />
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
                className="btn-primary px-8 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ✓ Finalizar Cadastro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
