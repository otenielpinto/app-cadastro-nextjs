"use client";

interface SuccessMessageProps {
  onReset: () => void;
  clientId?: string | null;
}

export default function SuccessMessage({
  onReset,
  clientId,
}: SuccessMessageProps) {
  return (
    <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="text-green-600 text-6xl mb-4">✓</div>
      <h3 className="text-2xl font-semibold text-green-800 mb-2">
        Cadastro Realizado com Sucesso!
      </h3>
      <p className="text-green-700 mb-2">
        Os dados do cliente foram salvos com sucesso.
      </p>
      {clientId && (
        <div className="bg-white border border-green-300 rounded-md p-3 mb-4 inline-block">
          <p className="text-sm text-gray-600 mb-1">ID do Cliente:</p>
          <p className="font-mono text-green-800 font-semibold">{clientId}</p>
        </div>
      )}
      <button
        onClick={onReset}
        className="btn-primary px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Novo Cadastro
      </button>
    </div>
  );
}
