import { useTranslations } from "next-intl";
import { questions } from "@/utils/questions";

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
  const questionText = questionKeyMap[q.id] ? t(questionKeyMap[q.id]) : q.question;

  return (
    <div key={currentQuestion} className="space-y-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-text-dark">{questionText}</h2>
      {children}
    </div>
  );
};

export default QuestionContainer;
