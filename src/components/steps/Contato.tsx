"use client";

import { ClientData } from "@/types/client";
import { useInputMask } from "@/hooks/useFormUtils";

interface ContatoProps {
  data: Partial<ClientData>;
  onChange: (field: keyof ClientData, value: string) => void;
  errors: Record<string, string>;
}

export default function Contato({ data, onChange, errors }: ContatoProps) {
  const { phoneMask } = useInputMask();

  const handlePhoneChange =
    (field: keyof ClientData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = phoneMask(e.target.value);
      onChange(field, maskedValue);
    };

  return (
    <div className="form-slide active">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Informações de Contato
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Comprador *
          </label>
          <input
            type="text"
            value={data.nomeComprador || ""}
            onChange={(e) => onChange("nomeComprador", e.target.value)}
            className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
              errors.nomeComprador ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nome da pessoa responsável pelas compras"
          />
          {errors.nomeComprador && (
            <p className="text-red-500 text-sm mt-1">{errors.nomeComprador}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone Fixo
            </label>
            <input
              type="tel"
              value={data.telefoneFixo1 || ""}
              onChange={handlePhoneChange("telefoneFixo1")}
              className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="(11) 0000-0000"
              maxLength={15}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone Fixo 2
            </label>
            <input
              type="tel"
              value={data.telefoneFixo2 || ""}
              onChange={handlePhoneChange("telefoneFixo2")}
              className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="(11) 0000-0000"
              maxLength={15}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp *
          </label>
          <input
            type="tel"
            value={data.whatsapp || ""}
            onChange={handlePhoneChange("whatsapp")}
            className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
              errors.whatsapp ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="(11) 90000-0000"
            maxLength={15}
          />
          {errors.whatsapp && (
            <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="email@exemplo.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email para envio da Nota Fiscal
          </label>
          <input
            type="email"
            value={data.emailNF || ""}
            onChange={(e) => onChange("emailNF", e.target.value)}
            className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="nf@exemplo.com"
          />
        </div>
      </div>
    </div>
  );
}
