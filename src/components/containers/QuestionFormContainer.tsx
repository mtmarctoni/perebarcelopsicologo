import { AnimatePresence, motion } from "framer-motion";

import { questions } from "@/utils/data";

interface Props {
  children: React.ReactNode;
  currentQuestion: number;
}

const QuestionContainer = ({ children, currentQuestion }: Props) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-text-dark">
        {questions[currentQuestion].question}
      </h2>
      {children}
    </motion.div>
  </AnimatePresence>
);

export default QuestionContainer;
