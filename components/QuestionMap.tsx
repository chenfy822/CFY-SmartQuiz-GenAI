import React from 'react';
import { Question, QuizProgress, AnswerState } from '../types';
import { CheckIcon, XMarkIcon } from './Icons';

interface QuestionMapProps {
  questions: Question[];
  progress: QuizProgress;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onSubmitQuiz?: () => void;
}

const QuestionMap: React.FC<QuestionMapProps> = ({
  questions,
  progress,
  currentIndex,
  onSelectQuestion,
  onSubmitQuiz
}) => {
  const correctCount = Object.values(progress).filter((p: AnswerState) => p.isSubmitted && p.isCorrect).length;
  const incorrectCount = Object.values(progress).filter((p: AnswerState) => p.isSubmitted && !p.isCorrect).length;
  const total = questions.length;
  const answeredCount = correctCount + incorrectCount;
  const progressPercent = total === 0 ? 0 : Math.round((answeredCount / total) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800">答题卡</h3>
        <div className="flex items-center justify-between text-sm mt-2 text-slate-600">
          <span>完成进度</span>
          <span className="font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-100 border border-green-500 flex items-center justify-center">
              <CheckIcon className="w-2 h-2 text-green-600" />
            </span>
            <span>正确 ({correctCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-100 border border-red-500 flex items-center justify-center">
              <XMarkIcon className="w-2 h-2 text-red-600" />
            </span>
            <span>错误 ({incorrectCount})</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const state = progress[q.id];
            const isCurrent = idx === currentIndex;
            const isAnswered = state?.isSubmitted;
            const isCorrect = state?.isCorrect;

            let baseClasses = "aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 border cursor-pointer select-none";
            let statusClasses = "bg-white border-slate-200 text-slate-600 hover:border-blue-400";
            
            if (isAnswered) {
              if (isCorrect) {
                statusClasses = "bg-green-50 border-green-400 text-green-700";
              } else {
                statusClasses = "bg-red-50 border-red-400 text-red-700";
              }
            }

            if (isCurrent) {
              statusClasses += " ring-2 ring-blue-500 ring-offset-1 border-blue-500";
            }

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(idx)}
                className={`${baseClasses} ${statusClasses}`}
              >
                {isAnswered ? (
                  isCorrect ? <CheckIcon className="w-5 h-5" /> : <XMarkIcon className="w-5 h-5" />
                ) : (
                  q.number
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {onSubmitQuiz && (
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button 
            onClick={onSubmitQuiz}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm"
          >
            提交测验结果
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionMap;