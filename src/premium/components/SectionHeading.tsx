'use client';

interface Props {
  eyebrow?: string;
  title: string;
  emotion?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionHeading({
  eyebrow,
  title,
  emotion,
  className = '',
  align = 'left',
}: Props) {
  const alignments = { left: 'text-left', center: 'text-center', right: 'text-right' };
  const titleHtml = emotion
    ? title.replace(
        emotion,
        `<em className="font-canela text-lamp-cream not-italic">${emotion}</em>`
      )
    : title;

  return (
    <div className={`mb-12 lg:mb-16 ${alignments[align]} ${className}`}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-wider uppercase text-smoke mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className="font-visuelt font-light text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-pure-white"
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
    </div>
  );
}