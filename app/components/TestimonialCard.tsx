import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}

export default function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <div className="relative p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
      {/* Decorative quote mark */}
      <span className="absolute top-2 left-4 text-7xl font-serif text-muted/30 leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-primary/20">
        &ldquo;
      </span>
      
      <div className="relative z-10">
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
          "{quote}"
        </p>
        
        <div className="flex items-center gap-4">
          {avatar ? (
            <img 
              src={avatar} 
              alt={author} 
              className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-background" 
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-sm flex-shrink-0 ring-2 ring-background" />
          )}
          
          <div className="flex flex-col">
            <span className="text-foreground font-semibold">{author}</span>
            {role && <span className="text-sm text-muted-foreground">{role}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
