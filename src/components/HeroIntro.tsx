import React, { useState } from 'react';
import { ArrowRight, FileText, Compass, Building2, MapPin, CheckCircle2, RefreshCw } from 'lucide-react';
import { AuthorProfile } from '../types/content';

interface HeroIntroProps {
  author: AuthorProfile;
  totalArticles: number;
  totalBlog: number;
  totalThoughts: number;
  onExploreClick: () => void;
  onOpenAbout: () => void;
  onOpenCV: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  author,
  totalArticles,
  totalBlog,
  totalThoughts,
  onExploreClick,
  onOpenAbout,
  onOpenCV,
}) => {
  const [photoView, setPhotoView] = useState<'official' | 'field'>('official');

  const activePhoto = photoView === 'official' 
    ? '/src/assets/images/shaheen_official_portrait_1791868282542.jpg'
    : '/src/assets/images/author_climate_portrait_1791867674226.jpg';

  return (
    <section className="pt-10 pb-12 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Split Hero: Left typography & Right visual container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Typographic Hierarchy) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-stone-500 font-sans">
              <span className="font-semibold text-stone-800">BRAC Sector Specialist (Ag)</span>
              <span aria-hidden="true">·</span>
              <span>MEAL & Climate Agriculture</span>
              <span aria-hidden="true">·</span>
              <span>Assasuni, Satkhira</span>
            </div>

            {/* Oversized Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.18] font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
              Scaling climate-adaptive agriculture, regenerative soil systems, and nature-based solutions across the Bengal Delta.
            </h1>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-2xl">
              Hello, I am <strong>Md. Shaheen Hossain</strong>. With over 4 years of field experience in 
              knowledge management, MEAL, and climate-adaptive agriculture in coastal Bangladesh, I lead 
              field documentation, carbon & biodiversity monitoring across a 122-hectare intervention area, 
              and agroforestry capacity building for 150+ smallholders at BRAC.
            </p>

            {/* Interactive Intent Affordances */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Read Case Studies & Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCV}
                className="flex items-center gap-2 px-4.5 py-2.5 text-sm font-semibold text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4 text-amber-800" />
                <span>Curriculum Vitae (CV)</span>
              </button>

              <button
                onClick={onOpenAbout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4 text-stone-500" />
                <span>About</span>
              </button>
            </div>

            {/* Quiet Status Line */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 font-sans">
              <span className="flex items-center gap-1.5 font-medium text-stone-800">
                <Building2 className="w-3.5 h-3.5 text-stone-500" />
                Current Role: Sector Specialist (Agriculture), BRAC
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                Assasuni, Satkhira & Khulna
              </span>
            </div>

          </div>

          {/* Right Column: Editorial Visual Container with Official Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md group">
              
              {/* Outer Framing */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md aspect-square">
                <img
                  src={activePhoto}
                  alt={author.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                
                {/* Subtle scrim for bottom caption overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-transparent text-white">
                  <div className="text-sm font-serif font-bold">{author.name}</div>
                  <div className="text-xs text-stone-300 font-sans mt-0.5">
                    {photoView === 'official' ? 'Official Professional Portrait' : 'Field Research & Agroforestry'}
                  </div>
                </div>

                {/* Photo Switcher pill in top right corner */}
                <button
                  onClick={() => setPhotoView(photoView === 'official' ? 'field' : 'official')}
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-stone-900/80 hover:bg-stone-900 text-white rounded-lg text-[11px] font-sans backdrop-blur-sm transition-all cursor-pointer shadow-sm"
                  title="Switch between official portrait and field photo"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{photoView === 'official' ? 'Field View' : 'Official View'}</span>
                </button>
              </div>

              {/* Minimal caption directly underneath */}
              <div className="flex items-center justify-between text-xs text-stone-500 mt-2.5 px-1 font-sans">
                <span className="font-medium text-stone-700">M.Sc. Horticulture (Khulna Univ)</span>
                <span>B.Sc. Agriculture (PSTU)</span>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width editorial metric strip below hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          
          <div>
            <div className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              122 ha
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mt-1 font-semibold">
              Intervention Monitored
            </div>
            <div className="text-xs text-stone-400 mt-0.5 font-sans">
              Carbon, soil & biodiversity GIS in Satkhira
            </div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              150+
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mt-1 font-semibold">
              Smallholders Trained
            </div>
            <div className="text-xs text-stone-400 mt-0.5 font-sans">
              Climate-smart agriculture & agroforestry
            </div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              4+ Years
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mt-1 font-semibold">
              Field Experience
            </div>
            <div className="text-xs text-stone-400 mt-0.5 font-sans">
              BRAC (Sector Specialist) & EDS (Supervisor)
            </div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              M.Sc. & B.Sc.
            </div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mt-1 font-semibold">
              Academic Excellence
            </div>
            <div className="text-xs text-stone-400 mt-0.5 font-sans">
              Khulna University (3.55) & PSTU (3.38)
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
