import { motion } from 'framer-motion';
import { CrossIcon } from '../../composables/Icons';

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
  return (
    <>
      <input
        autoFocus
        type="email"
        className={`w-full p-4 text-xl border-b-2 rounded-xl bg-transparent focus:outline-none
                  ${validationError 
                    ? "border-error focus:border-error" 
                    : "border-secondary focus:border-primary"}`}
        placeholder="ejemplo@correo.com"
        onChange={(e) => {
          setSelectedAnswer(e.target.value);
          setValidationError("");
        }}
        value={selectedAnswer}
      />
      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 bg-background text-error px-4 py-2 rounded-lg mt-2"
        >
          <CrossIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{validationError}</span>
        </motion.div>
      )}
      {/* {selectedAnswer && !validationError && (
        <div className="text-sm text-text-light">
          Presiona Enter para continuar
        </div>
      )} */}
    </>
  );
};

export default EmailQuestion;
