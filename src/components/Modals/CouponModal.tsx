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
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008779] to-[#006e63] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-2xl flex items-center justify-center">
              {partner.logo}
            </div>
            <div>
              <h3 className="font-bold text-base">{partner.name}</h3>
              <p className="text-xs text-teal-100">{partner.categoryLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Discount Badge */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <span className="text-2xl font-black text-emerald-700">{partner.discount}</span>
            <p className="text-xs font-semibold text-emerald-900">
              Válido para {partner.discountTarget}
            </p>
            <p className="text-[10px] text-slate-500">Exclusivo para moradores cadastrados no ArauPet</p>
          </div>

          {/* Coupon Box */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Código do Cupom de Desconto
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40">
              <span className="font-mono text-sm font-bold text-[#008779] tracking-wider">
                {couponCode}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-[#008779] text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-1.5">Benefícios Inclusos</h4>
            <ul className="space-y-1 text-xs text-slate-600">
              {partner.benefits.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008779]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Contact */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#008779] shrink-0" />
              <span>{partner.address} ({partner.distance})</span>
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
