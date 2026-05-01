"use client";

import QuestionContainer from "@/components/containers/QuestionFormContainer";
import { useContactFormState } from "@/hooks/useContactFormState";
import { QuestionType } from "@/types/navbar";
import { questions } from "@/utils/data";
import ButtonBack from "./ButtonBack";
import ButtonNext from "./ButtonNext";
import ProgressBar from "./ProgressBar";
import QuestionContent from "./QuestionContent";

export default function TypeformStyleForm() {
  const {
    currentQuestion,
    selectedAnswer,
    validationError,
    handleNext,
    handleBack,
    resetForm,
    setSelectedAnswer,
    setValidationError,
    // handleSelectOption,
    phoneFormat,
    setPhoneFormat,
    isLoading,
  } = useContactFormState();

  return (
    <div className="">
      <div className="max-w-2xl mx-auto">
        <QuestionContainer currentQuestion={currentQuestion}>
          <ButtonBack
            show={currentQuestion > 0 && questions[currentQuestion].type !== QuestionType.SUCCESS}
            onClick={handleBack}
          />
          <QuestionContent
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            validationError={validationError}
            setValidationError={setValidationError}
            phoneFormat={phoneFormat}
            setPhoneFormat={setPhoneFormat}
            // handleSelectOption={handleSelectOption}
            resetForm={resetForm}
            isLoading={isLoading}
          />
          {questions[currentQuestion].type !== QuestionType.SUCCESS && selectedAnswer && (
            <div className="text-sm text-text-light">Presiona Enter para continuar</div>
          )}
        </QuestionContainer>
      </div>
      <ProgressBar percentage={((currentQuestion + 1) / (questions.length - 1)) * 100} />
      <ButtonNext
        show={
          (questions[currentQuestion].type !== QuestionType.SUCCESS && selectedAnswer !== "") ||
          questions[currentQuestion].type === QuestionType.TEXTAREA
        }
        onClick={() => handleNext(selectedAnswer)}
      />
    </div>
  );
}
