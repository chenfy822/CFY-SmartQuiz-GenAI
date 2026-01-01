export enum QuestionType {
  Single = 'single',
  Multiple = 'multiple',
}

export interface Question {
  id: string;
  number: number;
  text: string;
  options: string[];
  correctIndices: number[]; // 0-based index
  explanation: string;
  type: QuestionType;
}

export interface QuestionBank {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  questions: Question[];
  status?: 'processing' | 'ready' | 'error';
  progress?: number; // 0-100 for processing status
  isSystem?: boolean; // For auto-generated banks
  source?: 'upload' | 'practice'; // Distinguish between uploaded docs and generated practice
}

export interface AnswerState {
  selectedIndices: number[];
  isSubmitted: boolean;
  isCorrect: boolean;
}

export interface QuizProgress {
  [questionId: string]: AnswerState;
}

export interface MistakeHistoryItem {
  timestamp: number;
  selectedIndices: number[];
}

export interface MistakeRecord {
  question: Question;
  count: number;
  lastWrongAt: number;
  history: MistakeHistoryItem[];
}

export interface QuizRecord {
  id: string;
  bankId: string;
  bankTitle: string;
  timestamp: number;
  totalQuestions: number;
  attemptedCount: number; // New: track how many were actually tried
  correctCount: number;
  score: number; // percentage based on total or attempted? Usually based on total for final score.
  accuracy: number; // percentage based on attempted
  durationSeconds: number;
  answers: QuizProgress; // Snapshot of answers
  questionIds: string[]; // Order of questions in this attempt
}

export type ViewState = 'home' | 'quiz' | 'create' | 'mistake-list' | 'favorites-list';

export interface AlertState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}
