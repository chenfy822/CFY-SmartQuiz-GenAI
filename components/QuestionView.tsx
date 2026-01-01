import React, { useState, useEffect } from 'react';
import { Question, QuestionType, AnswerState } from '../types';
import { CheckIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from './Icons';

interface QuestionViewProps {
  question: Question;
  totalQuestions: number;
  currentNumber: number;
  savedState?: AnswerState;
  isFavorite: boolean;
  onSaveProgress: (questionId: string, state: AnswerState) => void;
  onToggleFavorite: (questionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  totalQuestions,
  currentNumber,
  savedState,
  isFavorite,
  onSaveProgress,
  onToggleFavorite,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state when question changes or external state updates
  useEffect(() => {
    if (savedState) {
      setSelectedIndices(savedState.selectedIndices);
      setIsSubmitted(savedState.isSubmitted);
    } else {
      setSelectedIndices([]);
      setIsSubmitted(false);
    }
  }, [question.id, savedState]);

  const handleOptionClick = (index: number) => {
    if (isSubmitted) return;

    if (question.type === QuestionType.Single) {
      setSelectedIndices([index]);
    } else {
      setSelectedIndices((prev) => {
        if (prev.includes(index)) return prev.filter((i) => i !== index);
        return [...prev, index];
      });
    }
  };

  const checkAnswer = () => {
    if (selectedIndices.length === 0) return;

    // Check correctness
    // Sort both arrays to ensure order doesn't matter for comparison
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedCorrect = [...question.correctIndices].sort((a, b) => a - b);
    
    const isCorrect = 
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, index) => val === sortedCorrect[index]);

    const newState: AnswerState = {
      selectedIndices,
      isSubmitted: true,
      isCorrect,
    };

    setIsSubmitted(true);
    onSaveProgress(question.id, newState);
  };

  const getOptionStyle = (index: number) => {
    const isSelected = selectedIndices.includes(index);
    const isCorrectAnswer = question.correctIndices.includes(index);
    
    let styles = "w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-start gap-3 ";

    if (isSubmitted) {
      if (isCorrectAnswer) {
        // Always highlight correct answers in green if submitted
        styles += "bg-green-50 border-green-500 text-green-800";
      } else if (isSelected && !isCorrectAnswer) {
        // Highlight wrong selections in red
        styles += "bg-red-50 border-red-500 text-red-800";
      } else {
        // Unselected, incorrect options
        styles += "bg-white border-slate-100 text-slate-400 opacity-60";
      }
    } else {
      // Interactive state
      if (isSelected) {
        styles += "bg-blue-50 border-blue-500 text-blue-900 shadow-sm";
      } else {
        styles += "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700";
      }
    }
    return styles;
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">第 {currentNumber} 题</span>
          <span className="text-slate-400 font-medium">/ 共 {totalQuestions} 题</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onToggleFavorite(question.id)}
            className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-yellow-100 text-yellow-500' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            title={isFavorite ? "取消收藏" : "收藏题目"}
          >
            <StarIcon className="w-6 h-6" filled={isFavorite} />
          </button>
          <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide">
            {question.type === QuestionType.Single ? '单选题' : '多选题'}
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <p className="text-lg text-slate-800 leading-relaxed font-medium">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(idx)}
            disabled={isSubmitted}
            className={getOptionStyle(idx)}
          >
            <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 
              ${isSubmitted && question.correctIndices.includes(idx) ? 'border-green-600 bg-green-600 text-white' : 
                isSubmitted && selectedIndices.includes(idx) && !question.correctIndices.includes(idx) ? 'border-red-500 bg-red-500 text-white' :
                selectedIndices.includes(idx) ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {isSubmitted ? (
                 question.correctIndices.includes(idx) ? <CheckIcon className="w-3.5 h-3.5" /> : 
                 (selectedIndices.includes(idx) ? <XMarkIcon className="w-3.5 h-3.5" /> : null)
              ) : (
                 selectedIndices.includes(idx) && <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="leading-snug">{option}</span>
          </button>
        ))}
      </div>

      {/* Explanation Section */}
      {isSubmitted && (
        <div className={`mb-8 p-5 rounded-lg border-l-4 ${
          savedState?.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
        }`}>
          <div className="flex items-center gap-2 mb-2">
             <span className={`font-bold ${savedState?.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {savedState?.isCorrect ? '回答正确！' : '回答错误。'}
             </span>
          </div>
          <div className="text-slate-700 text-sm">
            <span className="font-semibold block mb-1">解析：</span>
            {question.explanation}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between sticky bottom-0 bg-slate-50 pb-4 z-10">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          上一题
        </button>

        {!isSubmitted ? (
          <button
            onClick={checkAnswer}
            disabled={selectedIndices.length === 0}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm transition-all active:scale-95"
          >
            查看答案
          </button>
        ) : (
          <div className="text-slate-500 italic text-sm">
            {hasNext ? "请继续下一题。" : "测试结束。"}
          </div>
        )}

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          下一题
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuestionView;
