import { useTranslations } from "next-intl";
import type { Question } from "@/types/navbar";

const optionKeyMap: Record<string, string[]> = {
  "4": ["preferenceOption1", "preferenceOption2", "preferenceOption3"],
  "5": ["interestOption1", "interestOption2", "interestOption3"],
};

interface Props {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
}

const SelectQuestion = ({ question, selectedAnswer, setSelectedAnswer }: Props) => {
  const t = useTranslations("Form");
  const optionKeys = optionKeyMap[question.id] ?? [];
  const options = question.options?.map(
    (opt, i) => (optionKeys[i] ? t(optionKeys[i]) : opt) ?? opt,
  );

  return (
    <div className="space-y-4">
      {options?.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => setSelectedAnswer(option)}
          className={`w-full p-4 text-left border rounded-lg transition-colors
                                      ${
                                        selectedAnswer === option
                                          ? "bg-primary-light border-secondary"
                                          : "hover:bg-primary-dark"
                                      }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SelectQuestion;
