import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CheckIcon } from "@/components/composables/Icons";

interface Props {
  resetForm: () => void;
}

const SuccessQuestion = ({ resetForm }: Props) => {
  const t = useTranslations("Form");
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 1 }}
        className="w-16 h-16 mx-auto mb-4 bg-success rounded-full flex items-center justify-center"
      >
        <CheckIcon className="w-8 h-8 text-white" />
      </motion.div>
      {/* Add restart button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={resetForm}
        className="mt-8 px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-secondary-light transition-colors"
      >
        {t("buttonReset")}
      </motion.button>
    </div>
  );
};

export default SuccessQuestion;
