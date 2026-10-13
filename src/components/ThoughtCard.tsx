import React, { useState } from 'react';
import { Bookmark, Heart, Copy, Check, Quote } from 'lucide-react';
import { ContentItem } from '../types/content';

interface ThoughtCardProps {
  thought: ContentItem;
  isBookmarked: boolean;
  onOpen: (thought: ContentItem) => void;
  onToggleBookmark: (id: string) => void;
  onLike: (id: string) => void;
}

export const ThoughtCard: React.FC<ThoughtCardProps> = ({
  thought,
  isBookmarked,
  onOpen,
  onToggleBookmark,
  onLike,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${thought.content.trim()}" — Shaheen`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => onOpen(thought)}
      className="group relative bg-[#FAF7F2] rounded-2xl border border-stone-200/90 p-6 sm:p-7 hover:border-stone-400/80 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header Metadata: Zero-Pill Unboxed */}
        <div className="flex items-center justify-between text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-amber-900/80">Thought</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{thought.publishedAt}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-600">{thought.category}</span>
          </div>

          <Quote className="w-4 h-4 text-stone-300 group-hover:text-amber-800/40 transition-colors shrink-0" />
        </div>

        {/* The Thought Prose */}
        <blockquote className="text-base sm:text-lg font-serif italic text-stone-900 leading-relaxed [text-wrap:balance]">
          "{thought.content.replace(/^##.*?\n+/g, '').trim()}"
        </blockquote>

        {/* Tags */}
        {thought.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-400">
            {thought.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Footer controls */}
      <div className="mt-6 pt-3 border-t border-stone-200/50 flex items-center justify-between text-xs text-stone-500">
        
        {/* Copy quotation quote */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          title="Copy thought quotation"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy thought</span>
            </>
          )}
        </button>

        {/* Like & Bookmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(thought.id);
            }}
            aria-label="Like thought"
            className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
            title="Applaud thought"
          >
            <Heart className="w-3.5 h-3.5 text-stone-400 hover:text-rose-600 transition-colors" />
            <span className="font-mono tabular-nums">{thought.likes}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(thought.id);
            }}
            aria-label="Bookmark thought"
            className={`p-1 rounded hover:bg-stone-200/60 transition-colors cursor-pointer ${
              isBookmarked ? 'text-amber-800' : 'text-stone-400 hover:text-stone-900'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

      </div>

    </div>
  );
};
