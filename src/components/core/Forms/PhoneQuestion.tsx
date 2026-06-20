import { useTranslations } from "next-intl";
import { CrossIcon } from "@/components/composables/Icons";
import { PhoneFormats, type Question } from "@/types/navbar";

interface Props {
  phoneFormat: PhoneFormats | null;
  question: Question;
  setPhoneFormat: (phoneFormat: PhoneFormats | null) => void;
  validationError: string | null;
  setValidationError: (validationError: string | null) => void;
  selectedAnswer: string;
  setSelectedAnswer: (selectedAnswer: string) => void;
}

const PhoneQuestion = ({
  phoneFormat,
  question,
  setPhoneFormat,
  validationError,
  setValidationError,
  selectedAnswer,
  setSelectedAnswer,
}: Props) => {
  const t = useTranslations("Form");
  return (
    <div className="space-y-4">
      {!phoneFormat ? (
        // Phone format selection
        <div className="space-y-4">
          {question.phoneFormat?.map((format) => (
            <button
              type="button"
              key={format}
              onClick={() => setPhoneFormat(format)}
              className={`w-full p-4 text-left border rounded-lg transition-colors
                                hover:bg-primary-dark`}
            >
              {format === PhoneFormats.ES ? t("phoneFormatLabel") : format}
            </button>
          ))}
        </div>
      ) : (
        // Phone input field
        <>
          <input
            type="tel"
            className={`w-full p-4 text-xl border-b-2 rounded-xl bg-transparent focus:outline-none
                              ${
                                validationError
                                  ? "border-error focus:border-error"
                                  : "border-secondary focus:border-primary"
                              }`}
            placeholder={
              phoneFormat === PhoneFormats.ES ? t("phoneEsPlaceholder") : t("phoneOtherPlaceholder")
            }
            aria-label={
              phoneFormat === PhoneFormats.ES ? t("phoneEsPlaceholder") : t("phoneOtherPlaceholder")
            }
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
          <button
            type="button"
            onClick={() => setPhoneFormat(null)}
            className="text-sm text-text hover:text-primary transition-colors"
          >
            {t("phoneFormatChange")}
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneQuestion;
