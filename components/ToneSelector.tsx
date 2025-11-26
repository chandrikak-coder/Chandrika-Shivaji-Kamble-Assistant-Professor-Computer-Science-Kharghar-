import React from 'react';
import { Tone } from '../types';
import { TONE_DESCRIPTIONS } from '../constants';
import { Card, FadeIn } from './UI';

interface ToneSelectorProps {
  onSelect: (tone: Tone) => void;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({ onSelect }) => {
  const tones = [
    { type: Tone.FORMAL, emoji: "🧠", color: "bg-blue-50 border-blue-200" },
    { type: Tone.SARCASTIC, emoji: "🌶️", color: "bg-red-50 border-red-200" },
    { type: Tone.POETIC, emoji: "🔮", color: "bg-purple-50 border-purple-200" },
    { type: Tone.GEN_Z, emoji: "🤳", color: "bg-pink-50 border-pink-200" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <FadeIn>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Pick Your Analyst</h2>
          <p className="text-slate-500 text-lg">Who should deliver your diagnosis?</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tones.map((t) => (
            <button
              key={t.type}
              onClick={() => onSelect(t.type)}
              className="text-left group relative focus:outline-none"
            >
              <Card className={`p-6 h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${t.color} hover:border-current`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300 block">{t.emoji}</span>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100">Select</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t.type}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {TONE_DESCRIPTIONS[t.type]}
                </p>
              </Card>
            </button>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
