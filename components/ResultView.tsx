import React from 'react';
import { PersonalityReport, Tone } from '../types';
import { Card, Button, FadeIn } from './UI';
import { RotateCcw, Download, Briefcase, Zap, AlertTriangle, User } from 'lucide-react';

interface ResultViewProps {
  report: PersonalityReport;
  tone: Tone;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ report, tone, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 w-full pb-20">
      
      {/* Header Section */}
      <FadeIn>
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
            Analysis Complete • {tone} Mode
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-600">
            {report.title}
          </h1>
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-2xl relative overflow-hidden">
             {/* Decorative blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            
            <p className="text-lg md:text-xl leading-relaxed font-light opacity-90 relative z-10 italic">
              "{report.summary}"
            </p>
          </Card>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Strengths */}
        <FadeIn delay={200}>
          <Card className="p-6 h-full border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Superpowers</h3>
            </div>
            <ul className="space-y-3">
              {report.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>

        {/* Weaknesses */}
        <FadeIn delay={400}>
          <Card className="p-6 h-full border-t-4 border-t-amber-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Kryptonite</h3>
            </div>
             <ul className="space-y-3">
              {report.weaknesses.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                   <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>

      {/* Careers & Character */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         {/* Careers */}
        <div className="md:col-span-2">
           <FadeIn delay={600}>
            <Card className="p-6 h-full bg-indigo-50 border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-200 text-indigo-700 rounded-lg">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Career Matches</h3>
              </div>
              <div className="grid gap-3">
                {report.careerSuggestions.map((career, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg shadow-sm font-medium text-slate-700 flex items-center">
                    <span className="text-indigo-400 font-bold mr-3">0{i+1}.</span>
                    {career}
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Character Match - Now with Image Support */}
        <div className="md:col-span-1">
           <FadeIn delay={800}>
            <Card className="relative h-full min-h-[300px] flex flex-col items-center justify-center text-center bg-slate-900 text-white border-slate-800 overflow-hidden group">
              {report.imageUrl ? (
                <>
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={report.imageUrl} 
                      alt={report.fictionalCharacter} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                  </div>
                  <div className="relative z-10 w-full p-6 mt-auto">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-200 mb-1 drop-shadow-md">Spirit Character</h3>
                    <p className="text-2xl font-bold text-white drop-shadow-lg">
                      {report.fictionalCharacter}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-6 flex flex-col items-center">
                  <div className="p-3 bg-slate-800 rounded-full mb-4">
                    <User size={32} className="text-brand-400" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Spirit Character</h3>
                  <p className="text-2xl font-bold text-brand-300">
                    {report.fictionalCharacter}
                  </p>
                </div>
              )}
            </Card>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={1000}>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={onReset} size="lg" variant="secondary">
            <RotateCcw className="mr-2 w-5 h-5" /> Analyze Another
          </Button>
          <Button onClick={() => window.print()} size="lg" variant="outline">
            <Download className="mr-2 w-5 h-5" /> Save Report
          </Button>
        </div>
      </FadeIn>

    </div>
  );
};