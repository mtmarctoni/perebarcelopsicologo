import { motion } from "framer-motion";

import { CrossIcon } from "@/components/composables/Icons";
import { PhoneFormats, Question } from "@/types/navbar";

interface Props {
    phoneFormat: PhoneFormats | null,
    question: Question,
    setPhoneFormat: (phoneFormat: PhoneFormats | null) => void,
    validationError: string | null,
    setValidationError: (validationError: string | null) => void,
    selectedAnswer: string,
    setSelectedAnswer: (selectedAnswer: string) => void,
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
    return (
        <div className="space-y-4">
            {!phoneFormat ? (
                // Phone format selection
                <div className="space-y-4">
                    {question.phoneFormat?.map((format) => (
                        <button
                            key={format}
                            onClick={() => setPhoneFormat(format)}
                            className={`w-full p-4 text-left border rounded-lg transition-colors
                                hover:bg-primary-dark`}
                        >
                            {format === PhoneFormats.ES
                                ? "Tengo número español"
                                : format}
                        </button>
                    ))}
                </div>
            ) : (
                // Phone input field
                <>
                    <input
                        autoFocus
                        type="tel"
                        className={`w-full p-4 text-xl border-b-2 rounded-xl bg-transparent focus:outline-none
                              ${validationError
                                ? "border-error focus:border-error"
                                : "border-secondary focus:border-primary"
                            }`}
                        placeholder={
                            phoneFormat === PhoneFormats.ES
                                ? "Ej: 612345678 o +34612345678"
                                : "Introduce tu número"
                        }
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
                            <span className="text-sm font-medium">
                                {validationError}
                            </span>
                        </motion.div>
                    )}

                    {/* {selectedAnswer && !validationError && (
                        <div className="text-sm text-text-light">
                            Presiona Enter para continuar
                        </div>
                    )} */}
                    <button
                        onClick={() => setPhoneFormat(null)}
                        className="text-sm text-text hover:text-secondary-light transition-colors"
                    >
                        Cambiar formato
                    </button>
                </>
            )}
        </div>
    );
};

export default PhoneQuestion;