import React, { useState, useRef } from 'react';
import { QuestionBank } from '../types';
import { DocumentPlusIcon, XMarkIcon } from './Icons';

interface CreateBankModalProps {
  onClose: () => void;
  onStartProcessing: (file: File, title: string, description: string) => void;
}

const CreateBankModal: React.FC<CreateBankModalProps> = ({ onClose, onStartProcessing }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    // Hand off to parent immediately
    onStartProcessing(file, title, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <DocumentPlusIcon className="w-6 h-6 text-blue-600" />
            创建题库
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
             系统将在后台自动处理文档，处理完成后您可以在列表看到生成的题库。
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">题库名称</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="例如：历史期末复习"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">描述（可选）</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="简短描述..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">上传文档 (PDF/Word)</label>
            <div 
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                file ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <DocumentPlusIcon className={`w-10 h-10 mb-2 ${file ? 'text-green-500' : 'text-slate-400'}`} />
              <p className="text-sm font-medium text-slate-600 text-center">
                {file ? file.name : "点击上传 PDF 或 Word"}
              </p>
              {!file && <p className="text-xs text-slate-400 mt-1">AI 将自动提取题目</p>}
            </div>
          </div>
        </form>

        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || !title}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm transition-all"
          >
            开始生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBankModal;
