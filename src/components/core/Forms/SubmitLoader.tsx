import { domAnimation, LazyMotion, m } from "framer-motion";
import { useTranslations } from "next-intl";

const SubmitLoader = () => {
  const t = useTranslations("Form");
  return (
    <LazyMotion features={domAnimation}>
      <div className="text-center space-y-4">
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1.5 }} className="text-text-dark">
          <p>{t("submitLoading")}</p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default SubmitLoader;
