import React, { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, Rss, Github, Linkedin, Mail, Twitter, Check } from 'lucide-react';
import { AuthorProfile, ContentItem } from '../types/content';

interface FooterProps {
  author: AuthorProfile;
  items: ContentItem[];
  onReset: () => void;
  onExport: () => void;
  onImport: (json: string) => boolean;
}

export const Footer: React.FC<FooterProps> = ({
  author,
  items,
  onReset,
  onExport,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [showRssModal, setShowRssModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = onImport(content);
        if (ok) {
          setImportSuccess(true);
          setTimeout(() => setImportSuccess(false), 3000);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Generate RSS 2.0 XML string
  const generateRssXml = () => {
    const itemsXml = items.map((item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>https://shaheen.dev/${item.slug}</link>
      <guid isPermaLink="false">${item.id}</guid>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${item.summary}]]></description>
      <category>${item.category}</category>
    </item>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${author.name} · Writings & Essays</title>
    <link>https://shaheen.dev</link>
    <description>${author.tagline}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;
  };

  const handleDownloadRss = () => {
    const xml = generateRssXml();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shaheen-feed.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-[#F5F2EC] text-stone-700 py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Colophon */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-xl font-serif font-bold text-stone-900">
              {author.name}<span className="text-amber-800">.</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-sm">
              {author.tagline}
            </p>
            <div className="text-xs text-stone-500 font-serif italic pt-1">
              Colophon: Built with intentional typography in Lora and Plus Jakarta Sans. No trackers. No behavioral ads.
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-800 font-sans">
              Connect & Inquiries
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
              <li>
                <a
                  href={`mailto:${author.email}`}
                  className="hover:text-stone-900 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{author.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={author.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5 text-stone-400" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-stone-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Data Portability & Archive Utilities */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-800 font-sans">
              Archive & Data Portability
            </div>
            <p className="text-xs text-stone-500 font-sans">
              All your articles and thoughts are stored locally in your browser. You can export a full JSON snapshot or subscribe via RSS.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {/* RSS Feed */}
              <button
                onClick={() => setShowRssModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-700 hover:text-stone-900 hover:border-stone-400 transition-colors cursor-pointer"
              >
                <Rss className="w-3.5 h-3.5 text-amber-700" />
                <span>RSS Feed</span>
              </button>

              {/* Export JSON */}
              <button
                onClick={onExport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-700 hover:text-stone-900 hover:border-stone-400 transition-colors cursor-pointer"
                title="Download full JSON backup"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              {/* Import JSON */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-700 hover:text-stone-900 hover:border-stone-400 transition-colors cursor-pointer"
                title="Restore from JSON backup"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restore Backup</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Reset to Sample */}
              <button
                onClick={() => {
                  if (window.confirm('Reset all writings to default curated seed posts?')) {
                    onReset();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
                title="Reset to initial seed writings"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Seed</span>
              </button>
            </div>

            {importSuccess && (
              <div className="text-xs text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Backup successfully restored!</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} {author.name}. Written with care and deliberate attention.
          </div>
          <div className="flex items-center gap-4">
            <span>PSTU & Dhaka</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>
        </div>

      </div>

      {/* RSS XML Modal */}
      {showRssModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-stone-300 p-6 space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-stone-900">
                <Rss className="w-5 h-5 text-amber-600" />
                <span>RSS 2.0 Feed Preview</span>
              </div>
              <button
                onClick={() => setShowRssModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-stone-600">
              You can subscribe to this personal publication using any standard RSS reader (NetNewsWire, Reeder, Feedly):
            </p>

            <pre className="flex-1 overflow-y-auto p-4 bg-stone-900 text-stone-200 text-xs font-mono rounded-xl leading-normal">
              {generateRssXml()}
            </pre>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateRssXml());
                  alert('RSS XML copied to clipboard!');
                }}
                className="px-4 py-2 text-xs font-medium border border-stone-300 rounded-lg hover:bg-stone-50 cursor-pointer"
              >
                Copy XML
              </button>
              <button
                onClick={handleDownloadRss}
                className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 cursor-pointer"
              >
                Download .xml File
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
