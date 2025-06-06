import { Question } from "@/types/navbar";

interface Props {
    question: Question;
    selectedAnswer: string;
    setSelectedAnswer: (answer: string) => void;
    // handleSelectOption: (option: string) => void;
}

const SelectQuestion = ({
    question,
    selectedAnswer,
    setSelectedAnswer,
    // handleSelectOption
}: Props) => {
    return (
        <div className="space-y-4">
            {question.options?.map((option) => (
                <button
                    key={option}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors
                                      ${selectedAnswer === option
                            ? "bg-primary-light border-secondary"
                            : "hover:bg-primary-dark"
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    )
};

export default SelectQuestion;