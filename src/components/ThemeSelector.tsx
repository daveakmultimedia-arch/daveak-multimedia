import React, { useState } from 'react';
import { Palette, Check, Sparkles, Moon, Sun, Monitor } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  subtitle: string;
  canvasColor: string;
  surfaceColor: string;
  accentColor: string;
  textColor: string;
  category: 'dark' | 'light';
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    subtitle: 'Midnight black, cinematic contrast & luxury gold accents',
    canvasColor: '#080808',
    surfaceColor: '#0f0f12',
    accentColor: '#d4af37',
    textColor: '#f5f5f5',
    category: 'dark',
  },
  {
    id: 'clean-light',
    name: 'Clean Minimalist',
    subtitle: 'Architectural gallery white, slate typography & warm brass',
    canvasColor: '#f8f9fa',
    surfaceColor: '#ffffff',
    accentColor: '#b8860b',
    textColor: '#0f172a',
    category: 'light',
  },
  {
    id: 'cobalt-studio',
    name: 'Cobalt Midnight',
    subtitle: 'Deep broadcast navy, metallic frames & electric blue',
    canvasColor: '#070d18',
    surfaceColor: '#0d172a',
    accentColor: '#3b82f6',
    textColor: '#f8fafc',
    category: 'dark',
  },
  {
    id: 'warm-editorial',
    name: 'Warm Travertine',
    subtitle: 'Espresso stone, champagne honey & documentary warmth',
    canvasColor: '#12100e',
    surfaceColor: '#1c1917',
    accentColor: '#d4a373',
    textColor: '#fafaf9',
    category: 'dark',
  },
];

interface ThemeSelectorProps {
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0f0f12] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-100">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Professional Agency Themes
              </h3>
              <p className="text-xs text-neutral-400">
                Choose a visual identity theme suited for DAVEAK-MULTIMEDIA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800"
          >
            Done
          </button>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                }}
                className={`text-left p-5 rounded-2xl border transition-all duration-150 relative group ${
                  isSelected
                    ? 'border-[#d4af37] bg-neutral-900/90 shadow-lg ring-1 ring-[#d4af37]'
                    : 'border-neutral-800 bg-[#121215] hover:border-neutral-700'
                }`}
              >
                {/* Color Swatch Bar */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.canvasColor }}
                    title="Canvas"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.surfaceColor }}
                    title="Surface"
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm flex items-center justify-center font-bold text-[10px]"
                    style={{ backgroundColor: theme.accentColor, color: theme.category === 'light' ? '#fff' : '#000' }}
                    title="Accent"
                  >
                    ★
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 capitalize ml-auto">
                    {theme.category}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                    {theme.name}
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#d4af37] text-black flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {theme.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-center text-xs text-neutral-500 font-mono">
          Typography: Headings in <strong>Poppins</strong> · Body in <strong>Inter</strong>
        </div>
      </div>
    </div>
  );
};
