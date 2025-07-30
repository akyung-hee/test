import React, { useState } from 'react';
import { SparklesIcon, CopyIcon, CheckIcon } from './icons';

interface PraiseCardProps {
  name: string;
  praise: string;
  poem: string;
}

export const PraiseCard: React.FC<PraiseCardProps> = ({ name, praise, poem }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(poem);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('복사에 실패했습니다.');
    }
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-yellow-200 w-full max-w-md animate-fade-in-up">
      <div className="flex items-center justify-center mb-4">
        <SparklesIcon className="w-8 h-8 text-yellow-500 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {name}님을 위한 칭찬!
        </h2>
      </div>
      <blockquote className="text-center text-gray-600 italic mb-6 border-l-4 border-yellow-300 pl-4 py-2">
        "{praise}"
      </blockquote>
      <div className="relative bg-yellow-100/50 p-6 rounded-lg">
        <div className="text-xl text-gray-700 font-semibold whitespace-pre-wrap text-center leading-relaxed">
          {poem.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ease-in-out ${
            isCopied
              ? 'bg-green-500 text-white'
              : 'bg-gray-200/50 hover:bg-gray-300/70 text-gray-600'
          }`}
          aria-label={isCopied ? '복사 완료' : '시 내용 복사하기'}
        >
          {isCopied ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <CopyIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
