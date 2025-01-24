import { PhoneFormats, Question, QuestionType } from "@/types/navbar";
import EmailQuestion from "./EmailQuestion";
import PhoneQuestion from "./PhoneQuestion";
import SelectQuestion from "./SelectQuestion";
import SuccessQuestion from "./SuccessQuestion";
import { assertNever } from "@/utils/validation";

interface Props {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  validationError: string | null;
  setValidationError: (error: string | null) => void;
  phoneFormat: PhoneFormats | null;
  setPhoneFormat: (format: PhoneFormats | null) => void;
  handleSelectOption: (option: string) => void;
  resetForm: () => void;
}

const QuestionContent = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  validationError,
  setValidationError,
  phoneFormat,
  setPhoneFormat,
  handleSelectOption,
  resetForm,
}: Props) => {
    // // type narrowing
    // switch (question.type) {
    //     case QuestionType.TEXT:
    //         return <div></div>
    //     case QuestionType.EMAIL:
    //         return <div></div>
    //     case QuestionType.PHONE:
    //         return <div></div>
    //     case QuestionType.SELECT:
    //         return <div></div>
    //     case QuestionType.SUCCESS:
    //         return <div></div>
    //     default:
    //         assertNever(question.type)
    // }

  return (
    <div>
      <h2 className="text-3xl font-bold text-text-dark mb-8">
        {question.question}
      </h2>
          
        

      {question.type === QuestionType.EMAIL ? (
        <EmailQuestion
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          validationError={validationError}
          setValidationError={setValidationError}
        />
      ) : question.type === QuestionType.PHONE ? (
        <PhoneQuestion
          phoneFormat={phoneFormat}
          question={question}
          setPhoneFormat={setPhoneFormat}
          validationError={validationError}
          setValidationError={setValidationError}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      ) : question.type === QuestionType.SELECT ? (
        <SelectQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          handleSelectOption={handleSelectOption}
        />
      ) : question.type === QuestionType.SUCCESS ? (
        <SuccessQuestion resetForm={resetForm} />
      ) : (
        <>
          <input
            autoFocus
            type={question.type}
            className="w-full p-4 text-xl border-b-2 border-secondary rounded-xl bg-transparent focus:outline-none"
            placeholder="Escribe tu respuesta aquí"
            onChange={(e) => setSelectedAnswer(e.target.value)}
            value={selectedAnswer}
          />
        </>
      )}
    </div>
  );
};

export default QuestionContent;
