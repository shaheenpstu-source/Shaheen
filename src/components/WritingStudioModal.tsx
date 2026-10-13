import React, { useState, useEffect } from 'react';
import { 
  X, 
  PenTool, 
  Image as ImageIcon, 
  Eye, 
  FileText, 
  Hash, 
  Trash2, 
  Sparkles, 
  Bold, 
  Italic, 
  Quote, 
  Code, 
  List, 
  Heading2, 
  Check 
} from 'lucide-react';
import { ContentItem, ContentType } from '../types/content';

interface WritingStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<ContentItem, 'id' | 'slug' | 'likes' | 'bookmarks' | 'comments'>) => void;
  onUpdate?: (id: string, updates: Partial<ContentItem>) => void;
  onDelete?: (id: string) => void;
  editingItem?: ContentItem | null;
}

const PRESET_COVERS = [
  { label: 'Coastal Mangrove Bio-Shield & NbS', path: '/src/assets/images/cover_coastal_mangrove_nbs_1791867674686.jpg' },
  { label: 'Regenerative Soil & Living Carbon', path: '/src/assets/images/cover_regenerative_soil_1791867675019.jpg' },
  { label: 'Floating Agriculture (Baira) & Wetlands', path: '/src/assets/images/cover_floating_agriculture_1791867674826.jpg' },
];

const CATEGORY_SUGGESTIONS = [
  'MEAL & Case Studies',
  'Nature-Based Solutions (NbS)',
  'Climate-Adaptive Agriculture',
  'Regenerative Agriculture',
  'Field Dispatches',
  'Personal Reflections',
];

