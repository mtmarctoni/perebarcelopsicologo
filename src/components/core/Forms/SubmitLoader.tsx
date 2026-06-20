import { useTranslations } from "next-intl";

const SubmitLoader = () => {
  const t = useTranslations("Form");
  return (
    <div className="text-center space-y-4 animate-fade-in">
      <div className="text-text-dark">
        <p>{t("submitLoading")}</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SubmitLoader;
