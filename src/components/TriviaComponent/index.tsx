"use client";

import React, { useEffect, useState } from 'react';
import { fetchTriviaQuestions } from '../../app/services/triviaService';
import he from 'he';

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
      <li key={index}>
        <input
          type="radio"
          id={`option-${index}`}
          name={`question-${currentQuestionIndex}`}
          value={option}
          checked={selectedOption === option}
          onChange={() => handleOptionChange(option)}
        />
        <label htmlFor={`option-${index}`}>{he.decode(option)}</label>
      </li>
    ));
  };

  return (
    <div>
      <h1>
        Question {currentQuestionIndex + 1}/10
        </h1>
      <div>
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <div>
            <h3>{he.decode(questions[currentQuestionIndex].category)}</h3>
            <p>{he.decode(questions[currentQuestionIndex].question)}</p>
            <ul>{renderOptions(questions[currentQuestionIndex].incorrect_answers.concat(questions[currentQuestionIndex].correct_answer))}</ul>
          </div>
        )}
        <button onClick={handleNextQuestion} disabled={!selectedOption}>
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Check Score'}
        </button>
      </div>
    </div>
  );
};

export default TriviaComponent;