export const WritingStudioModal: React.FC<WritingStudioModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  editingItem,
}) => {
  const [type, setType] = useState<ContentType>('article');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Systems Architecture');
  const [tagsInput, setTagsInput] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [customCoverUrl, setCustomCoverUrl] = useState('');

  // Populate when editingItem changes
  useEffect(() => {
    if (editingItem) {
      setType(editingItem.type);
      setTitle(editingItem.title);
      setSubtitle(editingItem.subtitle || '');
      setCategory(editingItem.category);
      setTagsInput(editingItem.tags.join(', '));
      setSummary(editingItem.summary);
      setContent(editingItem.content);
      setCoverImage(editingItem.coverImage || '');
      setCustomCoverUrl(editingItem.coverImage || '');
    } else {
      // Defaults for new post
      setType('article');
      setTitle('');
      setSubtitle('');
      setCategory('Systems Architecture');
      setTagsInput('Architecture, Engineering');
      setSummary('');
      setContent(`## 01. Introduction\n\nBegin your thought or essay here...\n\n> "A clear sentence is the reward for clear thinking."\n\n## 02. The Core Idea\n\nExplain the mechanism, trade-offs, and observations.`);
      setCoverImage('/src/assets/images/cover_distributed_systems_1791866381592.jpg');
      setCustomCoverUrl('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  // Word count & read time
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const estimatedMins = Math.max(1, Math.ceil(words / 200));
  const readTimeStr = type === 'thought' ? '1 min read' : `${estimatedMins} min read`;

  const insertSnippet = (prefix: string, suffix: string = '') => {
    setContent((prev) => prev + `\n${prefix}${suffix}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const effectiveCover = coverImage || customCoverUrl || undefined;

    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    if (editingItem && onUpdate) {
      onUpdate(editingItem.id, {
        type,
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        category: category.trim() || 'General',
        tags: parsedTags.length > 0 ? parsedTags : ['Writing'],
        summary: summary.trim() || content.slice(0, 160).replace(/[#>*_`]/g, '') + '...',
        content: content.trim(),
        coverImage: effectiveCover,
        readTime: readTimeStr,
      });
    } else {
      onSave({
        type,
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        category: category.trim() || 'General',
        tags: parsedTags.length > 0 ? parsedTags : ['Writing'],
        summary: summary.trim() || content.slice(0, 160).replace(/[#>*_`]/g, '') + '...',
        content: content.trim(),
        coverImage: effectiveCover,
        readTime: readTimeStr,
        publishedAt: nowStr,
        featured: false,
        pinned: false,
      });
    }

    onClose();
  };

  const handleDelete = () => {
    if (!editingItem || !onDelete) return;
    if (window.confirm(`Are you sure you want to delete "${editingItem.title}"?`)) {
      onDelete(editingItem.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-900 text-white rounded-lg">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {editingItem ? 'Edit Publication' : 'Shaheen\'s Writing Studio'}
              </h2>
              <div className="text-xs text-stone-500 font-sans">
                Draft, polish, and publish articles, blog entries, or thoughts
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {editingItem && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete this publication"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Format Selection (Article vs Blog vs Thought) */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
              Publication Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setType('article')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  type === 'article'
                    ? 'border-stone-900 bg-white shadow-xs text-stone-900'
                    : 'border-stone-200 bg-stone-100/60 hover:bg-white text-stone-600'
                }`}
              >
                <div className="font-serif font-bold text-sm">Long-form Article</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Deep dive with diagrams, code, & sections
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('blog')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  type === 'blog'
                    ? 'border-stone-900 bg-white shadow-xs text-stone-900'
                    : 'border-stone-200 bg-stone-100/60 hover:bg-white text-stone-600'
                }`}
              >
                <div className="font-serif font-bold text-sm">Blog / Essay</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Personal notes, book reviews, journey
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('thought')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  type === 'thought'
                    ? 'border-stone-900 bg-white shadow-xs text-stone-900'
                    : 'border-stone-200 bg-stone-100/60 hover:bg-white text-stone-600'
                }`}
              >
                <div className="font-serif font-bold text-sm">Quick Thought</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Aphorism, quote note, 1-min fragment
                </div>
              </button>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={type === 'thought' ? 'e.g. On Velocity vs Direction' : 'e.g. The Architecture of Distributed Consensus'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 text-base sm:text-lg font-serif font-semibold bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            {type !== 'thought' && (
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Subtitle or Proposition
                </label>
                <input
                  type="text"
                  placeholder="A concise one-line synthesis of the core insight..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full mt-1 px-4 py-2 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            )}
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Systems Architecture"
                className="w-full mt-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {CATEGORY_SUGGESTIONS.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className="text-[11px] text-stone-500 hover:text-stone-900 bg-stone-200/50 hover:bg-stone-200 px-2 py-0.5 rounded cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="IoT, Consensus, Distributed Systems"
                className="w-full mt-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
          </div>

          {/* Cover Image Selector (Only for Articles / Blog) */}
          {type !== 'thought' && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center justify-between">
                <span>Editorial Cover Visual</span>
                <span className="text-stone-400 font-normal lowercase">optional</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRESET_COVERS.map((preset) => (
                  <button
                    key={preset.path}
                    type="button"
                    onClick={() => {
                      setCoverImage(preset.path);
                      setCustomCoverUrl('');
                    }}
                    className={`relative rounded-xl overflow-hidden border text-left cursor-pointer transition-all aspect-video ${
                      coverImage === preset.path
                        ? 'ring-2 ring-stone-900 border-transparent shadow-xs'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.path}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-stone-900/80 text-[10px] text-white truncate font-sans">
                      {preset.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Image URL or Remove */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="text"
                  placeholder="Or paste external image URL / path..."
                  value={customCoverUrl}
                  onChange={(e) => {
                    setCustomCoverUrl(e.target.value);
                    setCoverImage(e.target.value);
                  }}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
                {(coverImage || customCoverUrl) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage('');
                      setCustomCoverUrl('');
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                  >
                    No Cover Image
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Markdown Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Manuscript Prose (Markdown) <span className="text-rose-500">*</span>
              </label>

              {/* Tab Switcher: Write vs Preview */}
              <div className="flex items-center gap-1 bg-stone-200/80 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    activeTab === 'write' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    activeTab === 'preview' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            {/* Quick Markdown Formatting Strip */}
            {activeTab === 'write' && (
              <div className="flex items-center gap-1 p-1.5 bg-stone-100 border border-stone-200 rounded-t-xl text-xs text-stone-600">
                <button
                  type="button"
                  onClick={() => insertSnippet('## Section Title')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Heading 2"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('**bold text**')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('*italic text*')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('> "Quote or principle here..."')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Pullquote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('```typescript\n// code here\n```')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Code snippet"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('- First point\n- Second point')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Bullet list"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('---\n')}
                  className="p-1.5 hover:bg-stone-200 rounded cursor-pointer"
                  title="Divider rule"
                >
                  Divider
                </button>
              </div>
            )}

            {/* Textarea or Preview View */}
            {activeTab === 'write' ? (
              <textarea
                required
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article or thoughts in markdown..."
                className="w-full p-4 font-mono text-xs sm:text-sm bg-white border border-stone-300 rounded-b-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 resize-y leading-relaxed"
              />
            ) : (
              <div className="p-6 bg-white border border-stone-300 rounded-xl min-h-[300px] overflow-y-auto space-y-4">
                <div className="text-2xl font-serif font-bold text-stone-900">{title || 'Untitled Draft'}</div>
                {subtitle && <div className="text-stone-500 font-sans italic">{subtitle}</div>}
                <hr className="border-stone-200" />
                <div className="font-serif text-stone-800 leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              </div>
            )}

            {/* Live Counter Info */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>{words} words · {readTimeStr}</span>
              <span>Markdown supported</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl disabled:opacity-40 transition-all shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{editingItem ? 'Save Updates' : 'Publish to Personal Site'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
