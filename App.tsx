import React, { useState, useEffect, useRef } from 'react';
import { QuestionBank, QuizProgress, AnswerState, ViewState, Question, MistakeRecord, QuizRecord } from './types';
import QuestionView from './components/QuestionView';
import QuestionMap from './components/QuestionMap';
import QuestionListView from './components/QuestionListView';
import CreateBankModal from './components/CreateBankModal';
import QuizResultModal from './components/QuizResultModal';
import HistoryDetailView from './components/HistoryDetailView';
import { DocumentPlusIcon, ChevronLeftIcon, BeakerIcon, BookmarkIcon, ListBulletIcon, TrashIcon, ClockIcon, XMarkIcon } from './components/Icons';
import { generateQuestionBank } from './services/geminiService';

// Keys for LocalStorage
const STORAGE_KEYS = {
  BANKS: 'sq_banks',
  PROGRESS: 'sq_progress', 
  FAVORITES: 'sq_favorites',
  MISTAKES: 'sq_mistakes',
  QUIZ_HISTORY: 'sq_quiz_history',
  ACTIVE_SESSION: 'sq_active_session' 
};

// Helper for shuffling
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const App: React.FC = () => {
  // State
  const [banks, setBanks] = useState<QuestionBank[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeBankId, setActiveBankId] = useState<string | null>(null);
  
  // Active Session State
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState<Record<string, QuizProgress>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // New Features State
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState<Record<string, MistakeRecord>>({});
  const [quizHistory, setQuizHistory] = useState<QuizRecord[]>([]);

  // Modals State
  const [showHistoryModalBankId, setShowHistoryModalBankId] = useState<string | null>(null);
  const [showResultModalRecord, setShowResultModalRecord] = useState<QuizRecord | null>(null);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState<QuizRecord | null>(null);

  // Ref to track if initial load is done
  const isLoaded = useRef(false);

  // --- Persistence Logic ---

  useEffect(() => {
    const loadData = () => {
      try {
        const savedBanks = localStorage.getItem(STORAGE_KEYS.BANKS);
        const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        const savedMistakes = localStorage.getItem(STORAGE_KEYS.MISTAKES);
        const savedHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);

        if (savedBanks) setBanks(JSON.parse(savedBanks));
        if (savedProgress) setProgress(JSON.parse(savedProgress));
        if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
        if (savedMistakes) setMistakes(JSON.parse(savedMistakes));
        if (savedHistory) setQuizHistory(JSON.parse(savedHistory));
        
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION); 

      } catch (e) {
        console.error("Failed to load data from storage", e);
      } finally {
        isLoaded.current = true;
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem(STORAGE_KEYS.BANKS, JSON.stringify(banks));
  }, [banks]);

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(quizHistory));
  }, [quizHistory]);

  // --- Computed ---
  const activeBank = banks.find(b => b.id === activeBankId);
  const currentProgress = activeBankId ? (progress[activeBankId] || {}) : {};

  // --- Handlers ---

  const toggleFavorite = (questionId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleStartCreateBank = async (file: File, title: string, description: string) => {
    const tempId = `bank-${Date.now()}`;
    const newBank: QuestionBank = {
      id: tempId,
      title,
      description: description || "正在处理文档...",
      createdAt: Date.now(),
      status: 'processing',
      progress: 0,
      questions: [],
      source: 'upload'
    };

    setBanks(prev => [newBank, ...prev]);

    // Simulate progress
    const interval = setInterval(() => {
      setBanks(prev => prev.map(b => {
        if (b.id === tempId && b.status === 'processing') {
          const nextProgress = (b.progress || 0) + Math.random() * 10;
          return { ...b, progress: nextProgress > 90 ? 90 : nextProgress };
        }
        return b;
      }));
    }, 500);

    try {
      const questions = await generateQuestionBank(file, title);
      
      clearInterval(interval);
      setBanks(prev => prev.map(b => {
        if (b.id === tempId) {
          return {
            ...b,
            status: 'ready',
            progress: 100,
            questions,
            description: description || "导入的题库",
            source: 'upload'
          };
        }
        return b;
      }));

    } catch (err: any) {
      clearInterval(interval);
      setBanks(prev => prev.map(b => {
        if (b.id === tempId) {
          return { ...b, status: 'error', description: "处理失败: " + err.message };
        }
        return b;
      }));
    }
  };

  const handleStartQuiz = (bankId: string) => {
    const bank = banks.find(b => b.id === bankId);
    if (!bank) return;

    // 1. Reset Progress for this bank (Clean slate)
    setProgress(prev => {
      const next = { ...prev };
      delete next[bankId];
      return next;
    });

    // 2. Randomize Questions
    const shuffled = shuffleArray(bank.questions);
    setActiveQuestions(shuffled);

    setActiveBankId(bankId);
    setCurrentQuestionIndex(0);
    setCurrentView('quiz');
  };

  const handleStartFavoritesQuiz = () => {
    const favQuestions: Question[] = [];
    const processedIds = new Set<string>();

    banks.forEach(bank => {
      bank.questions.forEach(q => {
        if (favorites.has(q.id) && !processedIds.has(q.id)) {
          favQuestions.push(q);
          processedIds.add(q.id);
        }
      });
    });

    if (favQuestions.length === 0) {
      alert("没有收藏的题目。");
      return;
    }

    const favBankId = 'favorites-bank-dynamic';
    const favBank: QuestionBank = {
      id: favBankId,
      title: '我的收藏',
      description: '所有已收藏的题目集合',
      createdAt: Date.now(),
      status: 'ready',
      questions: favQuestions,
      isSystem: true
    };

    setBanks(prev => {
      const filtered = prev.filter(b => b.id !== favBankId);
      return [favBank, ...filtered];
    });
    
    handleStartQuiz(favBankId);
  };

  const handleCreateMistakeWorkbook = (e: React.MouseEvent) => {
    e.stopPropagation();

    const allMistakes = Object.values(mistakes) as MistakeRecord[];
    if (allMistakes.length === 0) {
      alert("目前还没有错题记录！");
      return;
    }

    // Shuffle logic
    const shuffledMistakes = shuffleArray(allMistakes);
    const selectedQuestions = shuffledMistakes.slice(0, 20).map(m => m.question);

    const newBankId = `mistake-practice-${Date.now()}`;
    const newBank: QuestionBank = {
      id: newBankId,
      title: `错题练习-${new Date().toLocaleDateString()}-${Math.floor(Math.random() * 1000)}`,
      description: `从错题本随机生成的 ${selectedQuestions.length} 道题目练习。`,
      createdAt: Date.now(),
      status: 'ready',
      questions: selectedQuestions,
      source: 'practice',
      isSystem: false // Ensure it's not a system bank so it can be deleted
    };

    setBanks(prev => [newBank, ...prev]);
    alert(`已生成“${newBank.title}”，请在下方“错题练习历史”中查看。`);
  };

  const handleSaveProgress = (questionId: string, state: AnswerState) => {
    if (!activeBankId) return;

    // Save Quiz Progress
    setProgress(prev => ({
      ...prev,
      [activeBankId]: {
        ...prev[activeBankId],
        [questionId]: state
      }
    }));

    // Handle Mistakes Logic
    if (!state.isCorrect && activeBank) {
      const question = activeQuestions.find(q => q.id === questionId);
      if (question) {
        setMistakes(prev => {
          const current = prev[questionId] || { 
            question, 
            count: 0, 
            lastWrongAt: 0, 
            history: [] 
          };
          
          return {
            ...prev,
            [questionId]: {
              question,
              count: current.count + 1,
              lastWrongAt: Date.now(),
              history: [
                ...(current.history || []), 
                { timestamp: Date.now(), selectedIndices: state.selectedIndices }
              ]
            }
          };
        });
      }
    }
  };

  const handleSubmitQuiz = () => {
    if (!activeBank) return;

    const bankProgress = progress[activeBank.id] || {};
    const total = activeQuestions.length; 
    
    // Calculate stats
    const answered = Object.values(bankProgress).filter(p => p.isSubmitted);
    const attemptedCount = answered.length;
    const correctCount = answered.filter(p => p.isCorrect).length;
    
    // Accuracy based on attempted
    const accuracy = attemptedCount === 0 ? 0 : Math.round((correctCount / attemptedCount) * 100);
    // Score based on total
    const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);

    const record: QuizRecord = {
      id: `rec-${Date.now()}`,
      bankId: activeBank.id,
      bankTitle: activeBank.title,
      timestamp: Date.now(),
      totalQuestions: total,
      attemptedCount: attemptedCount,
      correctCount: correctCount,
      score: score,
      accuracy: accuracy,
      durationSeconds: 0,
      answers: JSON.parse(JSON.stringify(bankProgress)), // Deep copy answers
      questionIds: activeQuestions.map(q => q.id) // Save the order of this session
    };

    setQuizHistory(prev => [record, ...prev]);
    setShowResultModalRecord(record);
  };

  // Robust delete function for any bank type (Uploaded or Practice)
  const handleDeleteBank = (e: React.MouseEvent, bankId: string) => {
      e.stopPropagation();
      if(window.confirm("确定要删除这个题库/练习册吗？删除后不可恢复。")) {
          setBanks(prev => prev.filter(b => b.id !== bankId));
          // Clean up progress
          setProgress(prev => {
              const newProgress = {...prev};
              delete newProgress[bankId];
              return newProgress;
          });
          // Note: We keep quiz history for analytics, or you could delete it here too if strict cleanup is needed
      }
  }

  const handleDeleteMistake = (id: string) => {
    if(window.confirm("确定要将此题移出错题本吗？")) {
      setMistakes(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setActiveBankId(null);
    setActiveQuestions([]);
    setShowResultModalRecord(null);
  };

  const nextQuestion = () => {
    if (activeBank && currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getFilteredQuestionsForList = (type: 'favorites' | 'mistakes') => {
    if (type === 'favorites') {
      const items: { question: Question; record?: MistakeRecord }[] = [];
      const processed = new Set<string>();
      
      banks.forEach(b => {
        b.questions.forEach(q => {
          if (favorites.has(q.id) && !processed.has(q.id)) {
            items.push({ question: q });
            processed.add(q.id);
          }
        });
      });
      return items;
    } else {
      return Object.values(mistakes).map(record => ({
        question: record.question,
        record: record
      })).sort((a, b) => b.record!.lastWrongAt - a.record!.lastWrongAt);
    }
  };

  // --- Render Helpers ---
  const renderBankGrid = (bankList: QuestionBank[], emptyMessage: string) => {
    if (bankList.length === 0) {
       return (
         <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
            <p>{emptyMessage}</p>
         </div>
       );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bankList.map(bank => (
          <div 
            key={bank.id} 
            className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden relative group
              ${bank.status === 'processing' 
                ? 'border-slate-200 opacity-90' 
                : bank.status === 'error'
                  ? 'border-red-200'
                  : 'border-slate-200 hover:shadow-lg hover:border-blue-200 cursor-pointer'
              }`}
            onClick={() => bank.status === 'ready' && handleStartQuiz(bank.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl transition-colors
                  ${bank.status === 'processing' ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                  {bank.status === 'processing' ? (
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    bank.title.charAt(0).toUpperCase()
                  )}
                </div>
                
                <div className="flex gap-2">
                   {/* History Button */}
                   {bank.status === 'ready' && (
                     <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHistoryModalBankId(bank.id);
                        }}
                        className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors z-10"
                        title="查看测验记录"
                     >
                       <ClockIcon className="w-5 h-5" />
                     </button>
                   )}
                   {/* Delete Button */}
                   {bank.status === 'ready' && (
                      <button 
                          onClick={(e) => handleDeleteBank(e, bank.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
                          title="删除"
                      >
                          <TrashIcon className="w-5 h-5" />
                      </button>
                   )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{bank.title}</h3>
              <p className={`text-sm line-clamp-2 ${bank.status === 'error' ? 'text-red-500' : 'text-slate-500'}`}>
                {bank.description}
              </p>
              
               {bank.status === 'ready' && (
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded mt-2 inline-block">
                    {bank.questions.length} 道题目
                  </span>
                )}

              {bank.status === 'processing' && (
                <div className="mt-4">
                   <div className="flex justify-between text-xs text-slate-500 mb-1">
                     <span>正在生成...</span>
                     <span>{Math.round(bank.progress || 0)}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                     <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${bank.progress}%` }}></div>
                   </div>
                </div>
              )}
            </div>
            
            {bank.status === 'ready' && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="text-slate-400">创建于 {new Date(bank.createdAt).toLocaleDateString()}</span>
                    <span className="font-semibold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                      开始测试 &rarr;
                    </span>
                  </div>
                )}
          </div>
        ))}
      </div>
    );
  };

  // --- Views ---

  if (currentView === 'mistake-list') {
    return (
      <QuestionListView 
        title="错题本详情" 
        items={getFilteredQuestionsForList('mistakes')} 
        onBack={handleBackToHome}
        onRemove={handleDeleteMistake}
        type="mistakes"
      />
    );
  }

  if (currentView === 'favorites-list') {
    return (
       <QuestionListView 
        title="我的收藏" 
        items={getFilteredQuestionsForList('favorites')} 
        onBack={handleBackToHome}
        onRemove={(id) => setFavorites(prev => { const n = new Set(prev); n.delete(id); return n; })}
        type="favorites"
      />
    );
  }

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-slate-50 p-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">SmartQuiz GenAI</h1>
              <p className="text-slate-500 mt-1">即时从文档生成题库，智能复习。</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
            >
              <DocumentPlusIcon className="w-5 h-5" />
              创建新题库
            </button>
          </header>

          {/* System Banks Section */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Favorites Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-sm border border-yellow-200 p-6 flex flex-col justify-between h-40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                    <BookmarkIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">我的收藏</h3>
                    <p className="text-slate-500 text-sm">共 {favorites.size} 道收藏题目</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                 <button 
                  onClick={handleStartFavoritesQuiz}
                  disabled={favorites.size === 0}
                  className="flex-1 py-2 bg-white text-yellow-600 text-sm font-semibold rounded-lg shadow-sm border border-yellow-100 hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   开始练习
                 </button>
                 <button 
                  onClick={() => setCurrentView('favorites-list')}
                  className="px-3 py-2 bg-white text-yellow-600 rounded-lg shadow-sm border border-yellow-100 hover:bg-yellow-50 transition-colors"
                  title="查看列表"
                 >
                   <ListBulletIcon className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Mistakes Card */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-sm border border-red-200 p-6 flex flex-col justify-between h-40">
               <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                      <BeakerIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">错题本</h3>
                      <p className="text-slate-500 text-sm">库中累计 {Object.keys(mistakes).length} 道错题</p>
                    </div>
                  </div>
               </div>
               <div className="flex gap-3 mt-4">
                 <button 
                  onClick={handleCreateMistakeWorkbook}
                  disabled={Object.keys(mistakes).length === 0}
                  className="flex-1 py-2 bg-white text-red-600 text-sm font-semibold rounded-lg shadow-sm border border-red-100 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   生成练习册
                 </button>
                  <button 
                  onClick={() => setCurrentView('mistake-list')}
                  className="px-3 py-2 bg-white text-red-600 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition-colors"
                  title="查看列表"
                 >
                   <ListBulletIcon className="w-5 h-5" />
                 </button>
               </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            我的题库
            <span className="text-sm font-normal text-slate-400">({banks.filter(b => !b.isSystem && b.source !== 'practice').length})</span>
          </h2>
          {renderBankGrid(
            banks.filter(b => !b.isSystem && (b.source === 'upload' || !b.source)), 
            "暂无上传的题库，请点击右上角创建。"
          )}
          
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              错题练习历史
              <span className="text-sm font-normal text-slate-400">({banks.filter(b => !b.isSystem && b.source === 'practice').length})</span>
            </h2>
             {renderBankGrid(
              banks.filter(b => !b.isSystem && b.source === 'practice'), 
              "暂无生成的错题练习册。"
            )}
          </div>
        </div>

        {showCreateModal && (
          <CreateBankModal 
            onClose={() => setShowCreateModal(false)}
            onStartProcessing={handleStartCreateBank}
          />
        )}

        {/* Quiz History List Modal */}
        {showHistoryModalBankId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowHistoryModalBankId(null)}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-800">测验记录</h3>
                 <button onClick={() => setShowHistoryModalBankId(null)} className="text-slate-400 hover:text-slate-600">
                    <XMarkIcon className="w-5 h-5" />
                 </button>
               </div>
               <div className="p-4 overflow-y-auto custom-scrollbar">
                 {quizHistory.filter(h => h.bankId === showHistoryModalBankId).length === 0 ? (
                   <p className="text-center text-slate-400 py-4">暂无测验记录。</p>
                 ) : (
                   <div className="space-y-3">
                     {quizHistory.filter(h => h.bankId === showHistoryModalBankId).sort((a,b) => b.timestamp - a.timestamp).map(record => (
                       <div 
                        key={record.id} 
                        onClick={() => {
                          setShowHistoryModalBankId(null);
                          setViewingHistoryRecord(record);
                        }}
                        className="border border-slate-100 rounded-lg p-3 bg-slate-50 flex justify-between items-center hover:bg-blue-50 hover:border-blue-100 cursor-pointer transition-colors"
                       >
                         <div>
                           <div className="text-xs text-slate-400">{new Date(record.timestamp).toLocaleString()}</div>
                           <div className="font-medium text-slate-700 mt-1">得分: {record.score}分</div>
                         </div>
                         <div className="text-right">
                           <div className={`text-lg font-bold ${record.score >= 60 ? 'text-green-600' : 'text-red-500'}`}>
                             {record.score}%
                           </div>
                           <div className="text-xs text-slate-400">{record.correctCount}/{record.totalQuestions} 正确</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}

        {/* New Quiz Result Summary Modal */}
        {showResultModalRecord && (
          <QuizResultModal 
            record={showResultModalRecord} 
            onClose={handleBackToHome}
          />
        )}

        {/* History Detail Modal */}
        {viewingHistoryRecord && (
          <HistoryDetailView
            record={viewingHistoryRecord}
            bank={banks.find(b => b.id === viewingHistoryRecord.bankId)!}
            onClose={() => setViewingHistoryRecord(null)}
          />
        )}

      </div>
    );
  }

  // Quiz View
  if (currentView === 'quiz' && activeBank) {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    
    return (
      <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackToHome}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 truncate max-w-md">{activeBank.title}</h1>
          </div>
          <div className="text-sm font-medium text-slate-500">
             第 {currentQuestionIndex + 1} 题 / 共 {activeQuestions.length} 题
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Question Area (70%) */}
          <main className="w-[70%] h-full overflow-y-auto p-6 lg:p-10 custom-scrollbar">
            {currentQuestion && (
              <QuestionView
                question={currentQuestion}
                totalQuestions={activeQuestions.length}
                currentNumber={currentQuestionIndex + 1}
                savedState={currentProgress[currentQuestion.id]}
                isFavorite={favorites.has(currentQuestion.id)}
                onSaveProgress={handleSaveProgress}
                onToggleFavorite={toggleFavorite}
                onNext={nextQuestion}
                onPrev={prevQuestion}
                hasPrev={currentQuestionIndex > 0}
                hasNext={currentQuestionIndex < activeQuestions.length - 1}
              />
            )}
          </main>

          {/* Right: Question Map (30%) */}
          <aside className="w-[30%] h-full bg-slate-100 border-l border-slate-200 p-4">
            <QuestionMap
              questions={activeQuestions}
              progress={currentProgress}
              currentIndex={currentQuestionIndex}
              onSelectQuestion={setCurrentQuestionIndex}
              onSubmitQuiz={handleSubmitQuiz}
            />
          </aside>
        </div>
      </div>
    );
  }

  return null;
};

export default App;