import { useTranslations } from "next-intl";

interface Props {
  show: boolean;
  onClick: () => void;
}

const ButtonNext = ({ show, onClick }: Props) => {
  const t = useTranslations("Form");
  if (!show) return null;
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={onClick}
        className="px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-secondary-light hover:text-text-dark transition-colors"
      >
        {t("buttonNext")}
      </button>
    </div>
  );
};

export default ButtonNext;
