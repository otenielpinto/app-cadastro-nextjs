import { useState, useCallback } from "react";
import { ClientData } from "@/types/client";

export const useInputMask = () => {
  const cpfCnpjMask = useCallback((value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      return numbers.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
  }, []);

  const cepMask = useCallback((value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  }, []);

  const phoneMask = useCallback((value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  }, []);

  return {
    cpfCnpjMask,
    cepMask,
    phoneMask,
  };
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback(
    (name: string, value: string, required = false) => {
      const newErrors = { ...errors };

      if (required && !value.trim()) {
        newErrors[name] = "Este campo é obrigatório";
      } else if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[name] = "Email inválido";
      } else if (name === "cpfCnpj" && value) {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length !== 11 && numbers.length !== 14) {
          newErrors[name] =
            "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos";
        } else {
          delete newErrors[name];
        }
      } else {
        delete newErrors[name];
      }

      setErrors(newErrors);
      return !newErrors[name];
    },
    [errors]
  );

  const validateStep = useCallback(
    (formData: Partial<ClientData>, step: number) => {
      let isValid = true;
      const newErrors: Record<string, string> = {};

      if (step === 1) {
        // Validar dados básicos
        if (!formData.nomeCompleto?.trim()) {
          newErrors.nomeCompleto = "Nome completo é obrigatório";
          isValid = false;
        }
        if (!formData.cpfCnpj?.trim()) {
          newErrors.cpfCnpj = "CPF/CNPJ é obrigatório";
          isValid = false;
        } else {
          const numbers = formData.cpfCnpj.replace(/\D/g, "");
          if (numbers.length !== 11 && numbers.length !== 14) {
            newErrors.cpfCnpj =
              "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos";
            isValid = false;
          }
        }
      } else if (step === 2) {
        // Validar endereço
        if (!formData.cep?.trim()) {
          newErrors.cep = "CEP é obrigatório";
          isValid = false;
        }
        if (!formData.endereco?.trim()) {
          newErrors.endereco = "Endereço é obrigatório";
          isValid = false;
        }
        if (!formData.numero?.trim()) {
          newErrors.numero = "Número é obrigatório";
          isValid = false;
        }
      } else if (step === 3) {
        // Validar contato
        if (!formData.email?.trim()) {
          newErrors.email = "Email é obrigatório";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email inválido";
          isValid = false;
        }
      }

      setErrors(newErrors);
      return isValid;
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    setErrors, // Expondo a função setErrors
    validateField,
    validateStep,
    clearErrors,
  };
};
