import React, { useState, useCallback } from 'react';
import { PRAISE_PHRASES } from './constants';
import { generatePraisePoem } from './services/geminiService';
import { PraiseCard } from './components/PraiseCard';
import { GiftIcon } from './components/icons';
import { PraiseCharacter } from './components/PraiseCharacter';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [generatedPoem, setGeneratedPoem] = useState<string>('');
  const [selectedPraise, setSelectedPraise] = useState<string>('');
  const [nameForPoem, setNameForPoem] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (name.trim().length < 2 || name.trim().length > 5) {
      setError('이름은 2자 이상, 5자 이하로 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPoem('');
    setNameForPoem(name);

    try {
      const randomPraise = PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
      setSelectedPraise(randomPraise);

      const poem = await generatePraisePoem(name, randomPraise);
      setGeneratedPoem(poem);
    } catch (err: any) {
      setError(err.message || '칭찬 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [name]);
  
  const handleReset = () => {
    setName('');
    setGeneratedPoem('');
    setSelectedPraise('');
    setNameForPoem('');
    setError(null);
  };

  const isButtonDisabled = isLoading || name.trim().length < 2 || name.trim().length > 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center p-4 font-sans text-gray-800">
      <main className="w-full max-w-lg mx-auto text-center flex-grow flex flex-col justify-center">
        <div>
          <header className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <GiftIcon className="w-10 h-10 text-orange-500" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                디지털 칭찬 상자
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              {!generatedPoem 
                ? '칭찬하고 싶은 사람의 이름을 적고 버튼을 눌러보세요!'
                : '오늘의 칭찬 주인공이 탄생했어요!'}
            </p>
          </header>

          {!isLoading && !generatedPoem && (
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md w-full mb-8 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="이름 (2~5자)"
                  className="flex-grow w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow duration-200"
                  onKeyDown={(e) => e.key === 'Enter' && !isButtonDisabled && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isButtonDisabled}
                  className="flex items-center justify-center w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  오늘의 칭찬 주인공 뽑기
                </button>
              </div>
            </div>
          )}

          <div className="w-full min-h-[24rem] flex flex-col items-center justify-center">
            {isLoading ? (
               <div className="flex flex-col items-center text-center text-gray-600">
                  <PraiseCharacter state="loading" />
                  <p className="text-lg mt-4 animate-pulse">AI가 열심히 칭찬을 만들고 있어요...</p>
                  <p className="animate-pulse">잠시만 기다려 주세요!</p>
              </div>
            ) : error ? (
              <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
            ) : generatedPoem ? (
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="relative w-full flex justify-center">
                   <div className="absolute -left-12 -top-10 hidden lg:block transform -rotate-12">
                     <PraiseCharacter state="success" />
                  </div>
                  <PraiseCard
                    name={nameForPoem}
                    praise={selectedPraise}
                    poem={generatedPoem}
                  />
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 animate-fade-in-up"
                >
                  다른 주인공 뽑기
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 flex flex-col items-center">
                <PraiseCharacter state="idle" />
                <p className="text-xl mt-4">오늘의 칭찬 주인공은 누구일까요?</p>
                <p>이름을 입력하고 버튼을 눌러 확인해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 pt-4 text-center text-gray-500 text-sm">
        <p>© 2025 김경희</p>
      </footer>
    </div>
  );
};

export default App;