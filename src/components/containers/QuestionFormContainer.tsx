import { useTranslations } from "next-intl";
import { QuestionType } from "@/types/navbar";
import { questions } from "@/utils/data";

const questionKeyMap: Record<string, string> = {
  "1": "nameQuestion",
  "2": "emailQuestion",
  "3": "phoneQuestion",
  "4": "preferenceQuestion",
  "5": "interestQuestion",
  "6": "commentQuestion",
};

interface Props {
  children: React.ReactNode;
  currentQuestion: number;
}

const QuestionContainer = ({ children, currentQuestion }: Props) => {
  const t = useTranslations("Form");
  const q = questions[currentQuestion];
  const questionText = q.type !== QuestionType.SUCCESS ? t(questionKeyMap[q.id] ?? q.id) : null;

  return (
    <div
      key={currentQuestion}
      className="opacity-0 animate-fade-in-up space-y-8"
      style={{ animationDuration: "0.3s" }}
    >
      {questionText && <h2 className="text-3xl font-bold text-text-dark">{questionText}</h2>}
      {children}
    </div>
  );
};

export default QuestionContainer;
