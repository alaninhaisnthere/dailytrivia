"use client";

import React, { useEffect, useState } from 'react';
import he from 'he';
import { fetchTriviaQuestions } from '../../app/services/triviaService';
import LinkWithIcon from '../LinkWithIcon';

import Restart from "../../../public/Restart.png";
import RestartHover from "../../../public/RestartHover.png";

interface Question {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaComponentProps {
  onQuizComplete: (score: number) => void;
}

const TriviaComponent: React.FC<TriviaComponentProps> = ({ onQuizComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const loadTriviaQuestions = async () => {
      try {
        const amount = 10;
        const triviaData = await fetchTriviaQuestions(amount);
        console.log('Trivia questions:', triviaData);
        setQuestions(triviaData.results);
      } catch (error) {
        console.error('Failed to fetch trivia questions:', error);
      }
    };

    loadTriviaQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      onQuizComplete(correctAnswersCount + 1);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const renderOptions = (options: string[]) => {
    return options.map((option, index) => (
      <li
        key={index}
        className={`p-4 mb-2 cursor-pointer rounded-xl shadow-xl
          ${selectedOption === option ? 'bg-[#FE909D] text-black' : 'bg-white text-black'}
          hover:bg-[#FE909D]
           hover:text-black
           hover:scale-105 transition-transform duration-300 ease-in-out`}
        onClick={() => handleOptionChange(option)}
      >
        {he.decode(option)}
      </li>
    ));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold font-unbounded text-2xl tracking-wide">
        Question {currentQuestionIndex + 1}/10
      </h1>
      <div className="w-full flex justify-center">
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <div className="flex flex-col items-center gap-3 w-2/4">
            <h3 className="text-center font-semibold text-xl">
              "{he.decode(questions[currentQuestionIndex].category)}"
            </h3>
            <p className="text-2xl text-center font-unbounded">
              {he.decode(questions[currentQuestionIndex].question)}
            </p>
            <hr className="border-t-2 border-black my-5 w-2/3" />
            <ul className="font-semibold text-xl w-full">
              {renderOptions(questions[currentQuestionIndex].incorrect_answers.concat(questions[currentQuestionIndex].correct_answer))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleNextQuestion}
        disabled={!selectedOption}
        className="mt-4 px-4 py-2 bg-[#FE909D] text-white rounded-md disabled:opacity-50"
      >
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Check Score'}
      </button>
      <div className="py-3">
        <LinkWithIcon
          href="/"
          text="Restart"
          icon={Restart}
          hoverIcon={RestartHover}
          width={25}
        />
      </div>
    </div>
  );
};

export default TriviaComponent;
