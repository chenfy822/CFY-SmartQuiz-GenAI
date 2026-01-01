import React from 'react';
import { Question, MistakeRecord } from '../types';
import { TrashIcon, ChevronLeftIcon } from './Icons';

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

      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-5xl mx-auto w-full">
        {items.length === 0 ? (
           <div className="text-center py-20 text-slate-400">
             <p>暂无记录。</p>
           </div>
        ) : (
          <div className="space-y-4">
            {items.map(({ question, record }) => (
              <div key={question.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-slate-800 font-medium mb-2 leading-relaxed">{question.text}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-3">
                       <span className="bg-slate-100 px-2 py-1 rounded">
                         {question.type === 'single' ? '单选' : '多选'}
                       </span>
                       {record && (
                         <>
                           <span className="bg-red-50 text-red-600 px-2 py-1 rounded">
                             错误次数: {record.count}
                           </span>
                           <span className="bg-slate-100 px-2 py-1 rounded">
                             最近错误: {new Date(record.lastWrongAt).toLocaleString()}
                           </span>
                         </>
                       )}
                    </div>
                    
                    {record && record.history && record.history.length > 0 && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                        <p className="font-semibold mb-1">历史错误记录：</p>
                        <ul className="list-disc list-inside space-y-1">
                          {record.history.slice(-3).reverse().map((h, i) => (
                            <li key={i}>
                              {new Date(h.timestamp).toLocaleDateString()} - 选择了: {h.selectedIndices.map(idx => String.fromCharCode(65 + idx)).join(', ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-3 text-sm text-slate-600">
                        <span className="font-semibold">正确答案：</span> 
                        {question.correctIndices.map(idx => String.fromCharCode(65 + idx)).join(', ')}
                    </div>
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
