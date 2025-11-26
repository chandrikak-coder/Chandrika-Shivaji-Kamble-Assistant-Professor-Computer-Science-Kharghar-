export type QuestionType = 'choice' | 'text';

export interface Option {
  id: string;
  label: string;
  emoji: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: Option[];
  placeholder?: string;
}

export interface Answer {
  questionId: number;
  questionText: string;
  answerText: string;
}

export enum Tone {
  FORMAL = 'Formal Psychologist',
  SARCASTIC = 'Roast Master',
  POETIC = 'Mystic Oracle',
  GEN_Z = 'Internet Bestie',
}

export interface PersonalityReport {
  title: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  careerSuggestions: string[];
  fictionalCharacter: string;
  imageUrl?: string;
}