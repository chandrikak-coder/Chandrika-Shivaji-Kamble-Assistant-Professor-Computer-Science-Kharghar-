import { Question, Tone } from './types';

export const APP_NAME = "PsycheScan AI";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'choice',
    text: "It's Friday night. The week was brutal. What is your immediate move?",
    options: [
      { id: 'a', label: "Cancel everything, pajama mode, phone on DND.", emoji: "🛌" },
      { id: 'b', label: "Rally the troops! We are going out.", emoji: "💃" },
      { id: 'c', label: "Small dinner with 1-2 close friends to vent.", emoji: "🍷" },
      { id: 'd', label: "Work on my side project/hobby until 3am.", emoji: "💻" }
    ]
  },
  {
    id: 2,
    type: 'choice',
    text: "A waiter brings you the wrong order. What do you do?",
    options: [
      { id: 'a', label: "Eat it in silence. I don't want to be a bother.", emoji: "🤐" },
      { id: 'b', label: "Politely correct them immediately.", emoji: "☝️" },
      { id: 'c', label: "Make a scene if they don't fix it instantly.", emoji: "📢" },
      { id: 'd', label: "Convince myself I actually wanted this instead.", emoji: "😌" }
    ]
  },
  {
    id: 3,
    type: 'choice',
    text: "You are in a group project. What role do you naturally take?",
    options: [
      { id: 'a', label: "The Leader: I organize everything.", emoji: "👑" },
      { id: 'b', label: "The Creative: I have the big ideas.", emoji: "🎨" },
      { id: 'c', label: "The Ghost: I do my part then vanish.", emoji: "👻" },
      { id: 'd', label: "The Slacker: I'm just here for the grade.", emoji: "😴" }
    ]
  },
  {
    id: 4,
    type: 'text',
    text: "Describe your biggest rational (or irrational) fear in one sentence.",
    placeholder: "e.g., Being forgotten, Spiders wearing tiny hats..."
  },
  {
    id: 5,
    type: 'text',
    text: "If you could instantly master one skill without practice, what would it be and why?",
    placeholder: "e.g., Playing piano to impress people, hacking to erase debt..."
  }
];

export const TONE_DESCRIPTIONS: Record<Tone, string> = {
  [Tone.FORMAL]: "A clinical, professional analysis. Objective and clear.",
  [Tone.SARCASTIC]: "Brutally honest, slightly mean, and very funny.",
  [Tone.POETIC]: "Flowery metaphors, deep soul-gazing, and mystical vibes.",
  [Tone.GEN_Z]: "No caps, slang heavy, vibey, and chronic online energy.",
};
