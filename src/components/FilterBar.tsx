import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { ContentType } from '../types/content';

interface FilterBarProps {
  activeType: ContentType | 'all' | 'bookmarks';
  onSelectType: (type: ContentType | 'all' | 'bookmarks') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  availableTags: string[];
  counts: {
    all: number;
    article: number;
    blog: number;
    thought: number;
    bookmarks: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeType,
  onSelectType,
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  availableTags,
  counts,
}) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Top row: Segmented Type Filter + Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Interactive Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => onSelectType('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeType === 'all'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            All Works <span className="text-stone-400 font-mono text-[11px] ml-1">({counts.all})</span>
          </button>
          
          <button
            onClick={() => onSelectType('article')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeType === 'article'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            Articles <span className="text-stone-400 font-mono text-[11px] ml-1">({counts.article})</span>
          </button>

          <button
            onClick={() => onSelectType('blog')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeType === 'blog'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            Blog <span className="text-stone-400 font-mono text-[11px] ml-1">({counts.blog})</span>
          </button>

          <button
            onClick={() => onSelectType('thought')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeType === 'thought'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            Thoughts <span className="text-stone-400 font-mono text-[11px] ml-1">({counts.thought})</span>
          </button>

          <button
            onClick={() => onSelectType('bookmarks')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeType === 'bookmarks'
                ? 'bg-amber-100/90 text-amber-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            }`}
          >
            Bookmarks <span className="text-amber-700/70 font-mono text-[11px] ml-1">({counts.bookmarks})</span>
          </button>
        </div>

        {/* Real-time Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search titles, topics, or prose..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-9 py-1.5 text-xs sm:text-sm bg-stone-100/80 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Tags Filter Strip */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-stone-400 font-serif italic shrink-0 pr-1">
            Topics:
          </span>
          <button
            onClick={() => onSelectTag(null)}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedTag === null
                ? 'bg-stone-900 text-white font-medium'
                : 'bg-stone-200/50 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            All Topics
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-200/50 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
