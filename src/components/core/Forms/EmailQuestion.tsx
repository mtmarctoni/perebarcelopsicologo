import { useTranslations } from "next-intl";
import { CrossIcon } from "../../composables/Icons";

interface Props {
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  validationError: string | null;
  setValidationError: (error: string | null) => void;
}

const EmailQuestion = ({
  selectedAnswer,
  setSelectedAnswer,
  validationError,
  setValidationError,
}: Props) => {
  const t = useTranslations("Form");
  return (
    <>
      <input
        type="email"
        className={`w-full p-4 text-xl border-b-2 rounded-xl bg-transparent focus:outline-none
                    ${
                      validationError
                        ? "border-error focus:border-error"
                        : "border-secondary focus:border-primary"
                    }`}
        placeholder={t("emailPlaceholder")}
        aria-label={t("emailPlaceholder")}
        onChange={(e) => {
          setSelectedAnswer(e.target.value);
          setValidationError("");
        }}
        value={selectedAnswer}
      />
      {validationError && (
        <div className="flex items-center space-x-2 bg-background text-error px-4 py-2 rounded-lg mt-2 animate-slide-in-down">
          <CrossIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{validationError}</span>
        </div>
      )}
    </>
  );
};

export default EmailQuestion;
