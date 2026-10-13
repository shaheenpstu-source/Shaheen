import React from 'react';
import { Bookmark, Heart, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ContentItem } from '../types/content';

interface ArticleCardProps {
  article: ContentItem;
  isBookmarked: boolean;
  onOpen: (article: ContentItem) => void;
  onToggleBookmark: (id: string) => void;
  onLike: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onOpen,
  onToggleBookmark,
  onLike,
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-stone-400/80 transition-all duration-300 hover:shadow-md flex flex-col md:flex-row">
      
      {/* Cover Image container (if present) */}
      {article.coverImage && (
        <div 
          onClick={() => onOpen(article)}
          className="md:w-5/12 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100 cursor-pointer shrink-0"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
        </div>
      )}

      {/* Content Body */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-sans">
            <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              {article.category}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-mono tabular-nums">{article.readTime}</span>
          </div>

          {/* Primary Title with text-wrap: balance */}
          <h2
            onClick={() => onOpen(article)}
            className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer leading-snug [text-wrap:balance]"
          >
            {article.title}
          </h2>

          {/* Subtitle / Excerpt */}
          <p className="text-sm text-stone-600 leading-relaxed font-sans line-clamp-3">
            {article.subtitle || article.summary}
          </p>

          {/* Tags list as clean subtle unboxed text */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-stone-400">
            {article.tags.map((tag, idx) => (
              <span key={tag} className="hover:text-stone-700 transition-colors">
                #{tag}{idx < article.tags.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Interactive Functional Affordances */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          
          <button
            onClick={() => onOpen(article)}
            className="flex items-center gap-1 text-stone-900 font-medium hover:text-amber-800 transition-colors cursor-pointer group-hover:underline underline-offset-4"
          >
            <span>Read Full Article</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-4">
            {/* Comments Counter */}
            <button
              onClick={() => onOpen(article)}
              aria-label="View responses"
              className="flex items-center gap-1 hover:text-stone-900 transition-colors cursor-pointer"
              title="Responses"
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-mono tabular-nums">{article.comments.length}</span>
            </button>

            {/* Like Counter */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(article.id);
              }}
              aria-label="Like article"
              className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
              title="Applaud essay"
            >
              <Heart className="w-3.5 h-3.5 text-stone-400 hover:text-rose-600 transition-colors" />
              <span className="font-mono tabular-nums">{article.likes}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              aria-label="Save to bookmarks"
              className={`p-1 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
                isBookmarked ? 'text-amber-800' : 'text-stone-400 hover:text-stone-900'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark to read later'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>

      </div>

    </article>
  );
};
