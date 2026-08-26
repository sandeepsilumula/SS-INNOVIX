'use client';

import React from 'react';

interface CaseStudyHoverProps {
  image: string;
  title: string;
  desc: string;
  badge: string;
}

const CaseStudyHover: React.FC<CaseStudyHoverProps> = ({
  image,
  title,
  desc,
  badge,
}) => {
  const techTags = ['React', 'Node.js', 'PostgreSQL'];

  return (
    <article className="group relative overflow-hidden bg-charcoal border border-graphite transition-all duration-300 hover:border-lamp-cream/30">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            filter: 'grayscale(0.8) contrast(1.1)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Badge */}
        <span
          className="inline-block px-3 py-1 text-xs font-mono tracking-[0.05em] text-lamp-cream border border-lamp-cream/30 mb-4"
        >
          {badge}
        </span>

        {/* Title with serif accent on brand name */}
        <h3 className="text-lg font-sans font-medium text-white mb-2 tracking-[-0.02em]">
          {title.split(' — ').map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && ' — '}
              {i === 0 ? <span className="italic text-white font-normal">{part}</span> : part}
            </React.Fragment>
          ))}
        </h3>

        {/* Description */}
        <p className="text-sm font-sans font-medium text-gray-300 mb-4">
          {desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 text-xs font-mono tracking-[0.05em] text-gray-300 border border-gray-700 transition-colors hover:border-lamp-cream/30 hover:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default CaseStudyHover;
