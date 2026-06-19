import { useTranslations } from "next-intl";

import { CheckIcon } from "@/components/composables/Icons";

interface Props {
  resetForm: () => void;
}

const SuccessQuestion = ({ resetForm }: Props) => {
  const t = useTranslations("Form");
  return (
    <div className="text-center">
      <div className="opacity-0 animate-scale-in w-16 h-16 mx-auto mb-4 bg-success rounded-full flex items-center justify-center">
        <CheckIcon className="w-8 h-8 text-white" />
      </div>
      <button
        type="button"
        className="opacity-0 animate-fade-in mt-8 px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-secondary-light transition-colors"
        style={{ animationDelay: "0.5s" }}
        onClick={resetForm}
      >
        {t("buttonReset")}
      </button>
    </div>
  );
};

export default SuccessQuestion;
