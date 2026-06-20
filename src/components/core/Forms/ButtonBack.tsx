import { useTranslations } from "next-intl";

interface BackButtonProps {
  show: boolean;
  onClick: () => void;
}

const BackButton = ({ show, onClick }: BackButtonProps) => {
  const t = useTranslations("Form");
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-text-light hover:text-primary transition-colors"
    >
      {t("buttonBack")}
    </button>
  );
};

export default BackButton;
