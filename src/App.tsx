import React, { useState } from "react";
import { fetchQuizQuestions } from "./lib/api";
//components
import QuestionCard from "./components/QuizCard";
//Types
import { Difficulty, QuestionState } from "./lib/api";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(() => true);
    setGameOver(() => false);
    let newQuestions: any;
    try {
      newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    } catch (err) {
      console.log(err);
    }

    setQuestions(() => newQuestions);
    setScore(() => 0);
    setUserAnswers(() => []);
    setNumber(() => 0);
    setLoading(() => false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};
  return (
    <div className="App">
      <div className="container">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <div>
            <button onClick={nextQuestion}>Next Question</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
