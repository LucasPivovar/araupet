import React, { useState } from 'react';
import { X, Check, Copy, MapPin, Phone, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Partner } from '../../types';

interface CouponModalProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  partner,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !partner) return null;

  const couponCode = `ARAUPET-${partner.name.split(' ')[0].toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(couponCode);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Real photo header */}
        <div className="relative h-32 w-full bg-slate-900 overflow-hidden">
          <img
            src={partner.image}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-xs"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-800 flex items-center justify-center text-lg shadow-md shrink-0">
                {partner.logo}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{partner.name}</h3>
                <p className="text-[11px] text-teal-200 font-normal">{partner.categoryLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{partner.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Discount Badge */}
          <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 text-center space-y-0.5">
            <span className="text-xl font-semibold text-[#008779]">{partner.discount}</span>
            <p className="text-xs font-medium text-slate-700">
              Válido para {partner.discountTarget}
            </p>
            <p className="text-[10px] text-slate-400 font-normal">Exclusivo para moradores cadastrados no ArauPet</p>
          </div>

          {/* Coupon Box */}
          <div>
            <label className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Código do Cupom de Desconto
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/30">
              <span className="font-mono text-xs font-medium text-[#008779] tracking-wider">
                {couponCode}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-[#008779] text-white text-xs font-medium flex items-center gap-1.5 active:scale-95 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-medium text-slate-700 mb-1.5">Benefícios Inclusos</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
              {partner.benefits.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008779] shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Contact */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500 font-normal">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#008779] shrink-0" />
              <span className="truncate">{partner.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#008779] shrink-0" />
              <span>{partner.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
