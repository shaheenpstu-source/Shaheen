import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Building2, 
  Layers, 
  FileText,
  UserCheck
} from 'lucide-react';
import { AuthorProfile } from '../types/content';

interface CVSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: AuthorProfile;
}

export const CVSectionModal: React.FC<CVSectionModalProps> = ({
  isOpen,
  onClose,
  author,
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] print:max-h-none print:border-none print:shadow-none print:rounded-none">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="px-6 py-3.5 border-b border-stone-200 bg-stone-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-600 font-sans">
            <FileText className="w-4 h-4 text-amber-800" />
            <span>Curriculum Vitae · Md. Shaheen Hossain</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-stone-800 space-y-8 print:p-0">
          
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-stone-900">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950 tracking-tight">
                MD. SHAHEEN HOSSAIN
              </h1>
              <div className="text-sm sm:text-base font-semibold text-amber-900 font-sans">
                Knowledge Management, MEAL & Climate-Adaptive Agriculture Professional
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Sector Specialist (Agriculture) · BRAC
              </p>

              {/* Contact Grid */}
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 pt-2 text-xs text-stone-600">
                <button
                  onClick={() => copyToClipboard('01950250314', 'phone')}
                  className="flex items-center gap-1.5 hover:text-stone-900 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>01950250314</span>
                  {copied === 'phone' && <span className="text-[10px] text-emerald-600 font-bold">(Copied)</span>}
                </button>

                <button
                  onClick={() => copyToClipboard('shaheenpstu@gmail.com', 'email')}
                  className="flex items-center gap-1.5 hover:text-stone-900 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>shaheenpstu@gmail.com</span>
                  {copied === 'email' && <span className="text-[10px] text-emerald-600 font-bold">(Copied)</span>}
                </button>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Fulbariget, KUET-9203, Khulna, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Official Photo */}
            <div className="shrink-0 self-center sm:self-start">
              <img
                src={author.avatar}
                alt="Md. Shaheen Hossain"
                referrerPolicy="no-referrer"
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl object-cover border-2 border-stone-200 shadow-sm"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-2.5">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-800" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Development professional with over <strong>4 years of field experience</strong> in knowledge management, 
              monitoring & learning (MEAL), documentation, and climate-adaptive agriculture programming in Bangladesh. 
              Skilled in capturing and disseminating project learning through case studies, reports, and knowledge products; 
              managing M&E data, dashboards, and reporting systems; and building the capacity of field teams, partners, 
              and community members. Currently serving as <strong>Sector Specialist (Agriculture) at BRAC</strong>, where core 
              responsibilities include documentation, data management, capacity building, and stakeholder communication in a donor-funded programme environment.
            </p>
          </section>

          {/* Key Intervention Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">122 ha</div>
              <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Intervention Area</div>
              <div className="text-[10px] text-stone-400">Carbon & biodiversity tracking</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">150+</div>
              <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Farmers Trained</div>
              <div className="text-[10px] text-stone-400">Climate-smart agroforestry</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">4+ Years</div>
              <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Field Experience</div>
              <div className="text-[10px] text-stone-400">Coastal delta agriculture</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">M.Sc.</div>
              <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Horticulture</div>
              <div className="text-[10px] text-stone-400">Khulna University (3.55)</div>
            </div>
          </div>

          {/* Professional Experience */}
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-800" />
              <span>Professional Experience</span>
            </h2>

            {/* Role 1: BRAC */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <span>Sector Specialist (Agriculture)</span>
                    <span className="text-xs font-normal text-stone-500">· BRAC</span>
                  </h3>
                  <div className="text-xs text-amber-900 font-medium">Assasuni, Satkhira, Bangladesh</div>
                </div>
                <div className="text-xs text-stone-500 font-mono font-semibold">April 2024 – Present</div>
              </div>

              {/* Sub-domains */}
              <div className="space-y-3 text-xs sm:text-sm text-stone-700 pl-3 border-l-2 border-stone-200">
                <div>
                  <div className="font-semibold text-stone-800 mb-1">Knowledge Capture & Documentation</div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-[13px]">
                    <li>Documented case studies and best practices on climate-adaptive agriculture and Nature-Based Solution (NbS) interventions to support organizational learning and scale-up.</li>
                    <li>Prepared crop-cut reports, cost-benefit analyses, and project documentation to ensure accountability to donor and programme requirements.</li>
                    <li>Developed training materials and knowledge products on climate-smart agriculture and agroforestry techniques for programme participants and partners.</li>
                    <li>Maintained field-level documentation and records to support accessible, quality knowledge repositories.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-stone-800 mb-1">Monitoring, Learning & Data Management (MEAL)</div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-[13px]">
                    <li>Established M&E frameworks to track carbon sequestration, biodiversity gains, and farmer income impacts across a <strong>122-hectare intervention area</strong>.</li>
                    <li>Collected and analyzed field data using GIS/remote sensing tools to assess land-use change and monitor project progress.</li>
                    <li>Prepared impact reports and dashboards for donors, government bodies, and internal stakeholders.</li>
                    <li>Conducted regular monitoring visits and field-level verification exercises to assess implementation quality and ensure timely, reliable data for decision-making.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-stone-800 mb-1">Capacity Building & Knowledge Sharing</div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-[13px]">
                    <li>Designed and delivered training, orientation, and refresher sessions that built the capacity of <strong>150+ smallholder farmers</strong> in climate-smart agriculture and agroforestry techniques.</li>
                    <li>Facilitated knowledge exchange platforms connecting farmers, researchers, and policymakers.</li>
                    <li>Conducted community consultations and needs assessments to co-design locally appropriate, evidence-based interventions.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-stone-800 mb-1">Communication & Dissemination</div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-[13px]">
                    <li>Disseminated modern agricultural technologies and project learning at the farmer-field level to strengthen community resilience and food security.</li>
                    <li>Represented the organization at climate innovation forums, workshops, and policy dialogues, promoting visibility of project lessons and achievements.</li>
                    <li>Liaised with government agencies, NGOs, and research institutions to align project outcomes with national climate policies.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Role 2: EDS */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <span>Supervisor</span>
                    <span className="text-xs font-normal text-stone-500">· Education for Development and Sustainability (EDS)</span>
                  </h3>
                  <div className="text-xs text-amber-900 font-medium">Khulna, Bangladesh</div>
                </div>
                <div className="text-xs text-stone-500 font-mono font-semibold">June 2022 – April 2024</div>
              </div>

              <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-[13px]">
                <li>Developed and maintained qualitative and quantitative programme documentation to support organizational learning and reporting.</li>
                <li>Led community mobilization and stakeholder engagement, facilitating regular meetings with guardians, students, and community leaders.</li>
                <li>Conducted monitoring field visits and follow-up for programme participants, identifying barriers and documenting tailored advisory support for sustainable livelihoods.</li>
                <li>Monitored income-generating activities and documented outcomes of a spice manufacturing programme benefiting 30+ community members.</li>
                <li>Coordinated with board members and authority figures to ensure programme goals were met in a timely, effective manner.</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-800" />
              <span>Academic Education</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 text-stone-500 text-xs uppercase font-semibold">
                    <th className="py-2 pr-4">Degree</th>
                    <th className="py-2 pr-4">Institution</th>
                    <th className="py-2 pr-4">CGPA / GPA</th>
                    <th className="py-2 text-right">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800">
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold">M.Sc. in Horticulture</td>
                    <td className="py-2.5 pr-4">Khulna University</td>
                    <td className="py-2.5 pr-4 font-mono font-bold text-amber-900">3.55</td>
                    <td className="py-2.5 text-right font-mono">2024</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold">B.Sc. (Hons.) in Agriculture</td>
                    <td className="py-2.5 pr-4">Patuakhali Science and Technology University (PSTU)</td>
                    <td className="py-2.5 pr-4 font-mono font-bold text-amber-900">3.375</td>
                    <td className="py-2.5 text-right font-mono">2020</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4">HSC (Science)</td>
                    <td className="py-2.5 pr-4">Jashore Board</td>
                    <td className="py-2.5 pr-4 font-mono">5.00</td>
                    <td className="py-2.5 text-right font-mono">2016</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4">SSC (Science)</td>
                    <td className="py-2.5 pr-4">Jashore Board</td>
                    <td className="py-2.5 pr-4 font-mono">5.00</td>
                    <td className="py-2.5 text-right font-mono">2014</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Relevant Training & Capacity Development */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-800" />
              <span>Specialized Training & Professional Development</span>
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Building climate resilience through ecosystem-based adaptation planning (UN:CC e-learning platform)</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Field-level monitoring, evaluation, and reporting for development programmes</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Agricultural technology dissemination and climate-smart farming practices (BRAC, ongoing)</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Capacity building facilitation for community-based organizations</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Certificate on tips & tricks of effective public speaking (BRAC Learning Academy)</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Spice manufacturing and income-generating activity management (EDS, 2015–2020)</span>
              </li>
            </ul>
          </section>

          {/* References */}
          <section className="space-y-3 pt-2">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-800" />
              <span>Professional & Academic References</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1.5 text-xs">
                <div className="font-bold text-sm text-stone-900">Md. Matiul Islam</div>
                <div className="text-stone-600 font-medium">Professor, Agrotechnology Discipline</div>
                <div className="text-stone-500">Khulna University</div>
                <div className="pt-1 space-y-0.5 text-stone-600 font-mono">
                  <div>📞 01717015074</div>
                  <div>✉️ matiul@at.ku.ac.bd</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1.5 text-xs">
                <div className="font-bold text-sm text-stone-900">Md. Kamal Hossain</div>
                <div className="text-stone-600 font-medium">Interim Coordinator, CCDB Climate Centre</div>
                <div className="text-stone-500">CCDB Climate Centre</div>
                <div className="pt-1 space-y-0.5 text-stone-600 font-mono">
                  <div>📞 01792588619</div>
                  <div>✉️ jonykamal@gmail.com</div>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
