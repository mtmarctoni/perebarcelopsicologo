import { motion } from "framer-motion";

import { PhoneFormats, Question, QuestionType } from "@/types/navbar";
import EmailQuestion from "./EmailQuestion";
import PhoneQuestion from "./PhoneQuestion";
import SelectQuestion from "./SelectQuestion";
import SuccessQuestion from "./SuccessQuestion";
import { assertNever } from "@/utils/validation";
import TextQuestion from "./TextQuestion";
import TextareaQuestion from "./TextareaQuestion";
import SumbitLoader from "./SubmitLoader";

interface Props {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  validationError: string | null;
  setValidationError: (error: string | null) => void;
  phoneFormat: PhoneFormats | null;
  setPhoneFormat: (format: PhoneFormats | null) => void;
//   handleSelectOption: (option: string) => void;
    resetForm: () => void;
    isLoading: boolean;
}

const QuestionContent = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  validationError,
  setValidationError,
  phoneFormat,
  setPhoneFormat,
//   handleSelectOption,
    resetForm,
  isLoading,
}: Props) => {
    if (isLoading) return <SumbitLoader />;
  //type narrowing
  switch (question.type) {
    case QuestionType.TEXT:
      return (
        <TextQuestion
          type={question.type}
          selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
        />
      );
    case QuestionType.EMAIL:
      return (
        <EmailQuestion
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          validationError={validationError}
          setValidationError={setValidationError}
        />
      );
    case QuestionType.PHONE:
      return (
        <PhoneQuestion
          phoneFormat={phoneFormat}
          question={question}
          setPhoneFormat={setPhoneFormat}
          validationError={validationError}
          setValidationError={setValidationError}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      );
    case QuestionType.SELECT:
      return (
        <SelectQuestion
          question={question}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
        //   handleSelectOption={handleSelectOption}
        />
          );
      case QuestionType.TEXTAREA:
          return (
              <TextareaQuestion
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              />
          )
    case QuestionType.SUCCESS:
          return (
              <SuccessQuestion resetForm={resetForm} />
          )
    default:
      assertNever(question.type);
  }
};

export default QuestionContent;
