import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Cpu, 
  Edit3, 
  Check, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  FileText
} from 'lucide-react';
import { AuthorProfile } from '../types/content';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: AuthorProfile;
  onUpdateAuthor: (updated: AuthorProfile) => void;
  onOpenCV: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  author,
  onUpdateAuthor,
  onOpenCV,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(author.name);
  const [title, setTitle] = useState(author.title);
  const [bio, setBio] = useState(author.bio);
  const [location, setLocation] = useState(author.location);
  const [email, setEmail] = useState(author.email);
  const [phone, setPhone] = useState(author.phone || '01950250314');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAuthor({
      ...author,
      name,
      title,
      bio,
      location,
      email,
      phone,
    });
    setIsEditing(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(author.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(author.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold">
            <span>Professional Profile & Monograph</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenCV();
              }}
              className="text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Full CV</span>
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 px-2.5 py-1 rounded hover:bg-stone-100 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {isEditing ? (
            /* Edit Author Form */
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Title / Descriptor</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Professional Summary</label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            /* Profile Presentation */
            <>
              {/* Profile Top: Avatar + Heading */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <img
                  src={author.avatar}
                  alt={author.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl object-cover border-2 border-stone-300 shadow-md shrink-0"
                />
                <div className="space-y-1.5">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {author.name}
                  </h1>
                  <p className="text-sm font-semibold text-amber-900 font-sans">
                    {author.title}
                  </p>
                  <p className="text-xs text-stone-600 font-medium">
                    Sector Specialist (Agriculture) · BRAC
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-stone-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{author.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      {author.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Extended Bio */}
              <div className="space-y-4 text-stone-700 text-sm leading-relaxed font-sans">
                <p>{author.bio}</p>
                <div className="whitespace-pre-wrap font-serif text-stone-800 text-sm bg-white/70 p-5 rounded-xl border border-stone-200">
                  {author.extendedBio}
                </div>
              </div>

              {/* Education Badges */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-800" />
                  <span>Academic Qualifications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-white border border-stone-200 rounded-xl">
                    <div className="font-bold text-xs sm:text-sm text-stone-900">M.Sc. in Horticulture</div>
                    <div className="text-xs text-stone-600">Khulna University (2024)</div>
                    <div className="text-xs text-amber-900 font-mono font-semibold mt-0.5">CGPA: 3.55 / 4.00</div>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-xl">
                    <div className="font-bold text-xs sm:text-sm text-stone-900">B.Sc. (Hons.) in Agriculture</div>
                    <div className="text-xs text-stone-600">PSTU (2020)</div>
                    <div className="text-xs text-amber-900 font-mono font-semibold mt-0.5">CGPA: 3.375 / 4.00</div>
                  </div>
                </div>
              </div>

              {/* Experience Highlights */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-800" />
                  <span>Core Work Highlights</span>
                </h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li className="flex items-start gap-2 bg-stone-100/70 p-2.5 rounded-lg border border-stone-200/60">
                    <span className="font-bold text-amber-800">BRAC:</span>
                    <span>Tracking carbon sequestration, biodiversity, and farmer incomes across a 122-ha intervention area in Assasuni, Satkhira.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-stone-100/70 p-2.5 rounded-lg border border-stone-200/60">
                    <span className="font-bold text-amber-800">Capacity:</span>
                    <span>Trained 150+ smallholders in climate-smart agriculture and participatory agroforestry.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-stone-100/70 p-2.5 rounded-lg border border-stone-200/60">
                    <span className="font-bold text-amber-800">EDS:</span>
                    <span>Led programme documentation and supervised income-generating activities in Khulna.</span>
                  </li>
                </ul>
              </div>

              {/* Contact Bar */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-stone-600 font-mono">
                  <span>{author.email}</span>
                  <span>·</span>
                  <span>{author.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPhone}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-200/70 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedPhone ? 'Phone Copied!' : 'Copy Phone'}
                  </button>

                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-200/70 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedEmail ? 'Email Copied!' : 'Copy Email'}
                  </button>

                  <a
                    href={`mailto:${author.email}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <span>Contact Shaheen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
