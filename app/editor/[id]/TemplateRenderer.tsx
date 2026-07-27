import React from 'react';

type Experience = { id: string; company: string; title: string; date: string; description: string; };
type Education = { id: string; school: string; degree: string; date: string; };
type Personal = { name: string; title: string; email: string; phone: string; website: string; address: string; summary: string; };

interface TemplateProps {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  skills: string;
}

// 1. Modern Professional Template
const ModernProfessional = ({ personal, experience, education, skills }: TemplateProps) => (
  <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-sm text-gray-900 min-h-[1131px] font-sans">
    <div className="bg-slate-900 text-white pt-14 px-14 pb-12 flex flex-col items-center text-center">
      <h1 className="text-[2.5rem] font-bold tracking-tight mb-2 uppercase">{personal.name || "Your Name"}</h1>
      <div className="text-lg font-medium text-slate-300 mb-6 tracking-widest uppercase">{personal.title || "Professional Title"}</div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.address && <span>{personal.address}</span>}
        {personal.website && <span>{personal.website}</span>}
      </div>
    </div>
    
    <div className="px-14 py-10 space-y-8">
      {personal.summary && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 mb-4 pb-2 uppercase tracking-wider">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">{personal.summary}</p>
        </section>
      )}
      
      {experience.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 mb-5 pb-2 uppercase tracking-wider">Experience</h2>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-slate-900">{exp.title || "Job Title"}</h3>
                  <span className="text-sm font-semibold text-slate-500 shrink-0 ml-4">{exp.date || "Date"}</span>
                </div>
                <div className="text-sm text-indigo-600 font-bold mb-2 uppercase tracking-wide">{exp.company || "Company Name"}</div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-4 -indent-4">
                  {exp.description || "• Your job responsibilities and achievements."}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 mb-5 pb-2 uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{edu.school || "School Name"}</h3>
                  <div className="text-sm text-gray-700 mt-1">{edu.degree || "Degree"}</div>
                </div>
                <span className="text-sm font-semibold text-slate-500 shrink-0 ml-4">{edu.date || "Date"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 mb-4 pb-2 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.split(',').map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-full border border-slate-200">
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

// 2. Creative Template
const CreativeEdge = ({ personal, experience, education, skills }: TemplateProps) => (
  <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-sm text-gray-800 min-h-[1131px] font-sans flex">
    {/* Left Sidebar */}
    <div className="w-1/3 bg-teal-800 text-teal-50 px-8 py-12 flex flex-col">
      <div className="w-32 h-32 bg-teal-700 rounded-full mb-8 self-center border-4 border-teal-500 flex items-center justify-center text-4xl font-bold text-teal-300 uppercase">
        {personal.name ? personal.name.charAt(0) : "N"}
      </div>
      
      <section className="mb-8">
        <h2 className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-4 border-b border-teal-600 pb-2">Contact</h2>
        <div className="space-y-3 text-sm">
          {personal.phone && <div>{personal.phone}</div>}
          {personal.email && <div className="break-all">{personal.email}</div>}
          {personal.address && <div>{personal.address}</div>}
          {personal.website && <div>{personal.website}</div>}
        </div>
      </section>

      {skills && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-4 border-b border-teal-600 pb-2">Expertise</h2>
          <ul className="space-y-2 text-sm">
            {skills.split(',').map((skill, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                {skill.trim()}
              </li>
            ))}
          </ul>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-4 border-b border-teal-600 pb-2">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <h3 className="text-sm font-bold text-white">{edu.school || "School Name"}</h3>
                <div className="text-xs text-teal-200 mt-1">{edu.degree || "Degree"}</div>
                <div className="text-xs text-teal-400 mt-1">{edu.date || "Date"}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>

    {/* Right Main Content */}
    <div className="w-2/3 px-10 py-12 bg-gray-50">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2 uppercase tracking-tighter leading-none">{personal.name || "Your Name"}</h1>
        <div className="text-xl font-medium text-teal-600 tracking-wide uppercase">{personal.title || "Professional Title"}</div>
      </header>

      {personal.summary && (
        <section className="mb-10">
          <p className="text-sm text-gray-600 leading-relaxed font-medium text-justify">{personal.summary}</p>
        </section>
      )}
      
      {experience.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-teal-100 text-teal-600 flex items-center justify-center rounded-full text-lg">★</span>
            EXPERIENCE
          </h2>
          <div className="space-y-8 border-l-2 border-teal-100 ml-4 pl-6 relative">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative">
                <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[1.95rem] top-1.5 border-4 border-gray-50"></div>
                <div className="text-xs font-bold text-teal-600 mb-1">{exp.date || "Date"}</div>
                <h3 className="text-lg font-bold text-gray-900">{exp.title || "Job Title"}</h3>
                <div className="text-sm text-gray-500 font-semibold mb-3">{exp.company || "Company Name"}</div>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {exp.description || "• Your job responsibilities and achievements."}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

// 3. Minimal / Standard Template (The previous default one)
const MinimalStandard = ({ personal, experience, education, skills }: TemplateProps) => (
  <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-sm text-black min-h-[1131px]">
    <div className="pt-14 px-14 pb-8 border-b-2 border-gray-800 flex flex-col items-center text-center">
      <h1 className="text-[2.5rem] font-serif text-gray-900 mb-2 uppercase tracking-widest leading-none">
        {personal.name || "Your Name"}
      </h1>
      <div className="text-lg font-medium text-indigo-600 mb-4 tracking-wider uppercase">
        {personal.title || "Professional Title"}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-gray-600 font-medium font-sans">
        {personal.email && <span>{personal.email}</span>}
        {personal.email && personal.phone && <span>•</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.phone && (personal.address || personal.website) && <span>•</span>}
        {personal.address && <span>{personal.address}</span>}
        {personal.address && personal.website && <span>•</span>}
        {personal.website && <span className="text-indigo-600">{personal.website}</span>}
      </div>
    </div>
    
    <div className="px-14 py-8 space-y-7">
      {personal.summary && (
        <section>
          <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 mb-3 pb-1.5 uppercase tracking-[0.2em]">Profile</h2>
          <p className="text-[13px] text-gray-700 leading-[1.7] text-justify font-sans">
            {personal.summary}
          </p>
        </section>
      )}
      
      {experience.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 mb-4 pb-1.5 uppercase tracking-[0.2em]">Experience</h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1 font-sans">
                  <h3 className="text-[14px] font-bold text-gray-900">{exp.title || "Job Title"}</h3>
                  <span className="text-[13px] font-semibold text-indigo-600 shrink-0 ml-4">{exp.date || "Date"}</span>
                </div>
                <div className="text-[13px] text-gray-600 font-bold mb-2 uppercase tracking-wide">{exp.company || "Company Name"}</div>
                <div className="text-[13px] text-gray-700 leading-[1.6] whitespace-pre-line pl-4 -indent-4 font-sans">
                  {exp.description || "• Your job responsibilities and achievements."}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 mb-4 pb-1.5 uppercase tracking-[0.2em]">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start font-sans">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900">{edu.school || "School Name"}</h3>
                  <div className="text-[13px] text-gray-700 mt-0.5">{edu.degree || "Degree"}</div>
                </div>
                <span className="text-[13px] font-semibold text-indigo-600 shrink-0 ml-4">{edu.date || "Date"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && (
        <section>
          <h2 className="text-sm font-bold text-gray-800 border-b-2 border-gray-200 mb-3 pb-1.5 uppercase tracking-[0.2em]">Skills</h2>
          <p className="text-[13px] text-gray-700 leading-[1.7] font-sans">
            {skills.split(',').map((skill, index, array) => (
              <span key={index}>
                <span className="font-semibold text-gray-800">{skill.trim()}</span>
                {index < array.length - 1 && <span className="text-gray-400 mx-1.5">•</span>}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  </div>
);


export default function TemplateRenderer({ templateId, ...props }: TemplateProps & { templateId: string }) {
  // Map template IDs to the specific design
  if (templateId === "modern-professional" || templateId === "executive-pro") {
    return <ModernProfessional {...props} />;
  }
  
  if (templateId.includes("creative")) {
    return <CreativeEdge {...props} />;
  }
  
  // Default fallback (Minimal, Academic, Tech Innovator, etc)
  return <MinimalStandard {...props} />;
}
