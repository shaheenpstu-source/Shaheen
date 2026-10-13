import React from 'react';
import { Bookmark, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { ContentItem } from '../types/content';

interface BlogCardProps {
  post: ContentItem;
  isBookmarked: boolean;
  onOpen: (post: ContentItem) => void;
  onToggleBookmark: (id: string) => void;
  onLike: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  isBookmarked,
  onOpen,
  onToggleBookmark,
  onLike,
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 hover:border-stone-400/80 transition-all duration-300 hover:shadow-md flex flex-col justify-between">
      
      <div className="space-y-3">
        {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-sans">
          <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
            {post.category}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="font-mono tabular-nums">{post.readTime}</span>
        </div>

        {/* Blog Post Title */}
        <h3
          onClick={() => onOpen(post)}
          className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer leading-snug [text-wrap:balance]"
        >
          {post.title}
        </h3>

        {/* Subtitle / Excerpt */}
        <p className="text-sm text-stone-600 leading-relaxed font-sans line-clamp-3">
          {post.subtitle || post.summary}
        </p>

        {/* Clean unboxed tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-400">
          {post.tags.map((tag) => (
            <span key={tag} className="hover:text-stone-600 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Row */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        
        <button
          onClick={() => onOpen(post)}
          className="flex items-center gap-1.5 text-stone-900 font-medium hover:text-amber-800 transition-colors cursor-pointer group-hover:underline underline-offset-4"
        >
          <span>Read Reflection</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-3">
          {post.comments.length > 0 && (
            <span className="flex items-center gap-1 text-stone-400">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-mono tabular-nums">{post.comments.length}</span>
            </span>
          )}

          <button
            onClick={() => onLike(post.id)}
            aria-label="Like post"
            className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
            title="Applaud"
          >
            <Heart className="w-3.5 h-3.5 text-stone-400 hover:text-rose-600 transition-colors" />
            <span className="font-mono tabular-nums">{post.likes}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(post.id)}
            aria-label="Bookmark post"
            className={`p-1 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
              isBookmarked ? 'text-amber-800' : 'text-stone-400 hover:text-stone-900'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

      </div>

    </article>
  );
};
