"use client";

interface SuccessMessageProps {
  onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="text-green-600 text-6xl mb-4">✓</div>
      <h3 className="text-2xl font-semibold text-green-800 mb-2">
        Cadastro Realizado com Sucesso!
      </h3>
      <p className="text-green-700 mb-4">
        Os dados do cliente foram salvos com sucesso.
      </p>
      <button
        onClick={onReset}
        className="btn-primary px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Novo Cadastro
      </button>
    </div>
  );
}
