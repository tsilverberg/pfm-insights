import React, { useState, useRef, useEffect } from 'react';
import { IonModal } from '@ionic/react';
import CoachIcon from './CoachIcon';
import { getCoachGreeting, conversationStarters, getCannedResponse, coachNudges } from '../../data/coachData';
import type { ConversationStarter } from '../../data/coachData';
import './CoachSheet.css';

interface CoachSheetProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string; // current route path
}

interface Message {
  id: number;
  text: string;
  sender: 'coach' | 'user';
  quickReplies?: string[];
}

function getTabFromPath(path: string): string {
  if (path.startsWith('/home') || path === '/') return 'home';
  if (path.startsWith('/insights')) return 'spend';
  if (path.startsWith('/invest')) return 'plan';
  if (path.startsWith('/explore')) return 'more';
  if (path.includes('health') || path.includes('pillar')) return 'plan';
  if (path.includes('category') || path.includes('nwg')) return 'spend';
  return 'home';
}

function getContextStarters(path: string): ConversationStarter[] {
  const tab = getTabFromPath(path);
  // Filter for family persona (our default user) + this tab, take 4
  const forTab = conversationStarters.filter(s => s.tab === tab && s.personaId === 'family');
  if (forTab.length >= 4) return forTab.slice(0, 4);
  // Fill with young-adult starters for the same tab
  const fallback = conversationStarters.filter(s => s.tab === tab && s.personaId === 'young-adult');
  return [...forTab, ...fallback].slice(0, 4);
}

function getContextNudge(path: string): { title: string; body: string; quickReplies?: string[] } | null {
  const tab = getTabFromPath(path);
  const nudge = coachNudges.find(n => n.tab === tab || n.tab === 'all');
  if (!nudge) return null;
  return { title: nudge.title, body: nudge.body, quickReplies: nudge.quickReplies };
}

const CoachSheet: React.FC<CoachSheetProps> = ({ isOpen, onClose, context = '/home' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [starters, setStarters] = useState<ConversationStarter[]>([]);
  const [showStarters, setShowStarters] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  // Reset conversation when opened with new context
  useEffect(() => {
    if (isOpen) {
      const nudge = getContextNudge(context);
      const initialMessages: Message[] = [];

      if (nudge) {
        initialMessages.push({
          id: nextIdRef.current++,
          text: `**${nudge.title}**\n\n${nudge.body}`,
          sender: 'coach',
          quickReplies: nudge.quickReplies,
        });
      }

      setMessages(initialMessages);
      setStarters(getContextStarters(context));
      setShowStarters(true);
    }
  }, [isOpen, context]);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addCoachResponse = (userText: string) => {
    setTimeout(() => {
      const response = getCannedResponse('family', userText);
      const newStarters = getContextStarters(context);
      setMessages(prev => [
        ...prev,
        {
          id: nextIdRef.current++,
          text: response,
          sender: 'coach',
          quickReplies: newStarters.slice(0, 3).map(s => s.text),
        },
      ]);
    }, 600);
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: nextIdRef.current++, text, sender: 'user' }]);
    setInputText('');
    setShowStarters(false);
    addCoachResponse(text);
  };

  const handleStarter = (starter: ConversationStarter | string) => {
    const text = typeof starter === 'string' ? starter : starter.text;
    setMessages(prev => [...prev, { id: nextIdRef.current++, text, sender: 'user' }]);
    setShowStarters(false);
    addCoachResponse(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const greeting = getCoachGreeting('family');

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="coach-sheet"
      initialBreakpoint={0.75}
      breakpoints={[0, 0.5, 0.75, 1]}
      handle={true}
    >
      <div className="coach-sheet__inner">
        <div className="coach-sheet__header">
          <div className="coach-sheet__header-left">
            <CoachIcon size={28} color="var(--pfm-action-primary-bg)" />
            <span className="coach-sheet__title">Financial Coach</span>
          </div>
          <button className="coach-sheet__close" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="var(--pfm-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="coach-sheet__greeting">{greeting}</div>

        {/* Conversation starters */}
        {showStarters && starters.length > 0 && (
          <div className="coach-sheet__starters">
            {starters.map(s => (
              <button key={s.id} className="coach-sheet__starter-pill" onClick={() => handleStarter(s)}>
                {s.text}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="coach-sheet__messages">
          {messages.map(msg => (
            <div key={msg.id} className={`coach-sheet__message coach-sheet__message--${msg.sender}`}>
              {msg.sender === 'coach' && (
                <div className="coach-sheet__avatar">
                  <CoachIcon size={18} color="var(--pfm-action-primary-bg)" />
                </div>
              )}
              <div className={`coach-sheet__bubble coach-sheet__bubble--${msg.sender}`}>
                {msg.text.split('\n').map((line, i) => {
                  // Simple bold markdown
                  const parts = line.split(/\*\*(.*?)\*\*/g);
                  return (
                    <span key={i}>
                      {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          {/* Quick replies after coach messages */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'coach' && messages[messages.length - 1].quickReplies && (
            <div className="coach-sheet__quick-replies">
              {messages[messages.length - 1].quickReplies!.map(reply => (
                <button key={reply} className="coach-sheet__reply-pill" onClick={() => handleStarter(reply)}>
                  {reply}
                </button>
              ))}
            </div>
          )}
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
          <button className="coach-sheet__send" onClick={handleSend} disabled={!inputText.trim()} aria-label="Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default CoachSheet;
