import React, { useState, useMemo } from 'react';
import { QuizRecord, QuestionBank, Question } from '../types';
import { XMarkIcon, CheckIcon } from './Icons';

interface HistoryDetailViewProps {
  record: QuizRecord;
  bank: QuestionBank; // We need the bank to look up question text/options
  onClose: () => void;
}

type FilterType = 'all' | 'incorrect' | 'correct' | 'unanswered';

const HistoryDetailView: React.FC<HistoryDetailViewProps> = ({ record, bank, onClose }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Map questions by ID for O(1) lookup
  const questionMap = useMemo(() => {
    return bank.questions.reduce((acc, q) => {
      acc[q.id] = q;
      return acc;
    }, {} as Record<string, Question>);
  }, [bank]);

  // Pre-process items with their status
  const analyzedItems = useMemo(() => {
    return record.questionIds.map((qId, index) => {
      const question = questionMap[qId];
      const userState = record.answers[qId];
      
      let status: 'correct' | 'incorrect' | 'unanswered' = 'unanswered';
      if (userState?.isSubmitted) {
        status = userState.isCorrect ? 'correct' : 'incorrect';
      }

      return {
        qId,
        index,
        question,
        userState,
        status
      };
    });
  }, [record, questionMap]);

  // Calculate counts
  const counts = useMemo(() => ({
    all: analyzedItems.length,
    incorrect: analyzedItems.filter(i => i.status === 'incorrect').length,
    correct: analyzedItems.filter(i => i.status === 'correct').length,
    unanswered: analyzedItems.filter(i => i.status === 'unanswered').length,
  }), [analyzedItems]);

  // Filter items for display
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return analyzedItems;
    return analyzedItems.filter(item => item.status === activeFilter);
  }, [activeFilter, analyzedItems]);

  const FilterButton = ({ type, label, count, colorClass, activeClass }: { 
    type: FilterType, 
    label: string, 
    count: number, 
    colorClass: string,
    activeClass: string 
  }) => (
    <button
      onClick={() => setActiveFilter(type)}
      className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5
        ${activeFilter === type 
          ? `${activeClass} bg-slate-50` 
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
    >
      <span>{label}</span>
      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeFilter === type ? colorClass.replace('text-', 'bg-').replace('border-', '') + ' text-white' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
         {/* Header */}
         <div className="shrink-0 bg-white z-10">
           <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">测试详情回放</h2>
                <div className="text-sm text-slate-500 mt-1 flex gap-4">
                   <span>{new Date(record.timestamp).toLocaleString()}</span>
                   <span>得分: {record.score}分</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-200">
                <XMarkIcon className="w-6 h-6" />
              </button>
           </div>

           {/* Filter Tabs */}
           <div className="flex border-b border-slate-100">
             <FilterButton 
                type="all" 
                label="全部" 
                count={counts.all} 
                colorClass="text-slate-600" 
                activeClass="border-slate-800 text-slate-800" 
             />
             <FilterButton 
                type="incorrect" 
                label="错误" 
                count={counts.incorrect} 
                colorClass="text-red-500" 
                activeClass="border-red-500 text-red-600" 
             />
             <FilterButton 
                type="correct" 
                label="正确" 
                count={counts.correct} 
                colorClass="text-green-600" 
                activeClass="border-green-500 text-green-700" 
             />
             <FilterButton 
                type="unanswered" 
                label="未作答" 
                count={counts.unanswered} 
                colorClass="text-slate-400" 
                activeClass="border-slate-400 text-slate-600" 
             />
           </div>
         </div>

         {/* Content */}
         <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-50/50">
           {filteredItems.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400">
               <p>没有符合筛选条件的题目</p>
             </div>
           ) : (
             <div className="space-y-6">
               {filteredItems.map(({ qId, index, question, userState, status }) => {
                 if (!question) {
                   return (
                     <div key={qId} className="p-4 rounded-xl border border-dashed border-slate-300 text-slate-400 text-center">
                       题目已从原题库中删除
                     </div>
                   );
                 }

                 const userSelected = userState?.selectedIndices || [];

                 return (
                   <div key={qId} className={`bg-white p-6 rounded-xl border shadow-sm ${status !== 'unanswered' ? (status === 'correct' ? 'border-green-200' : 'border-red-200') : 'border-slate-200'}`}>
                      <div className="flex justify-between items-start mb-4">
                         <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm shrink-0">
                           {index + 1}
                         </span>
                         <div className="ml-auto">
                            {status === 'unanswered' ? (
                              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">未作答</span>
                            ) : status === 'correct' ? (
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                                <CheckIcon className="w-3 h-3" /> 正确
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1">
                                <XMarkIcon className="w-3 h-3" /> 错误
                              </span>
                            )}
                         </div>
                      </div>

                      <p className="text-lg text-slate-800 font-medium mb-4">{question.text}</p>

                      <div className="space-y-2 mb-4">
                        {question.options.map((opt, optIdx) => {
                           const isUserSelected = userSelected.includes(optIdx);
                           const isActuallyCorrect = question.correctIndices.includes(optIdx);
                           
                           let itemClass = "p-3 rounded-lg border text-sm flex justify-between items-center ";
                           if (isUserSelected && isActuallyCorrect) {
                             itemClass += "bg-green-50 border-green-500 text-green-800 font-semibold";
                           } else if (isUserSelected && !isActuallyCorrect) {
                             itemClass += "bg-red-50 border-red-500 text-red-800";
                           } else if (!isUserSelected && isActuallyCorrect) {
                             itemClass += "bg-green-50/50 border-green-200 text-green-800";
                           } else {
                             itemClass += "bg-white border-slate-100 text-slate-500";
                           }

                           return (
                             <div key={optIdx} className={itemClass}>
                               <div className="flex items-center gap-3">
                                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px]
                                   ${isUserSelected ? (isActuallyCorrect ? 'bg-green-600 border-green-600 text-white' : 'bg-red-500 border-red-500 text-white') : 'border-slate-300'}
                                 `}>
                                   {isUserSelected && (isActuallyCorrect ? <CheckIcon className="w-3 h-3" /> : <XMarkIcon className="w-3 h-3" />)}
                                 </div>
                                 <span>{opt}</span>
                               </div>
                               {isActuallyCorrect && !isUserSelected && <span className="text-xs font-bold text-green-600">正确答案</span>}
                             </div>
                           );
                        })}
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
                         <span className="font-bold text-slate-700 block mb-1">解析：</span>
                         {question.explanation}
                      </div>
                   </div>
                 );
               })}
             </div>
           )}
         </div>
       </div>
    </div>
  );
};

export default HistoryDetailView;