import axios from "axios";
import { shuffleArray } from "./utils";
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
export type QuestionState = Question & {
  answers: any[];
};

export type ReponseApi = {
  response_code: number;
  results: Question[];
};

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  //   const data1 = await(await fetch(endpoint)).json()
  const data = await axios.get(endpoint);
  const jsonData: ReponseApi = data.data;
  return jsonData.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
