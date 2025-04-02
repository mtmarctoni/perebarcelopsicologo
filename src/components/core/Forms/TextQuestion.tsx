import { QuestionType } from "@/types/navbar";

interface Props {
    type: QuestionType,
    selectedAnswer: string,
    setSelectedAnswer: (answer: string) => void,
}

const TextQuestion = ({ type, selectedAnswer, setSelectedAnswer }: Props) => {    
    return (
        <>
            <input
                autoFocus
                type={type}
                className="w-full p-4 text-xl border-b-2 border-secondary rounded-xl bg-transparent focus:outline-none"
                placeholder="Escribe tu respuesta aquí"
                onChange={(e) => setSelectedAnswer(e.target.value)}
                value={selectedAnswer}
            />
        </>
    )
};

export default TextQuestion;