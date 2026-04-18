import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Check, MapPin, Instagram, Globe, Ticket, MessageCircle, Navigation, Camera, Share2 } from 'lucide-react';

type ScreenState = 'welcome' | 'nickname' | 'quiz' | 'result';

const QUESTIONS = [
  {
    id: 1,
    question: "Тебе больше нравится:",
    options: ["Бездорожье", "Шоссе"]
  },
  {
    id: 2,
    question: "Какой стиль предпочтешь:",
    options: ["Яркий незабываемый", "Строгий, но изысканный"]
  },
  {
    id: 3,
    question: "Ты чаще:",
    options: ["Любишь гулять один", "Всегда в компании"]
  },
  {
    id: 4,
    question: "Что выберешь:",
    options: ["Контроль и комфорт", "Адреналин"]
  },
  {
    id: 5,
    question: "Тебе по душе:",
    options: ["Все новое и современное", "Только классика"]
  }
];

const MOTORCYCLES = {
  ENDURO: {
    name: "Иж К-16 (Покоритель Бездорожья)",
    image: "https://images.unsplash.com/photo-1620050858102-bfbe7a876ae9?auto=format&fit=crop&q=80&w=800",
    description: "Для тебя нет преград. Адреналин, грязь, прыжки и полная свобода — это твоя стихия."
  },
  SPORT: {
    name: "Иж Планета Спорт (Советский Стритфайтер)",
    image: "https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?auto=format&fit=crop&q=80&w=800",
    description: "Яркий, дерзкий, быстрый! Ты любишь обращать на себя внимание и быть впереди потока."
  },
  SIDECAR: {
    name: "Иж Юпитер-5 с коляской (Душа Компании)",
    image: "https://images.unsplash.com/photo-1627961205943-7f7cd4af7dc0?auto=format&fit=crop&q=80&w=800",
    description: "Ты обожаешь путешествовать с друзьями и ценишь надежность, комфорт и приятную компанию."
  },
  MODERN: {
    name: "Современный Кастом (Новая школа)",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    description: "Ты следишь за трендами, ценишь технологии и современный дизайн, но уважаешь корни."
  },
  CLASSIC: {
    name: "Иж-49 (Легендарная Классика)",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a289f?auto=format&fit=crop&q=80&w=800",
    description: "Строгий, изысканный и нестареющий. Ты ценишь историю, спокойствие и проверенную временем надежность."
  }
};

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [nickname, setNickname] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleStart = () => {
    setScreen('nickname');
  };

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      setScreen('quiz');
    }
  };

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers, QUESTIONS[currentQuestion].options[selectedOption]];
      setAnswers(newAnswers);
      
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setScreen('result');
      }
    }
  };

  const computeResult = () => {
    const q1 = answers[0]; // Бездорожье / Шоссе
    const q2 = answers[1]; // Яркий незабываемый / Строгий, но изысканный
    const q3 = answers[2]; // Любишь гулять один / Всегда в компании
    const q4 = answers[3]; // Контроль и комфорт / Адреналин
    const q5 = answers[4]; // Все новое и современное / Только классика

    if (q3 === "Всегда в компании" && q4 === "Контроль и комфорт") {
      return MOTORCYCLES.SIDECAR;
    } else if (q1 === "Бездорожье" && q4 === "Адреналин") {
      return MOTORCYCLES.ENDURO;
    } else if (q2 === "Яркий незабываемый" && q4 === "Адреналин") {
      return MOTORCYCLES.SPORT;
    } else if (q5 === "Все новое и современное") {
      return MOTORCYCLES.MODERN;
    } else {
      return MOTORCYCLES.CLASSIC;
    }
  };

  const renderWelcome = () => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen relative p-6 text-center"
    >
      <img 
        src="https://images.unsplash.com/photo-1558981033-0f0309284409?auto=format&fit=crop&q=80&w=2000"
        alt="Черный мотоцикл крупным планом"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60 pointer-events-none" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/30 pointer-events-none" />
      
      <div className="relative z-10 max-w-md w-full flex flex-col items-center drop-shadow-xl">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight drop-shadow-md">
          Ижевский<br/><span className="text-[#f45540] drop-shadow-md">Мотомузей</span>
        </h1>
        <p className="text-lg text-zinc-100 mb-10 font-medium drop-shadow-md">
          Пройди тест «Какой ты мотоцикл?» и получи скидку 10% на посещение нашего музея.
        </p>

        <button 
          onClick={handleStart}
          className="group relative w-full flex justify-center items-center gap-3 bg-[#f45540] hover:bg-[#d94a36] text-white py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 shadow-[0_0_20px_rgba(244,85,64,0.3)] hover:shadow-[0_0_30px_rgba(244,85,64,0.5)] transform hover:-translate-y-1"
        >
          Начать тест
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );

  const renderNickname = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col justify-center min-h-screen p-6 max-w-md mx-auto"
    >
      <div className="mb-8">
        <span className="text-[#f45540] font-bold tracking-widest uppercase text-sm mb-2 block">Шаг 1 из 2</span>
        <h2 className="text-3xl font-bold text-white mb-3">Давай знакомиться</h2>
        <p className="text-zinc-400">Перед тем как продолжить, придумай себе никнейм.</p>
      </div>

      <form onSubmit={handleNicknameSubmit} className="space-y-6">
        <div>
          <input 
            type="text" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Твой никнейм..."
            className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-[#f45540] rounded-xl px-5 py-4 text-white text-lg transition-colors outline-none placeholder:text-zinc-600"
            required
            maxLength={30}
          />
        </div>
        <button 
          type="submit"
          disabled={!nickname.trim()}
          className="w-full flex justify-between items-center bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform"
        >
          Продолжить
          <ChevronRight className="w-6 h-6" />
        </button>
      </form>
    </motion.div>
  );

  const renderQuiz = () => {
    const question = QUESTIONS[currentQuestion];
    
    return (
      <motion.div 
        key="quiz"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex flex-col min-h-[100dvh] px-6 py-10 max-w-lg mx-auto w-full"
      >
        <div className="flex justify-center items-center gap-3 mb-10 w-full pt-4">
          {QUESTIONS.map((q, idx) => {
            const isCompleted = idx < currentQuestion;
            const isActive = idx === currentQuestion;
            
            return (
              <div key={q.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  isCompleted ? 'bg-[#f45540] border-[#f45540] text-white' : 
                  isActive ? 'border-[#f45540] text-[#f45540] ring-4 ring-[#f45540]/20' : 
                  'border-zinc-800 text-zinc-600'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : q.id}
                </div>
                {idx < QUESTIONS.length - 1 && (
                  <div className={`w-4 sm:w-8 h-1 mx-1 rounded-full transition-colors duration-300 ${
                    isCompleted ? 'bg-[#f45540]' : 'bg-zinc-800'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-3xl font-bold text-white mb-8 leading-tight">
              {question.question}
            </h2>

            <div className="space-y-4 mb-8">
              {question.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden ${
                      isSelected 
                        ? 'border-[#f45540] bg-[#f45540]/10' 
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-center">
                      <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {option}
                      </span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#f45540] bg-[#f45540]' : 'border-zinc-600'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pb-4">
              <button 
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className={`w-full py-5 px-6 rounded-xl font-bold text-lg flex justify-center items-center gap-3 transition-all duration-300 ${
                  selectedOption !== null 
                    ? 'bg-[#f45540] hover:bg-[#d94a36] text-white shadow-[0_4px_20px_rgba(244,85,64,0.4)] translate-y-0 opacity-100' 
                    : 'bg-zinc-800 text-zinc-500 translate-y-2 opacity-50 cursor-not-allowed'
                }`}
              >
                {currentQuestion === QUESTIONS.length - 1 ? 'Узнать результат' : 'Дальше'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderResult = () => {
    const resultItem = computeResult();
    
    return (
      <motion.div 
        key="result"
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="min-h-screen bg-zinc-950 pb-12"
      >
        <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
          <img 
            src={resultItem.image} 
            alt={resultItem.name} 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 max-w-2xl mx-auto w-full">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-3">
              Твой результат, {nickname}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
              {resultItem.name}
            </h2>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full px-6 -mt-4 relative z-20 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              {resultItem.description}
            </p>
            <div className="h-px w-full bg-zinc-800 mb-6" />
            
            <div className="bg-gradient-to-br from-[#f45540] to-red-600 rounded-2xl p-6 relative overflow-hidden text-white shadow-lg">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-2xl" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-white/20 p-3 rounded-full shrink-0">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Скидка 10%</h3>
                  <p className="text-white/90 text-sm leading-snug">
                    Покажи этот экран на кассе и получи скидку на посещение Ижевского мотомузея Кожушковых!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#f45540]" />
              О мотомузее
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
              Ижевский мотомузей Кожушковых — это уникальная частная коллекция отечественных и зарубежных мотоциклов. У нас ты погрузишься в историю мотостроения, увидишь редкие модели в идеальном состоянии и почувствуешь настоящую байкерскую атмосферу. Мы регулярно проводим экскурсии и мероприятия!
            </p>
            
            <div className="space-y-3">
              <a href="https://motomuseum.su" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="font-medium text-zinc-100">Официальный сайт</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
              <a href="https://vk.com/motomuseum_izh" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-zinc-800 hover:bg-[#0077FF]/20 border border-transparent hover:border-[#0077FF]/30 rounded-xl transition-all group">
                 <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-zinc-400 group-hover:text-[#0077FF] transition-colors" />
                  <span className="font-medium text-zinc-100">Мы ВКонтакте</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[#0077FF] transition-colors" />
              </a>
              <a href="https://t.me/motomuseum" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-zinc-800 hover:bg-[#229ED9]/20 border border-transparent hover:border-[#229ED9]/30 rounded-xl transition-all group">
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-zinc-400 group-hover:text-[#229ED9] transition-colors" />
                  <span className="font-medium text-zinc-100">Наш Telegram</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[#229ED9] transition-colors" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Мой мото-характер',
                    text: `Я прошел тест от Ижевского мотомузея и оказался: ${resultItem.name}! Пройди и ты, чтобы получить скидку 10%.`,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  alert('Ссылка скопирована в буфер обмена!');
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center justify-center gap-2 w-full py-4 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-bold transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Поделиться
            </button>
            <button 
              onClick={() => {
                setScreen('welcome');
                setAnswers([]);
                setCurrentQuestion(0);
                setSelectedOption(null);
                setNickname('');
              }}
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-zinc-800 hover:border-zinc-600 text-white rounded-xl font-bold transition-colors"
            >
              Пройти заново
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-[#f45540] selection:text-white">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && <motion.div key="welcome" className="relative">{renderWelcome()}</motion.div>}
        {screen === 'nickname' && <motion.div key="nickname" className="relative">{renderNickname()}</motion.div>}
        {screen === 'quiz' && <motion.div key="quiz" className="relative">{renderQuiz()}</motion.div>}
        {screen === 'result' && <motion.div key="result" className="relative">{renderResult()}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
