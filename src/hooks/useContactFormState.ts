import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { PhoneFormats, QuestionType } from "@/types/navbar";
import { handleResendErrors } from "@/utils/errorHandler";
import { questions } from "@/utils/questions";
import { isValidEmail, isValidSpanishPhone } from "@/utils/validation";

export const useContactFormState = () => {
  const t = useTranslations("Form");
  const locale = useLocale();
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
        locale,
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
          setValidationError(handleResendErrors(data));
          throw new Error(data.error ?? t("errorUnexpected"));
        }

        // Push GTM event for Google Ads conversion tracking
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "generate_lead",
            leadSource: "contact_form",
          });
        }

        if (data.warnings?.includes("user_email_failed")) {
          // biome-ignore lint/suspicious/noConsole: server-side warning is intentional
          console.warn("User confirmation email failed to send");
        }

        // Move to success screen
        setCurrentQuestion(questions.length - 1);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: server-side error logging is intentional
        console.error("Contact form submission error:", error);
        setValidationError((prev) => prev ?? t("errorUnexpected"));
      } finally {
        setIsLoading(false);
      }
    },
    [answers, currentQuestion, locale, t],
  );

  const handleNext = useCallback(
    (answer: string) => {
      // Phone validation
      if (questions[currentQuestion].type === QuestionType.PHONE) {
        if (phoneFormat === PhoneFormats.ES && !isValidSpanishPhone(answer)) {
          setValidationError(t("errorInvalidPhone"));
          return;
        }
      }
      // Email validation
      if (questions[currentQuestion].type === QuestionType.EMAIL) {
        if (!isValidEmail(answer)) {
          setValidationError(t("errorInvalidEmail"));
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
    [currentQuestion, phoneFormat, handleSubmit, t],
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
