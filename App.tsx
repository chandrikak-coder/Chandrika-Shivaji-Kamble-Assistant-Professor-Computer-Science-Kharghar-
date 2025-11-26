import React, { useState, useEffect } from 'react';
import { Answer, PersonalityReport, Tone } from './types';
import { generatePersonalityReport } from './services/geminiService';
import { Quiz } from './components/Quiz';
import { ToneSelector } from './components/ToneSelector';
import { ResultView } from './components/ResultView';
import { Auth } from './components/Auth';
import { Button, FadeIn } from './components/UI';
import { BrainCircuit, Loader2, LogOut } from 'lucide-react';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

enum AppState {
  INTRO = 'INTRO',
  QUIZ = 'QUIZ',
  TONE_SELECT = 'TONE_SELECT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedTone, setSelectedTone] = useState<Tone | null>(null);
  const [report, setReport] = useState<PersonalityReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStart = () => {
    setState(AppState.QUIZ);
  };

  const handleQuizComplete = (collectedAnswers: Answer[]) => {
    setAnswers(collectedAnswers);
    setState(AppState.TONE_SELECT);
  };

  const handleToneSelect = async (tone: Tone) => {
    setSelectedTone(tone);
    setState(AppState.LOADING);
    
    try {
      const result = await generatePersonalityReport(answers, tone);
      setReport(result);
      setState(AppState.RESULT);
    } catch (err) {
      setErrorMsg("Our AI psychologist is currently overwhelmed. Please try again.");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setReport(null);
    setSelectedTone(null);
    setState(AppState.INTRO);
  };

  const handleLogout = () => {
    signOut(auth);
    handleReset();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-brand-500 w-10 h-10" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 text-brand-700">
          <BrainCircuit size={32} />
          <span className="text-xl font-bold tracking-tight">PsycheScan AI</span>
        </div>
        <button 
          onClick={handleLogout}
          className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        
        {state === AppState.INTRO && (
          <FadeIn>
            <div className="text-center max-w-4xl px-4 flex flex-col items-center">
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Unlock Your <span className="text-brand-600">Hidden</span> Self
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                A 5-question deep dive into your psyche. Powered by Gemini AI. 
                Choose your narrator: from clinical professional to sarcastic roaster.
              </p>
              <Button onClick={handleStart} size="lg" className="rounded-full px-10 text-lg shadow-brand-500/40 shadow-xl mb-16">
                Start Analysis
              </Button>
              
              {/* Character Showcase */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                
                {/* Image 1: Mickey */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png"
                      alt="Classic Personality"
                      className="w-32 h-32 md:w-44 md:h-44 rounded-2xl shadow-xl border-4 border-white bg-white p-3 object-contain transform transition-transform duration-500 hover:scale-110 hover:-rotate-6"
                  />
                </div>

                {/* Image 2: Robot */}
                <div className="relative group mt-4 md:mt-0">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=SarcasticBot"
                      alt="Analytical Personality"
                      className="w-32 h-32 md:w-44 md:h-44 rounded-2xl shadow-xl border-4 border-white bg-white p-2 object-contain transform transition-transform duration-500 hover:scale-110 hover:rotate-6"
                  />
                </div>

                {/* Image 3: Artsy */}
                <div className="relative group md:mt-0">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=PoeticSoul&clothing=graphicShirt&top=longHair"
                      alt="Creative Personality"
                      className="w-32 h-32 md:w-44 md:h-44 rounded-2xl shadow-xl border-4 border-white bg-white p-2 object-contain transform transition-transform duration-500 hover:scale-110 hover:-rotate-3"
                  />
                </div>

              </div>

            </div>
          </FadeIn>
        )}

        {state === AppState.QUIZ && (
          <Quiz onComplete={handleQuizComplete} />
        )}

        {state === AppState.TONE_SELECT && (
          <ToneSelector onSelect={handleToneSelect} />
        )}

        {state === AppState.LOADING && (
          <FadeIn>
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-brand-500 rounded-full opacity-20 animate-ping"></div>
                <Loader2 size={64} className="text-brand-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-2">Analyzing your psyche...</h2>
              <p className="text-slate-500">Generating your personality profile and visualization.</p>
            </div>
          </FadeIn>
        )}

        {state === AppState.RESULT && report && selectedTone && (
          <ResultView report={report} tone={selectedTone} onReset={handleReset} />
        )}

        {state === AppState.ERROR && (
           <FadeIn>
             <div className="text-center max-w-md bg-red-50 p-8 rounded-2xl border border-red-100">
               <h2 className="text-xl font-bold text-red-800 mb-2">System Overload</h2>
               <p className="text-red-600 mb-6">{errorMsg}</p>
               <Button onClick={handleReset} variant="secondary">Try Again</Button>
             </div>
           </FadeIn>
        )}

      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} PsycheScan AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;