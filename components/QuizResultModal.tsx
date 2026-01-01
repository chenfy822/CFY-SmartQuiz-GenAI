import React, { useEffect, useState } from 'react';
import { QuizRecord } from '../types';
import { CheckIcon, XMarkIcon } from './Icons';

interface QuizResultModalProps {
  record: QuizRecord;
  onClose: () => void;
}

const QuizResultModal: React.FC<QuizResultModalProps> = ({ record, onClose }) => {
  const incorrectCount = record.attemptedCount - record.correctCount;
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      onClose();
    }
  }, [countdown, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="p-6 bg-slate-50 border-b border-slate-100 text-center">
           <h2 className="text-2xl font-bold text-slate-800">测验结果</h2>
           <p className="text-slate-500 text-sm mt-1">{record.bankTitle}</p>
        </div>
        
        <div className="p-8">
           <div className="flex justify-center mb-8">
              <div className="text-center">
                 <div className={`text-5xl font-extrabold mb-2 ${record.score >= 60 ? 'text-green-600' : 'text-red-500'}`}>
                    {record.score}<span className="text-2xl">%</span>
                 </div>
                 <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">总得分 (基于总题数)</div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                 <span className="text-sm text-slate-500 mb-1">总题数</span>
                 <span className="text-xl font-bold text-slate-800">{record.totalQuestions}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                 <span className="text-sm text-slate-500 mb-1">已做题数</span>
                 <span className="text-xl font-bold text-blue-600">{record.attemptedCount}</span>
              </div>
           </div>

           <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-100">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center">
                       <CheckIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-slate-700">做对题目</span>
                 </div>
                 <span className="font-bold text-green-700 text-lg">{record.correctCount}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 border border-red-100">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-200 text-red-700 flex items-center justify-center">
                       <XMarkIcon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-slate-700">做错题目</span>
                 </div>
                 <span className="font-bold text-red-700 text-lg">{incorrectCount}</span>
              </div>
           </div>
           
           <div className="mt-6 text-center text-sm text-slate-500">
              做题正确率: <span className="font-bold text-slate-700">{record.accuracy}%</span>
           </div>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            返回首页 
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-normal min-w-[30px]">
              {countdown}s
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultModal;
