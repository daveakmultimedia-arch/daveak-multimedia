import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  title?: string;
  client?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  mediaItems,
  currentIndex,
  onNavigate,
  title,
  client,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < mediaItems.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, mediaItems.length, onClose, onNavigate]);

  if (!isOpen || mediaItems.length === 0) return null;

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-neutral-300 z-10">
        <div>
          {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
          {client && <p className="text-xs text-neutral-400">Client: {client}</p>}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-neutral-400">
            {currentIndex + 1} / {mediaItems.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-neutral-300 hover:text-white bg-neutral-900/80 rounded-full transition-colors border border-neutral-800"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Media Container */}
      <div className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center">
        <img
          src={currentMedia}
          alt={title || 'Project image'}
          className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
          referrerPolicy="no-referrer"
        />

        {/* Previous Button */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-neutral-900 text-white border border-neutral-800 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {currentIndex < mediaItems.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-neutral-900 text-white border border-neutral-800 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
