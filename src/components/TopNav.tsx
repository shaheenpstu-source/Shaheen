import React from 'react';
import { PenTool, Bookmark, Search, User } from 'lucide-react';
import { ContentType } from '../types/content';

interface TopNavProps {
  activeTab: ContentType | 'all' | 'bookmarks';
  onSelectTab: (tab: ContentType | 'all' | 'bookmarks') => void;
  onOpenWritingStudio: () => void;
  onOpenAbout: () => void;
  onOpenCV: () => void;
  bookmarksCount: number;
  onOpenSearch: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenWritingStudio,
  onOpenAbout,
  onOpenCV,
  bookmarksCount,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark (Top Bar Contract) */}
        <button
          onClick={() => onSelectTab('all')}
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Md. Shaheen Hossain<span className="text-amber-800 font-sans">.</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('all')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'all'
                ? 'text-stone-950 border-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            All Works
          </button>
          <button
            onClick={() => onSelectTab('article')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'article'
                ? 'text-stone-950 border-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => onSelectTab('blog')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'blog'
                ? 'text-stone-950 border-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Field Notes
          </button>
          <button
            onClick={() => onSelectTab('thought')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'thought'
                ? 'text-stone-950 border-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Thoughts
          </button>
          <button
            onClick={onOpenCV}
            className="whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 border-transparent text-amber-900 font-semibold hover:border-amber-800"
          >
            Curriculum Vitae
          </button>
          <button
            onClick={onOpenAbout}
            className="whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:text-stone-900 hover:border-stone-400"
          >
            About
          </button>
        </nav>

        {/* Zone 3: Actions & 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            aria-label="Search writings"
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
            title="Search writings"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => onSelectTab(activeTab === 'bookmarks' ? 'all' : 'bookmarks')}
            aria-label="View saved bookmarks"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'bookmarks'
                ? 'bg-amber-100 text-amber-900'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
            title="Saved reading list"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved</span>
            <span className="text-[11px] font-mono font-semibold tabular-nums text-stone-500">
              ({bookmarksCount})
            </span>
          </button>

          {/* Mobile About Button */}
          <button
            onClick={onOpenAbout}
            aria-label="Author profile"
            className="md:hidden p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>

          {/* 1 Primary Action (Top Bar Contract) */}
          <button
            onClick={onOpenWritingStudio}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Write & Publish</span>
          </button>
        </div>

      </div>
    </header>
  );
};
