import { useEffect, useState } from "react";

import { questions } from "@/utils/data";
import { PhoneFormats, QuestionType } from "@/types/navbar";
import { isValidEmail, isValidSpanishPhone } from "@/utils/validation";

export const useContactFormState = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [phoneFormat, setPhoneFormat] = useState<PhoneFormats | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        selectedAnswer &&
        questions[currentQuestion].type !== QuestionType.SUCCESS
      ) {
        handleNext(selectedAnswer);
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [currentQuestion, selectedAnswer]);

  const handleSubmit = async (finalAnswer: string) => {
    const finalAnswers = {
      ...answers,
      [questions[currentQuestion].id]: finalAnswer,
    };

    try {
      // Here you would handle the form submission
      console.log("Form submitted:", finalAnswers);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalAnswers),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("R", response);
        console.log("D", data);

        throw new Error(data.error.message);
      }

      // Move to success screen
      setCurrentQuestion(questions.length - 1);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  const handleNext = (answer: string) => {
    // Phone validation
    if (questions[currentQuestion].type === QuestionType.PHONE) {
      if (phoneFormat === PhoneFormats.ES && !isValidSpanishPhone(answer)) {
        setValidationError(
          "Por favor, introduce un número de teléfono español válido"
        );
        return;
      }
    }
    // Email validation
    if (questions[currentQuestion].type === QuestionType.EMAIL) {
      if (!isValidEmail(answer)) {
        setValidationError(
          "Por favor, introduce una dirección de email válida"
        );
        return;
      }
    }

    if (currentQuestion === questions.length - 1) return;

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));

    if (currentQuestion < questions.length - 2) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
    } else {
      handleSubmit(answer);
    }
  };

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
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
    resetForm,
    setSelectedAnswer,
    setValidationError,
    handleSelectOption,
    phoneFormat,
    setPhoneFormat,
  };
};
