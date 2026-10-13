import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Heart, 
  Share2, 
  Type, 
  Sun, 
  Moon, 
  BookOpen, 
  MessageSquare, 
  Check, 
  PenTool, 
  Copy,
  ChevronRight
} from 'lucide-react';
import { ContentItem, AuthorProfile } from '../types/content';

interface ArticleReaderProps {
  item: ContentItem;
  author: AuthorProfile;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  onLike: (id: string) => void;
  onAddComment: (itemId: string, text: string, name: string) => void;
  onEdit: (item: ContentItem) => void;
}

type ReadingTheme = 'paper' | 'white' | 'dark';
type FontStyle = 'serif' | 'sans';
type FontSize = 'normal' | 'large' | 'xlarge';

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  item,
  author,
  isBookmarked,
  onClose,
  onToggleBookmark,
  onLike,
  onAddComment,
  onEdit,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [theme, setTheme] = useState<ReadingTheme>('paper');
  const [fontStyle, setFontStyle] = useState<FontStyle>('serif');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [copiedShare, setCopiedShare] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const totalHeight = el.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(item.id, commentText, commentName);
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const copyCode = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Theme container classes
  const themeClasses = {
    paper: 'bg-[#FAF8F5] text-stone-900 border-stone-200',
    white: 'bg-white text-stone-900 border-stone-200',
    dark: 'bg-[#0F172A] text-stone-100 border-slate-800 tracking-wide',
  }[theme];

  // Font family classes
  const fontClasses = fontStyle === 'serif' ? 'font-serif' : 'font-sans';

  // Font size classes
  const fontSizeClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  // Parse headings for table of contents
  const headings = item.content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line, idx) => {
      const text = line.replace('## ', '').trim();
      const anchor = `heading-${idx}`;
      return { text, anchor };
    });

  // Render markdown text to styled elements
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    let headingCounter = 0;
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLang = '';
    let isFirstParagraph = true;

    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      // Code block start/end
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = line.replace('```', '').trim() || 'text';
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          const fullCode = codeBuffer.join('\n');
          const codeId = `code-${index}`;
          elements.push(
            <div key={`code-block-${index}`} className="my-6 rounded-xl overflow-hidden border border-stone-300/60 dark:border-slate-700 bg-stone-900 text-stone-100 font-mono text-xs sm:text-sm shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 bg-stone-950/80 border-b border-stone-800 text-stone-400 text-xs">
                <span>{codeLang}</span>
                <button
                  onClick={() => copyCode(fullCode, codeId)}
                  className="flex items-center gap-1 hover:text-stone-200 transition-colors cursor-pointer"
                >
                  {copiedCodeId === codeId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-stone-200 leading-normal">
                <code>{fullCode}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(
          <hr key={`hr-${index}`} className="my-10 border-t border-stone-300/80 dark:border-slate-800" />
        );
        return;
      }

      // H2 Headings
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '').trim();
        const anchor = `heading-${headingCounter++}`;
        elements.push(
          <h2
            id={anchor}
            key={`h2-${index}`}
            className="text-2xl sm:text-3xl font-serif font-bold mt-12 mb-4 tracking-tight scroll-mt-24 text-stone-900 dark:text-stone-100"
          >
            {title}
          </h2>
        );
        return;
      }

      // H3 Headings
      if (line.startsWith('### ')) {
        const title = line.replace('### ', '').trim();
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg sm:text-xl font-serif font-bold mt-8 mb-3 text-stone-800 dark:text-stone-200"
          >
            {title}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        const quote = line.replace('> ', '').trim();
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="my-8 py-4 px-6 border-y border-stone-300 dark:border-slate-800 text-lg sm:text-xl font-serif italic text-stone-800 dark:text-stone-200 text-center leading-relaxed"
          >
            {quote}
          </blockquote>
        );
        return;
      }

      // Unordered lists
      if (line.startsWith('- ') || line.startsWith('• ')) {
        const itemText = line.replace(/^[-•]\s*/, '').trim();
        elements.push(
          <li key={`li-${index}`} className="ml-6 list-disc my-1.5 text-stone-700 dark:text-stone-300">
            {itemText}
          </li>
        );
        return;
      }

      // Ordered lists
      if (/^\d+\.\s/.test(line)) {
        const itemText = line.replace(/^\d+\.\s*/, '').trim();
        elements.push(
          <li key={`oli-${index}`} className="ml-6 list-decimal my-1.5 text-stone-700 dark:text-stone-300">
            {itemText}
          </li>
        );
        return;
      }

      // Regular paragraphs
      if (line.trim().length > 0) {
        if (isFirstParagraph && item.type === 'article') {
          isFirstParagraph = false;
          elements.push(
            <p
              key={`p-${index}`}
              className={`my-5 text-stone-800 dark:text-stone-200 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900 dark:first-letter:text-amber-300 ${fontSizeClasses}`}
            >
              {line}
            </p>
          );
        } else {
          elements.push(
            <p key={`p-${index}`} className={`my-5 text-stone-800 dark:text-stone-200 ${fontSizeClasses}`}>
              {line}
            </p>
          );
        }
      }
    });

    return elements;
  };

  return (
    <div ref={containerRef} className={`min-h-screen ${themeClasses} transition-colors duration-200 pb-24`}>
      
      {/* Sticky Reading Progress Bar at the Top */}
      <div className="fixed top-0 inset-x-0 h-1 bg-stone-200/50 z-50">
        <div
          className="h-full bg-amber-700 dark:bg-amber-500 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Header Reading Control Bar */}
      <header className="sticky top-0 z-40 bg-inherit/95 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 transition-colors">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Archive</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Reading format & theme controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Typeface Toggle */}
            <div className="flex items-center bg-stone-200/70 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontStyle('serif')}
                className={`px-2 py-1 rounded font-serif cursor-pointer ${
                  fontStyle === 'serif' ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white font-bold shadow-xs' : 'text-stone-500'
                }`}
                title="Serif typeface"
              >
                Serif
              </button>
              <button
                onClick={() => setFontStyle('sans')}
                className={`px-2 py-1 rounded font-sans cursor-pointer ${
                  fontStyle === 'sans' ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white font-bold shadow-xs' : 'text-stone-500'
                }`}
                title="Sans-serif typeface"
              >
                Sans
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center bg-stone-200/70 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 font-bold' : 'text-stone-500'}`}
                title="Default text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded text-sm cursor-pointer ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 font-bold' : 'text-stone-500'}`}
                title="Larger text size"
              >
                A+
              </button>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center bg-stone-200/70 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setTheme('paper')}
                className={`px-2 py-1 rounded cursor-pointer ${theme === 'paper' ? 'bg-white text-stone-900 font-bold' : 'text-stone-500'}`}
                title="Warm paper theme"
              >
                Paper
              </button>
              <button
                onClick={() => setTheme('white')}
                className={`px-2 py-1 rounded cursor-pointer ${theme === 'white' ? 'bg-white text-stone-900 font-bold' : 'text-stone-500'}`}
                title="Pure white theme"
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 rounded cursor-pointer ${theme === 'dark' ? 'bg-slate-700 text-white font-bold' : 'text-stone-500'}`}
                title="Night slate theme"
              >
                Dark
              </button>
            </div>

            {/* Edit Post Trigger */}
            <button
              onClick={() => onEdit(item)}
              aria-label="Edit post"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit in writing studio"
            >
              <PenTool className="w-4 h-4" />
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              aria-label="Share article"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
              title="Copy share link"
            >
              {copiedShare ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(item.id)}
              aria-label="Bookmark"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-800 dark:text-amber-400'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

          </div>

        </div>
      </header>

      {/* Main Reading Container */}
      <main className="max-w-4xl mx-auto px-6 pt-12 sm:pt-16">
        
        {/* Article Header */}
        <div className="space-y-6 pb-10 border-b border-stone-200 dark:border-slate-800">
          
          {/* Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans">
            <span className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider text-[11px]">
              {item.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{item.readTime}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{item.type}</span>
          </div>

          {/* Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-950 dark:text-white leading-[1.2] [text-wrap:balance]">
            {item.title}
          </h1>

          {/* Subtitle (if available) */}
          {item.subtitle && (
            <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
              {item.subtitle}
            </p>
          )}

          {/* Author Byline */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-stone-300 dark:border-slate-700"
              />
              <div>
                <div className="text-sm font-semibold text-stone-900 dark:text-white font-sans">
                  {author.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                  {author.title}
                </div>
              </div>
            </div>

            {/* Like Counter */}
            <button
              onClick={() => onLike(item.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer text-xs font-medium"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span className="font-mono tabular-nums">{item.likes} Applauds</span>
            </button>
          </div>

        </div>

        {/* Hero Cover Image (if available) */}
        {item.coverImage && (
          <div className="my-10">
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 bg-stone-100 dark:bg-slate-900 shadow-sm aspect-video">
              <img
                src={item.coverImage}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-serif italic text-stone-500 dark:text-stone-400 mt-2 px-1">
              Figure 1 · Visual synthesis accompanying "{item.title}"
            </div>
          </div>
        )}

        {/* Table of Contents for Long Articles */}
        {headings.length > 2 && (
          <div className="my-8 p-6 rounded-xl bg-stone-100/70 dark:bg-slate-900/60 border border-stone-200/80 dark:border-slate-800">
            <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold mb-3">
              Table of Contents
            </div>
            <ul className="space-y-2 text-sm">
              {headings.map((h) => (
                <li key={h.anchor}>
                  <a
                    href={`#${h.anchor}`}
                    className="text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{h.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Text */}
        <div className={`prose-content ${fontClasses} max-w-none`}>
          {renderFormattedContent(item.content)}
        </div>

        {/* Article Footer & Author Sign-off */}
        <div className="mt-16 pt-8 border-t border-stone-200 dark:border-slate-800 space-y-8">
          
          {/* Reaction Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-stone-100/70 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLike(item.id)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl hover:border-rose-300 dark:hover:border-rose-500 transition-all cursor-pointer shadow-xs text-sm"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="font-mono tabular-nums font-medium">{item.likes}</span>
                <span className="text-stone-500 dark:text-stone-400">Applauds</span>
              </button>

              <button
                onClick={() => onToggleBookmark(item.id)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all cursor-pointer text-sm ${
                  isBookmarked
                    ? 'bg-amber-100/80 border-amber-300 text-amber-900'
                    : 'bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Saved to Bookmarks' : 'Bookmark'}</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white cursor-pointer font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedShare ? 'Link copied!' : 'Share this piece'}</span>
            </button>
          </div>

          {/* Author Card */}
          <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={author.avatar}
              alt={author.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-stone-200 dark:border-slate-700 shrink-0"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  Written by {author.name}
                </span>
                <span className="text-xs text-stone-400 font-sans">· {author.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                {author.bio}
              </p>
            </div>
          </div>

          {/* Comments & Reader Reflections Section */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-stone-400" />
                <span>Reflections & Discussion</span>
                <span className="text-xs font-mono text-stone-400">({item.comments.length})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 p-5 rounded-2xl bg-stone-100/60 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
              <div className="text-xs font-medium text-stone-600 dark:text-stone-300">
                Leave a thoughtful response or question:
              </div>
              <input
                type="text"
                placeholder="Your name or handle (e.g. Arif)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-lg text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <textarea
                rows={3}
                placeholder="What resonated with you? Have you encountered similar constraints in your work?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-lg text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 resize-y"
              />
              <div className="flex items-center justify-between pt-1">
                {commentSuccess && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Thank you! Your reflection has been published.
                  </span>
                )}
                {!commentSuccess && <span />}
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-500 rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Submit Reflection
                </button>
              </div>
            </form>

            {/* Comments List */}
            {item.comments.length > 0 && (
              <div className="space-y-4 pt-2">
                {item.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 sm:p-5 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-sans">
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        {comment.author}
                      </span>
                      <span>{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {item.comments.length === 0 && (
              <div className="text-xs text-stone-400 font-serif italic py-4">
                No reflections yet. Be the first to share your thoughts on this essay.
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};
