import Badge from './Badge';

interface CaseStudyCardProps {
  imageUrl: string;
  title: string;
  description: string;
  techStack: string[];
}

export default function CaseStudyCard({
  imageUrl,
  title,
  description,
  techStack,
}: CaseStudyCardProps) {
  return (
    <div className="group border border-graphite bg-charcoal overflow-hidden transition-all duration-500 hover:border-lamp-cream/30">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-white mb-2 tracking-[-0.01em] font-sans">
          {title}
        </h3>
        <p className="font-body-md text-gray-300 leading-relaxed mb-5">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}