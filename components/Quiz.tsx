import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { Answer, Question } from '../types';
import { Button, Input, Card, FadeIn } from './UI';

import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Answer[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [textInput, setTextInput] = useState('');

  const currentQuestion: Question = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleChoice = (optionLabel: string) => {
    saveAnswer(optionLabel);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    saveAnswer(textInput);
    setTextInput('');
  };

  const saveAnswer = (answerText: string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerText: answerText,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
          <span>Question {currentIndex + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <FadeIn key={currentQuestion.id}>
        <Card className="p-6 md:p-10 min-h-[400px] flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.type === 'choice' && currentQuestion.options?.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleChoice(opt.label)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50/50 transition-all duration-200 group flex items-center"
              >
                <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">{opt.emoji}</span>
                <span className="text-lg font-medium text-slate-700 group-hover:text-brand-700">{opt.label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-brand-500">
                  <CheckCircle2 size={24} />
                </div>
              </button>
            ))}

            {currentQuestion.type === 'text' && (
              <form onSubmit={handleTextSubmit} className="space-y-6">
                <Input 
                  autoFocus
                  placeholder={currentQuestion.placeholder}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="text-lg py-4"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!textInput.trim()} size="lg" className="w-full md:w-auto">
                    Next Question <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                </div>
              </form>
            )}
          </div>
        </Card>
      </FadeIn>
    </div>
  );
};
