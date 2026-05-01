import { useCallback, useEffect, useState } from "react";
import { PhoneFormats, QuestionType } from "@/types/navbar";
import { questions } from "@/utils/data";
import { handleResendErrors } from "@/utils/errorHandler";
import { isValidEmail, isValidSpanishPhone } from "@/utils/validation";

export const useContactFormState = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [phoneFormat, setPhoneFormat] = useState<PhoneFormats | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (finalAnswer: string) => {
      setIsLoading(true);

      const finalAnswers = {
        ...answers,
        [questions[currentQuestion].id]: finalAnswer,
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalAnswers),
        });

        const data = await response.json();

        if (!response.ok) {
          setValidationError(handleResendErrors(data.error));

          throw new Error(data.error.message);
        }

        // Move to success screen
        setCurrentQuestion(questions.length - 1);
      } catch (_error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    },
    [answers, currentQuestion],
  );

  const handleNext = useCallback(
    (answer: string) => {
      // Phone validation
      if (questions[currentQuestion].type === QuestionType.PHONE) {
        if (phoneFormat === PhoneFormats.ES && !isValidSpanishPhone(answer)) {
          setValidationError("Por favor, introduce un número de teléfono español válido");
          return;
        }
      }
      // Email validation
      if (questions[currentQuestion].type === QuestionType.EMAIL) {
        if (!isValidEmail(answer)) {
          setValidationError("Por favor, introduce una dirección de email válida");
          return;
        }
      }

      if (currentQuestion === questions.length - 1) return;

      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: answer,
      }));

      if (currentQuestion < questions.length - 2) {
        setSelectedAnswer("");
        setCurrentQuestion((prev) => prev + 1);
      } else {
        handleSubmit(answer);
      }
    },
    [currentQuestion, phoneFormat, handleSubmit],
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        selectedAnswer &&
        questions[currentQuestion].type !== QuestionType.SUCCESS &&
        questions[currentQuestion].type !== QuestionType.TEXTAREA
      ) {
        setTimeout(() => {
          handleNext(selectedAnswer);
        }, 0);
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [currentQuestion, selectedAnswer, handleNext]);

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
    // Restore the previous answer and reser errors and other variables
    const previousAnswer = answers[questions[currentQuestion - 1].id] || "";
    setSelectedAnswer(previousAnswer);
    setValidationError(null);
    if (questions[currentQuestion].type === QuestionType.PHONE) {
      setPhoneFormat(null);
    }
  };

  const resetForm = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer("");
    setPhoneFormat(null);
    setValidationError(null);
  };

  return {
    currentQuestion,
    selectedAnswer,
    validationError,
    handleNext,
    handleBack,
    resetForm,
    setSelectedAnswer,
    setValidationError,
    phoneFormat,
    setPhoneFormat,
    isLoading,
  };
};
