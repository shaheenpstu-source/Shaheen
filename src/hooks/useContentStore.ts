import { useState, useEffect } from 'react';
import { ContentItem, ContentType, AuthorProfile, Comment } from '../types/content';
import { INITIAL_CONTENT, INITIAL_AUTHOR } from '../data/initialContent';

const STORAGE_KEY = 'shaheen_cv_site_content_v2';
const AUTHOR_STORAGE_KEY = 'shaheen_cv_site_author_v2';
const BOOKMARKS_KEY = 'shaheen_cv_site_bookmarks_v2';

export function useContentStore() {
  const [items, setItems] = useState<ContentItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored content', e);
    }
    return INITIAL_CONTENT;
  });

  const [author, setAuthor] = useState<AuthorProfile>(() => {
    try {
      const stored = localStorage.getItem(AUTHOR_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored author', e);
    }
    return INITIAL_AUTHOR;
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse bookmarks', e);
    }
    return ['article-resilient-distributed-systems', 'thought-velocity-vs-direction'];
  });

  // Save items on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save content', e);
    }
  }, [items]);

  // Save author on change
  useEffect(() => {
    try {
      localStorage.setItem(AUTHOR_STORAGE_KEY, JSON.stringify(author));
    } catch (e) {
      console.error('Failed to save author', e);
    }
  }, [author]);

  // Save bookmarks on change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  const addItem = (item: Omit<ContentItem, 'id' | 'slug' | 'likes' | 'bookmarks' | 'comments'>) => {
    const wordCount = item.content.trim().split(/\s+/).length;
    const computedReadTime = item.type === 'thought' 
      ? '1 min read' 
      : `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const newItem: ContentItem = {
      ...item,
      id: `${item.type}-${Date.now()}`,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `post-${Date.now()}`,
      readTime: item.readTime || computedReadTime,
      likes: 1,
      bookmarks: 0,
      comments: [],
    };

    setItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<ContentItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setBookmarkedIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
  };

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, likes: item.likes + 1 };
        }
        return item;
      })
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      
      // Also update bookmark count on the item
      setItems((itemsList) =>
        itemsList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              bookmarks: Math.max(0, item.bookmarks + (exists ? -1 : 1)),
            };
          }
          return item;
        })
      );
      return updated;
    });
  };

  const addComment = (itemId: string, commentText: string, authorName: string) => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: authorName.trim() || 'Thoughtful Reader',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      content: commentText.trim(),
      likes: 0,
    };

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            comments: [newComment, ...item.comments],
          };
        }
        return item;
      })
    );
  };

  const resetToSample = () => {
    setItems(INITIAL_CONTENT);
    setAuthor(INITIAL_AUTHOR);
    setBookmarkedIds(['article-resilient-distributed-systems', 'thought-velocity-vs-direction']);
  };

  const exportDataJson = () => {
    const data = {
      author,
      items,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shaheen-personal-writings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.items)) {
        setItems(parsed.items);
      }
      if (parsed.author && parsed.author.name) {
        setAuthor(parsed.author);
      }
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  };

  return {
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
  };
}
