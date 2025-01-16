import { Question } from "../../../components/types/exam";

export const dummyQuestions: Question[] = [
  {
    id: 1,
    idx: 0,
    type: "multiple",
    question:
      "In the context of European geography and historical significance, which city serves as the capital of France, being not only its political center but also a global hub for art, fashion, gastronomy, and culture since the Middle Ages? This iconic metropolis, renowned for its architectural marvels like the Eiffel Tower and Notre-Dame Cathedral, has played a pivotal role in shaping European history through events like the French Revolution and has consistently remained at the forefront of cultural innovation, intellectual discourse, and artistic expression for centuries, while maintaining its status as one of the world's most visited and influential urban centers.",
    options: ["Paris", "London", "Berlin", "Madrid"],
    userAnswer: [],
    isAnswered: false,
  },
  {
    id: 2,
    idx: 1,
    type: "single",
    question:
      "What is the capital of France? This historic city, situated along the Seine River, has been a center of art, culture, and politics for centuries. Known for its iconic landmarks like the Eiffel Tower and the Louvre Museum, this metropolis continues to be one of the most visited and influential cities in the world. Its rich history includes being the epicenter of the French Revolution and the Age of Enlightenment, while today it remains a global leader in fashion, gastronomy, and the arts.",
    options: ["Paris", "London", "Berlin", "Madrid"],
    userAnswer: [],
    isAnswered: false,
  },
  {
    id: 3,
    idx: 2,
    type: "open",
    question: "What is the capital of France?",
    userAnswer: "",
    isAnswered: false,
  },
  {
    id: 4,
    idx: 3,
    type: "open",
    question: "What is the capital of France?",
    userAnswer: "",
    isAnswered: false,
  },
];
