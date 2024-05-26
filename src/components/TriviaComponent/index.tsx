"use client";

import React, { useEffect, useState } from 'react';
import { fetchTriviaQuestions } from '../../app/services/triviaService';

interface Question {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const TriviaComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadTriviaQuestions = async () => {
      try {
        const amount = 1;
        const triviaData = await fetchTriviaQuestions(amount);
        console.log('Trivia questions:', triviaData);
        setQuestions(triviaData.results);
      } catch (error) {
        console.error('Failed to fetch trivia questions:', error);
      }
    };

    loadTriviaQuestions();
  }, []);

  const renderOptions = (options: string[]) => {
    return options.map((option, index) => (
      <li key={index}>
        <input type="radio" id={`option-${index}`} name={`question-${index}`} value={option} />
        <label htmlFor={`option-${index}`}>{option}</label>
      </li>
    ));
  };

  return (
    <div>
      <h1>Questão x/10</h1>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <h3>{question.category}</h3>
            <p>{question.question}</p>
            <ul>{renderOptions(question.incorrect_answers.concat(question.correct_answer))}</ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriviaComponent;
