// components/TypeformStyle/Form.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { questions } from '@/utils/data';
import { QuestionType } from '@/types/navbar';

export default function TypeformStyleForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
          if (e.key === 'Enter' && 
              selectedAnswer && 
              questions[currentQuestion].type !== QuestionType.SUCCESS) {
            handleNext(selectedAnswer);
          }
        };
    
        document.addEventListener('keypress', handleKeyPress);
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      }, [currentQuestion, selectedAnswer]);

  const handleNext = (answer: string) => {
    if (currentQuestion === questions.length - 1) return;

    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
    
    if (currentQuestion < questions.length - 2) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      handleSubmit(answer);
    }
  };

  const handleSubmit = async (finalAnswer: string) => {
    const finalAnswers = {
      ...answers,
      [questions[currentQuestion].id]: finalAnswer
    };
    
    try {
      // Here you would handle the form submission
        console.log('Form submitted:', finalAnswers);

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalAnswers),
        });
        
        const data = await response.json();
      
        if (!response.ok) {
            console.log('R', response);
            console.log('D', data);
            
            
            throw new Error(data.error.message);
              
          }
      
      // Move to success screen
      setCurrentQuestion(questions.length - 1);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

    //we can spare this function because it is handle by the useEffect hook
//   const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
//       handleNext((e.target as HTMLInputElement).value);
//     }
//   };

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
  };

  return (
      <div className="">
          <div className="max-w-2xl mx-auto">
              
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-text-dark">
              {questions[currentQuestion].question}
            </h2>

            {questions[currentQuestion].type === QuestionType.SELECT ? (
              <div className="space-y-4">
                {questions[currentQuestion].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors
                              ${selectedAnswer === option 
                                ? 'bg-primary-light border-secondary' 
                                : 'hover:bg-primary-dark'}`}
                  >
                    {option}
                  </button>
                ))}
                {selectedAnswer && (
                  <div className="text-sm text-text-light">
                    Presiona Enter para continuar
                  </div>
                )}
              </div>
            ) : questions[currentQuestion].type === QuestionType.SUCCESS ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-success rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-8 h-8 text-text"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>
            ) : (
              <>
                <input
                  type={questions[currentQuestion].type}
                  className="w-full p-4 text-xl border-b-2 border-secondary rounded-xl bg-transparent focus:outline-none"
                  placeholder="Escribe tu respuesta aquí"
                                    //   onKeyUp={handleInputKeyPress}
                                      onChange={(e) => setSelectedAnswer(e.target.value)}
                                      value={selectedAnswer}
                />
                                  {selectedAnswer && <div className="text-sm text-text-light">
                                      Presiona Enter para continuar
                                  </div>}
                
              </>
            )}
          </motion.div>
              </AnimatePresence>
          </div>
              

        {currentQuestion < questions.length - 1 && (
          <div className="mt-8">
            <div className="h-1 bg-text-light rounded-full">
              <div 
                className="h-full bg-secondary-light rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion + 1) / (questions.length - 1) * 100}%` }}
              />
            </div>
          </div>
        )}

        {questions[currentQuestion].type !== QuestionType.SUCCESS && selectedAnswer && (
          <div className="mt-4">
            <button
              onClick={() => handleNext(selectedAnswer)}
              className="px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-secondary-light transition-colors"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
  );
}
