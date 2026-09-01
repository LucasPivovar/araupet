import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Send,
  X,
  Volume2,
  SwitchCamera
} from 'lucide-react';
import { TopBar } from '../components/TopBar';

interface TelemedicineScreenProps {
  onBack: () => void;
}

export const TelemedicineScreen: React.FC<TelemedicineScreenProps> = ({ onBack }) => {
  const [seconds, setSeconds] = useState(492); // 08:12
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'doctor', text: 'Olá Juliana! Me conte o que você está observando na Mel hoje.' },
    { sender: 'user', text: 'Ela está um pouco desanimada e vomitou pela manhã.' },
    { sender: 'doctor', text: 'Certo, vamos examinar. Pode aproximar a câmera da gengiva dela, por favor?' },
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Entendido! Estou registrando no prontuário e enviando a receita para o seu aplicativo.',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden h-full">
      {/* Top Bar on Video */}
      <TopBar
        title="Veterinário 24h"
        onBack={onBack}
        showBack={true}
        transparent={true}
        darkIcons={false}
        rightAction={
          <div className="w-6 h-6 rounded-full bg-[#008779] text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
        }
      />

      {/* Main Video Stream Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col justify-between">
        {/* Doctor Stream Video Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&auto=format&fit=crop&q=80"
            alt="Dra. Paola - Médica Veterinária CCZ Araucária"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        {/* Top Status & Call Info */}
        <div className="relative z-10 pt-2 flex flex-col items-center gap-1.5">
          <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Consulta em andamento • {formatTimer(seconds)}</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white/90 text-[11px] font-normal">
            Dra. Paola Silveira • CRMV-PR 14.821
          </div>
        </div>

        {/* Picture-in-Picture (Tutor + Pet) Top Right */}
        <div className="absolute top-16 right-4 z-20 w-26 h-36 rounded-2xl overflow-hidden border-2 border-white/90 shadow-2xl bg-slate-900">
          {isVideoOn ? (
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
              alt="Juliana Lima"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-2 text-center">
              <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
              <span className="text-[9px] font-normal">Câmera desligada</span>
            </div>
          )}

          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 text-[9px] text-white font-medium backdrop-blur-xs flex items-center gap-1">
            {!isMicOn && <MicOff className="w-2.5 h-2.5 text-rose-400" />}
            <span>Você</span>
          </div>
        </div>

        {/* Bottom Call Action Controls */}
        <div className="relative z-20 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-6 pb-6 px-6 flex items-center justify-around">
          {/* Câmera */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-all"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoOn ? 'bg-white/20 hover:bg-white/30 backdrop-blur-md' : 'bg-rose-500 shadow-md shadow-rose-500/40'
            }`}>
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </div>
            <span className="text-[10px] text-white/80 font-normal">Câmera</span>
          </button>

          {/* Microfone */}
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-all"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMicOn ? 'bg-white/20 hover:bg-white/30 backdrop-blur-md' : 'bg-rose-500 shadow-md shadow-rose-500/40'
            }`}>
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </div>
            <span className="text-[10px] text-white/80 font-normal">Microfone</span>
          </button>

          {/* Encerrar (Red Button) */}
          <button
            onClick={onBack}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-600/50 flex items-center justify-center">
              <PhoneOff className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-[10px] text-rose-300 font-medium">Encerrar</span>
          </button>

          {/* Chat */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-all relative"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-white/80 font-normal">Chat</span>
            <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-[#008779] rounded-full ring-2 ring-slate-950" />
          </button>
        </div>
      </div>

      {/* Live Text Chat Drawer */}
      {isChatOpen && (
        <div className="absolute inset-x-0 bottom-0 top-16 z-40 bg-white rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-200">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e6f7f5] text-[#008779] flex items-center justify-center text-xs">
                🩺
              </div>
              <div>
                <h4 className="text-xs font-medium text-slate-800">Chat da Consulta</h4>
                <p className="text-[10px] text-emerald-600 font-normal">Dra. Paola Silveira • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#008779] text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem para a veterinária..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#008779]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#008779] text-white hover:bg-[#006e63] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
