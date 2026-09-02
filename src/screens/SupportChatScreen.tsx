import React, { useState } from 'react';
import { Headphones, Send, Paperclip, Smile, CheckCheck } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { CURRENT_USER } from '../data/mockData';

interface SupportChatScreenProps {
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

export const SupportChatScreen: React.FC<SupportChatScreenProps> = ({ onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'support',
      text: 'Olá, Juliana! Sou a Ana do suporte ArauPet. Como posso ajudar hoje?',
      time: '09:41',
    },
    {
      id: 'hint',
      sender: 'support',
      text: 'Você pode falar sobre cadastro de pet, carteira digital, agendamentos ou cupons.',
      time: '09:41',
    },
  ]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmedMessage,
        time: 'Agora',
      },
      {
        id: `support-${Date.now()}`,
        sender: 'support',
        text: 'Recebi sua mensagem. Um atendente vai acompanhar esse caso por aqui.',
        time: 'Agora',
      },
    ]);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-hidden">
      <TopBar
        title="Suporte"
        onBack={onBack}
        showBack={true}
        darkIcons={true}
      />

      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-3">
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl bg-[#008779] text-white flex items-center justify-center shadow-sm">
            <Headphones className="w-5 h-5" />
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-slate-800">Atendimento ArauPet</h2>
          <p className="text-[11px] text-emerald-600 font-medium">Online agora</p>
        </div>
        <img
          src={CURRENT_USER.avatar}
          alt={CURRENT_USER.name}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-100"
        />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3">
        <div className="mx-auto w-fit rounded-full bg-slate-200/70 px-3 py-1 text-[10px] font-medium text-slate-500">
          Hoje
        </div>

        {messages.map((chatMessage) => {
          const isUser = chatMessage.sender === 'user';

          return (
            <div
              key={chatMessage.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                  isUser
                    ? 'rounded-br-md bg-[#008779] text-white'
                    : 'rounded-bl-md bg-white border border-slate-100 text-slate-700'
                }`}
              >
                <p className="text-xs leading-relaxed">{chatMessage.text}</p>
                <div
                  className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${
                    isUser ? 'text-teal-100' : 'text-slate-400'
                  }`}
                >
                  <span>{chatMessage.time}</span>
                  {isUser && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSendMessage} className="shrink-0 bg-white border-t border-slate-100 p-3">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-2 py-2">
          <button
            type="button"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-[#008779] hover:bg-white flex items-center justify-center transition-colors"
            aria-label="Anexar arquivo"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-[#008779] hover:bg-white flex items-center justify-center transition-colors"
            aria-label="Abrir emojis"
          >
            <Smile className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#008779] text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
