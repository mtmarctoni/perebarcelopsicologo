import { useTranslations } from "next-intl";

interface Props {
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
}

const TextareaQuestion = ({ selectedAnswer, setSelectedAnswer }: Props) => {
  const t = useTranslations("Form");
  return (
    <textarea
      className="w-full p-4 text-xl border-2 border-secondary rounded-xl bg-transparent focus:outline-none focus:border-primary min-h-[180px] resize-y overflow-hidden"
      placeholder={t("textareaPlaceholder")}
      aria-label={t("textareaPlaceholder")}
      onChange={(e) => setSelectedAnswer(e.target.value)}
      value={selectedAnswer}
    />
  );
};

export default TextareaQuestion;
