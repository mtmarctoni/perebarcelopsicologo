interface Props {
    selectedAnswer: string,
    setSelectedAnswer: (answer: string) => void
}

const TextareaQuestion = ({selectedAnswer, setSelectedAnswer}: Props) => {
return (
    <textarea
        autoFocus
        className="w-full p-4 text-xl border-2 border-secondary rounded-xl bg-transparent focus:outline-none focus:border-primary min-h-[180px] resize-y overflow-hidden"
        placeholder={'Este campo es opcional. Puedes añadir cualquier duda o comentario adicional.'}
        onChange={(e) => setSelectedAnswer(e.target.value)}
        value={selectedAnswer}
      />
    )
}

export default TextareaQuestion;