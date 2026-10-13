import React, { useState, useMemo, useRef } from 'react';
import { useContentStore } from './hooks/useContentStore';
import { ContentItem, ContentType } from './types/content';
import { TopNav } from './components/TopNav';
import { HeroIntro } from './components/HeroIntro';
import { FilterBar } from './components/FilterBar';
import { ArticleCard } from './components/ArticleCard';
import { BlogCard } from './components/BlogCard';
import { ThoughtCard } from './components/ThoughtCard';
import { ArticleReader } from './components/ArticleReader';
import { WritingStudioModal } from './components/WritingStudioModal';
import { AboutModal } from './components/AboutModal';
import { CVSectionModal } from './components/CVSectionModal';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { BookOpen } from 'lucide-react';

export default function App() {
  const {
    items,
    author,
    setAuthor,
    bookmarkedIds,
    addItem,
    updateItem,
    deleteItem,
    toggleLike,
    toggleBookmark,
    addComment,
    resetToSample,
    exportDataJson,
    importDataJson,
  } = useContentStore();

  // Active view states
  const [activeTab, setActiveTab] = useState<ContentType | 'all' | 'bookmarks'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Modals & Reader state
  const [readingItem, setReadingItem] = useState<ContentItem | null>(null);
  const [isWritingOpen, setIsWritingOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const writingsSectionRef = useRef<HTMLDivElement>(null);

  // Compute counts
  const counts = useMemo(() => {
    return {
      all: items.length,
      article: items.filter((i) => i.type === 'article').length,
      blog: items.filter((i) => i.type === 'blog').length,
      thought: items.filter((i) => i.type === 'thought').length,
      bookmarks: bookmarkedIds.length,
    };
  }, [items, bookmarkedIds]);

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      item.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).slice(0, 10);
  }, [items]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (activeTab === 'bookmarks') {
        if (!bookmarkedIds.includes(item.id)) return false;
      } else if (activeTab !== 'all') {
        if (item.type !== activeTab) return false;
      }

      // Tag filter
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchSubtitle = (item.subtitle || '').toLowerCase().includes(query);
        const matchSummary = item.summary.toLowerCase().includes(query);
        const matchContent = item.content.toLowerCase().includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchCategory = item.category.toLowerCase().includes(query);
        return matchTitle || matchSubtitle || matchSummary || matchContent || matchTags || matchCategory;
      }

      return true;
    });
  }, [items, activeTab, bookmarkedIds, selectedTag, searchQuery]);

  // Handle open writing studio
  const handleOpenWritingStudio = (itemToEdit?: ContentItem) => {
    setEditingItem(itemToEdit || null);
    setIsWritingOpen(true);
  };

  // Scroll to writings
  const handleScrollToWritings = () => {
    writingsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // If reading mode is active, render ArticleReader view
  if (readingItem) {
    const currentItem = items.find((i) => i.id === readingItem.id) || readingItem;
    return (
      <>
        <ArticleReader
          item={currentItem}
          author={author}
          isBookmarked={bookmarkedIds.includes(currentItem.id)}
          onClose={() => setReadingItem(null)}
          onToggleBookmark={toggleBookmark}
          onLike={toggleLike}
          onAddComment={addComment}
          onEdit={(item) => {
            setReadingItem(null);
            handleOpenWritingStudio(item);
          }}
        />

        {/* Writing Studio Modal (if opened from reader) */}
        <WritingStudioModal
          isOpen={isWritingOpen}
          onClose={() => {
            setIsWritingOpen(false);
            setEditingItem(null);
          }}
          onSave={addItem}
          onUpdate={updateItem}
          onDelete={deleteItem}
          editingItem={editingItem}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 3-Zone Top Bar Navigation */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          handleScrollToWritings();
        }}
        onOpenWritingStudio={() => handleOpenWritingStudio()}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenCV={() => setIsCVOpen(true)}
        bookmarksCount={bookmarkedIds.length}
        onOpenSearch={() => {
          handleScrollToWritings();
        }}
      />

      {/* Hero Presentation */}
      <HeroIntro
        author={author}
        totalArticles={counts.article}
        totalBlog={counts.blog}
        totalThoughts={counts.thought}
        onExploreClick={handleScrollToWritings}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Main Content Explorer */}
      <main ref={writingsSectionRef} className="flex-1 max-w-6xl w-full mx-auto px-6 pt-10 pb-16 space-y-8">
        
        {/* Section Heading & Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200/60 pb-3">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500 font-medium">
                {activeTab === 'bookmarks' ? 'Your Personal Reading List' : 'Knowledge Repository & Catalogue'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 mt-1">
                {activeTab === 'all' && 'All Published Works & Field Studies'}
                {activeTab === 'article' && 'Long-form Case Studies & Technical Papers'}
                {activeTab === 'blog' && 'Field Dispatches & Agronomic Reflections'}
                {activeTab === 'thought' && 'Aphoristic Thoughts on Living Soils & NbS'}
                {activeTab === 'bookmarks' && 'Saved Bookmarks'}
              </h2>
            </div>

            <div className="text-xs text-stone-500 font-sans">
              Showing <span className="font-semibold text-stone-900">{filteredItems.length}</span> of {items.length} works
            </div>
          </div>

          {/* Interactive Filter Bar */}
          <FilterBar
            activeType={activeTab}
            onSelectType={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            availableTags={availableTags}
            counts={counts}
          />
        </div>

        {/* Content Listing Grid */}
        {filteredItems.length > 0 ? (
          <div className="space-y-8">
            
            {/* If looking at all items, or articles tab */}
            {(activeTab === 'all' || activeTab === 'article' || activeTab === 'bookmarks') && (
              <div className="space-y-6">
                {filteredItems
                  .filter((item) => item.type === 'article')
                  .map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isBookmarked={bookmarkedIds.includes(article.id)}
                      onOpen={(item) => setReadingItem(item)}
                      onToggleBookmark={toggleBookmark}
                      onLike={toggleLike}
                    />
                  ))}
              </div>
            )}

            {/* If looking at blog posts */}
            {(activeTab === 'all' || activeTab === 'blog' || activeTab === 'bookmarks') && (
              <div className="space-y-4">
                {activeTab === 'all' && filteredItems.some((i) => i.type === 'blog') && (
                  <div className="pt-4 flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <span className="text-xs uppercase tracking-widest font-semibold text-stone-600 font-sans">
                      Field Notes & Dispatches
                    </span>
                    <button
                      onClick={() => setActiveTab('blog')}
                      className="text-xs text-stone-500 hover:text-stone-900 underline font-sans cursor-pointer"
                    >
                      View all field dispatches →
                    </button>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems
                    .filter((item) => item.type === 'blog')
                    .map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        isBookmarked={bookmarkedIds.includes(post.id)}
                        onOpen={(item) => setReadingItem(item)}
                        onToggleBookmark={toggleBookmark}
                        onLike={toggleLike}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* If looking at thoughts */}
            {(activeTab === 'all' || activeTab === 'thought' || activeTab === 'bookmarks') && (
              <div className="space-y-4">
                {activeTab === 'all' && filteredItems.some((i) => i.type === 'thought') && (
                  <div className="pt-6 flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <span className="text-xs uppercase tracking-widest font-semibold text-stone-600 font-sans">
                      Aphorisms on Soil, Water & Nature-Based Solutions
                    </span>
                    <button
                      onClick={() => setActiveTab('thought')}
                      className="text-xs text-stone-500 hover:text-stone-900 underline font-sans cursor-pointer"
                    >
                      View all thoughts →
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems
                    .filter((item) => item.type === 'thought')
                    .map((thought) => (
                      <ThoughtCard
                        key={thought.id}
                        thought={thought}
                        isBookmarked={bookmarkedIds.includes(thought.id)}
                        onOpen={(item) => setReadingItem(item)}
                        onToggleBookmark={toggleBookmark}
                        onLike={toggleLike}
                      />
                    ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="py-16 text-center space-y-4 bg-white/70 rounded-2xl border border-stone-200 p-8">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              No matching case studies or notes found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto font-sans">
              No publications match your current filter or query "{searchQuery}". Try clearing filters or search terms.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                  setActiveTab('all');
                }}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer transition-colors"
              >
                Clear all filters
              </button>
              <button
                onClick={() => handleOpenWritingStudio()}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
              >
                Write a new case study
              </button>
            </div>
          </div>
        )}

        {/* Newsletter Dispatch Box */}
        <NewsletterSection />

      </main>

      {/* Editorial Footer */}
      <Footer
        author={author}
        items={items}
        onReset={resetToSample}
        onExport={exportDataJson}
        onImport={importDataJson}
      />

      {/* Writing Studio Modal */}
      <WritingStudioModal
        isOpen={isWritingOpen}
        onClose={() => {
          setIsWritingOpen(false);
          setEditingItem(null);
        }}
        onSave={addItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
        editingItem={editingItem}
      />

      {/* About & Philosophy Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        author={author}
        onUpdateAuthor={setAuthor}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Curriculum Vitae Modal */}
      <CVSectionModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
        author={author}
      />

    </div>
  );
}
