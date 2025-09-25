"use client";

import { ClientData } from "@/types/client";
import { useInputMask } from "@/hooks/useFormUtils";

interface DadosBasicosProps {
  data: Partial<ClientData>;
  onChange: (field: keyof ClientData, value: string) => void;
  errors: Record<string, string>;
}

export default function DadosBasicos({
  data,
  onChange,
  errors,
}: DadosBasicosProps) {
  const { cpfCnpjMask } = useInputMask();

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = cpfCnpjMask(e.target.value);
    onChange("cpfCnpj", maskedValue);
  };

  return (
    <div className="form-slide active">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Dados Básicos
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo / Razão Social *
          </label>
          <input
            type="text"
            value={data.nomeCompleto || ""}
            onChange={(e) => onChange("nomeCompleto", e.target.value)}
            className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
              errors.nomeCompleto ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite o nome completo ou razão social"
          />
          {errors.nomeCompleto && (
            <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPF / CNPJ *
            </label>
            <input
              type="text"
              value={data.cpfCnpj || ""}
              onChange={handleCpfCnpjChange}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.cpfCnpj ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="000.000.000-00"
              maxLength={18}
            />
            {errors.cpfCnpj && (
              <p className="text-red-500 text-sm mt-1">{errors.cpfCnpj}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inscrição Estadual
            </label>
            <input
              type="text"
              value={data.inscricaoEstadual || ""}
              onChange={(e) => onChange("inscricaoEstadual", e.target.value)}
              className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Caso não possui deixar campo em branco"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
