import React from 'react';
import { Question, MistakeRecord } from '../types';
import { TrashIcon, ChevronLeftIcon, CheckIcon } from './Icons';

interface QuestionListViewProps {
  title: string;
  items: { question: Question; record?: MistakeRecord }[];
  onBack: () => void;
  onRemove: (id: string) => void;
  type: 'favorites' | 'mistakes';
}

const QuestionListView: React.FC<QuestionListViewProps> = ({ title, items, onBack, onRemove, type }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20 shadow-sm sticky top-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        </div>
        <div className="text-sm text-slate-500">
           共 {items.length} 条记录
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-5xl mx-auto w-full custom-scrollbar">
        {items.length === 0 ? (
           <div className="text-center py-20 text-slate-400">
             <p>暂无记录。</p>
           </div>
        ) : (
          <div className="space-y-6">
            {items.map(({ question, record }) => (
              <div key={question.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                       <span className={`px-2 py-0.5 rounded text-xs font-bold ${question.type === 'single' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                         {question.type === 'single' ? '单选' : '多选'}
                       </span>
                       {record && (
                         <>
                           <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs">
                             错误次数: {record.count}
                           </span>
                           <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs">
                             最近错误: {new Date(record.lastWrongAt).toLocaleDateString()}
                           </span>
                         </>
                       )}
                    </div>

                    <h3 className="text-lg text-slate-800 font-medium mb-4 leading-relaxed">{question.text}</h3>
                    
                    {/* Options Display */}
                    <div className="space-y-2 mb-4">
                      {question.options.map((opt, idx) => {
                        const isCorrect = question.correctIndices.includes(idx);
                        return (
                          <div key={idx} className={`p-2.5 rounded-lg border text-sm flex items-start gap-3 ${
                            isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}>
                            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                              isCorrect ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-slate-300 text-slate-500'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="pt-0.5">{opt}</span>
                            {isCorrect && <span className="ml-auto text-xs font-bold text-green-600 flex-shrink-0 flex items-center gap-1"><CheckIcon className="w-3 h-3"/> 正确答案</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                       <span className="font-bold text-blue-800 text-sm block mb-1">解析：</span>
                       <p className="text-sm text-slate-700 leading-relaxed">{question.explanation}</p>
                    </div>

                    {/* Historical Mistakes */}
                    {record && record.history && record.history.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 mb-2">历史错误选择：</p>
                        <div className="flex flex-wrap gap-2">
                          {record.history.slice(-5).reverse().map((h, i) => (
                            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                              {new Date(h.timestamp).toLocaleDateString()} 选了: {h.selectedIndices.map(idx => String.fromCharCode(65 + idx)).join(', ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => onRemove(question.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title={type === 'favorites' ? "取消收藏" : "移出错题本"}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionListView;
