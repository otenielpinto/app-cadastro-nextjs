"use client";

import { StepNumber, STEPS } from "@/types/client";

interface ProgressIndicatorProps {
  currentStep: StepNumber;
}

export default function ProgressIndicator({
  currentStep,
}: ProgressIndicatorProps) {
  const getStepClass = (stepNum: StepNumber) => {
    if (stepNum < currentStep) {
      return "step-indicator step-completed w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg";
    } else if (stepNum === currentStep) {
      return "step-indicator step-active w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg";
    } else {
      return "step-indicator step-inactive w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg";
    }
  };

  const getLabelClass = (stepNum: StepNumber) => {
    if (stepNum < currentStep) {
      return "text-green-600";
    } else if (stepNum === currentStep) {
      return "text-indigo-600";
    } else {
      return "text-gray-400";
    }
  };

  return (
    <>
      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={getStepClass(step.number)}>{step.number}</div>
              {index < STEPS.length - 1 && (
                <div className="w-16 h-1 bg-gray-300 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-16 text-sm font-medium">
          {STEPS.map((step) => (
            <span key={step.number} className={getLabelClass(step.number)}>
              {step.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
