import React, { useState, useRef, useEffect } from 'react';
import { IonModal } from '@ionic/react';
import CoachIcon from './CoachIcon';
import './CoachSheet.css';

interface CoachSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'coach' | 'user';
}

const QUICK_ACTIONS = [
  "How's my spending?",
  "Help me save more",
  "Review my budget",
  "Explain my score",
];

const COACH_RESPONSES: Record<string, string> = {
  "How's my spending?":
    "This month you've spent €1,240 so far, which is 8% less than the same point last month. Your biggest category is Groceries at €380. Want me to break it down further?",
  "Help me save more":
    "Based on your patterns, I see two opportunities: you could save around €45/month by reducing dining out frequency, and setting up an automatic transfer of €100 on payday could build your emergency fund faster. Shall I help set that up?",
  "Review my budget":
    "Your budget is 62% used with 16 days left in the month. You're on track in most categories, but Entertainment is at 85% already. I'd suggest holding off on subscriptions until next month. Want a detailed category view?",
  "Explain my score":
    "Your financial health score is 74 out of 100. Here's how it breaks down: Spending Control is 78 (up 3 pts), Savings Rate is 65, and Income Stability is 82. Your biggest opportunity is improving your savings rate. Want tips on that?",
};

const DEFAULT_RESPONSE =
  "That's a great question. Let me look into your financial data and get back to you with a detailed answer. Is there anything specific you'd like me to focus on?";

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Your financial health is looking good at 74 points. Your spending control has improved by 3 points this month. Would you like to explore ways to boost your savings rate?",
  sender: 'coach',
};

const CoachSheet: React.FC<CoachSheetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(2);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addCoachResponse = (responseText: string) => {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: nextIdRef.current++,
          text: responseText,
          sender: 'coach',
        },
      ]);
    }, 500);
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;

    const userMessage: Message = {
      id: nextIdRef.current++,
      text,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    addCoachResponse(COACH_RESPONSES[text] || DEFAULT_RESPONSE);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: nextIdRef.current++,
      text: action,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);

    addCoachResponse(COACH_RESPONSES[action] || DEFAULT_RESPONSE);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="coach-sheet"
      initialBreakpoint={0.75}
      breakpoints={[0, 0.5, 0.75, 1]}
    >
      <div className="coach-sheet__inner">
        <div className="coach-sheet__header">
          <div className="coach-sheet__header-left">
            <CoachIcon size={28} color="var(--pfm-action-primary-bg)" />
            <span className="coach-sheet__title">Financial Coach</span>
          </div>
          <button className="coach-sheet__close" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="var(--pfm-text-tertiary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="coach-sheet__greeting">
          Hi Thomas, how can I help you today?
        </div>

        <div className="coach-sheet__quick-actions">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action}
              className="coach-sheet__pill"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="coach-sheet__messages">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`coach-sheet__message coach-sheet__message--${msg.sender}`}
            >
              {msg.sender === 'coach' && (
                <div className="coach-sheet__avatar">
                  <CoachIcon size={18} color="var(--pfm-action-primary-bg)" />
                </div>
              )}
              <div className={`coach-sheet__bubble coach-sheet__bubble--${msg.sender}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="coach-sheet__input-area">
          <input
            type="text"
            className="coach-sheet__input"
            placeholder="Ask your coach..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="coach-sheet__send"
            onClick={handleSend}
            disabled={!inputText.trim()}
            aria-label="Send"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default CoachSheet;
