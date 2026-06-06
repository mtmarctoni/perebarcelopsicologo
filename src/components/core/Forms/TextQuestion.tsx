import { useTranslations } from "next-intl";
import type { QuestionType } from "@/types/navbar";

interface Props {
  type: QuestionType;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
}

const TextQuestion = ({ type, selectedAnswer, setSelectedAnswer }: Props) => {
  const t = useTranslations("Form");
  return (
    <input
      type={type}
      className="w-full p-4 text-xl border-b-2 border-secondary rounded-xl bg-transparent focus:outline-none"
      placeholder={t("textPlaceholder")}
      onChange={(e) => setSelectedAnswer(e.target.value)}
      value={selectedAnswer}
    />
  );
};

export default TextQuestion;
