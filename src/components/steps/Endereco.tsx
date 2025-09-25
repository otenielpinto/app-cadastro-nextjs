"use client";

import { useState } from "react";
import { ClientData } from "@/types/client";
import { useInputMask } from "@/hooks/useFormUtils";

interface EnderecoProps {
  data: Partial<ClientData>;
  onChange: (
    field: keyof ClientData,
    value: string | string[] | boolean
  ) => void;
  errors: Record<string, string>;
}

export default function Endereco({ data, onChange, errors }: EnderecoProps) {
  const { cepMask } = useInputMask();
  const [almocoEnabled, setAlmocoEnabled] = useState(data.temAlmoco || false);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = cepMask(e.target.value);
    onChange("cep", maskedValue);
  };

  const handleDayChange = (day: string, checked: boolean) => {
    const currentDays = data.diasSemana || [];
    let newDays: string[];

    if (checked) {
      newDays = [...currentDays, day];
    } else {
      newDays = currentDays.filter((d) => d !== day);
    }

    onChange("diasSemana", newDays);
  };

  const handleAlmocoToggle = (checked: boolean) => {
    setAlmocoEnabled(checked);
    onChange("temAlmoco", checked);
    if (!checked) {
      onChange("almocoInicio", "");
      onChange("almocoFim", "");
    }
  };

  const diasSemana = [
    { id: "segunda", label: "Segunda" },
    { id: "terca", label: "Terça" },
    { id: "quarta", label: "Quarta" },
    { id: "quinta", label: "Quinta" },
    { id: "sexta", label: "Sexta" },
    { id: "sabado", label: "Sábado" },
    { id: "domingo", label: "Domingo" },
  ];

  return (
    <div className="form-slide active">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Endereço
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CEP *
            </label>
            <input
              type="text"
              value={data.cep || ""}
              onChange={handleCepChange}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.cep ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="00000-000"
              maxLength={9}
            />
            {errors.cep && (
              <p className="text-red-500 text-sm mt-1">{errors.cep}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço *
            </label>
            <input
              type="text"
              value={data.endereco || ""}
              onChange={(e) => onChange("endereco", e.target.value)}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.endereco ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Digite o endereço completo"
            />
            {errors.endereco && (
              <p className="text-red-500 text-sm mt-1">{errors.endereco}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número *
            </label>
            <input
              type="text"
              value={data.numero || ""}
              onChange={(e) => onChange("numero", e.target.value)}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.numero ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nº"
            />
            {errors.numero && (
              <p className="text-red-500 text-sm mt-1">{errors.numero}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complemento
            </label>
            <input
              type="text"
              value={data.complemento || ""}
              onChange={(e) => onChange("complemento", e.target.value)}
              className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Apto, sala, etc."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bairro *
            </label>
            <input
              type="text"
              value={data.bairro || ""}
              onChange={(e) => onChange("bairro", e.target.value)}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.bairro ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Digite o bairro"
            />
            {errors.bairro && (
              <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade *
            </label>
            <input
              type="text"
              value={data.cidade || ""}
              onChange={(e) => onChange("cidade", e.target.value)}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.cidade ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Digite a cidade"
            />
            {errors.cidade && (
              <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UF *
            </label>
            <input
              type="text"
              value={data.uf || ""}
              onChange={(e) => onChange("uf", e.target.value)}
              className={`input-field w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                errors.uf ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="UF"
              maxLength={2}
            />
            {errors.uf && (
              <p className="text-red-500 text-sm mt-1">{errors.uf}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Local de Entrega
          </label>
          <textarea
            value={data.localEntrega || ""}
            onChange={(e) => onChange("localEntrega", e.target.value)}
            rows={3}
            className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Preencher apenas caso o endereço seja diferente do vinculado ao seu CNPJ / CPF"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horário de Recebimento
          </label>

          {/* Horário de funcionamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Horário de Início
              </label>
              <input
                type="time"
                value={data.horarioInicio || ""}
                onChange={(e) => onChange("horarioInicio", e.target.value)}
                className="input-field w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-end justify-center">
              <span className="text-gray-500 font-medium pb-2">às</span>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Horário de Término
              </label>
              <input
                type="time"
                value={data.horarioFim || ""}
                onChange={(e) => onChange("horarioFim", e.target.value)}
                className="input-field w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Dias da semana */}
          <div className="mb-4">
            <label className="block text-xs text-gray-600 mb-2">
              Dias da Semana *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {diasSemana.map((dia) => (
                <label
                  key={dia.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(data.diasSemana || []).includes(dia.id)}
                    onChange={(e) => handleDayChange(dia.id, e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm">{dia.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Horário de almoço */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={almocoEnabled}
                onChange={(e) => handleAlmocoToggle(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Tem horário de fechamento para almoço
              </span>
            </label>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 transition-all duration-300 ${
                !almocoEnabled
                  ? "opacity-50 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Início do Almoço
                </label>
                <input
                  type="time"
                  value={data.almocoInicio || ""}
                  onChange={(e) => onChange("almocoInicio", e.target.value)}
                  disabled={!almocoEnabled}
                  className="input-field w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex items-end justify-center">
                <span className="text-gray-500 font-medium pb-2">às</span>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Fim do Almoço
                </label>
                <input
                  type="time"
                  value={data.almocoFim || ""}
                  onChange={(e) => onChange("almocoFim", e.target.value)}
                  disabled={!almocoEnabled}
                  className="input-field w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
