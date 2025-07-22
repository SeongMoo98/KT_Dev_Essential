interface ContactCardProps {
  icon: string;
  title: string;
  content: string;
  link?: string;
  bgColor: string;
}

export default function ContactCard({ icon, title, content, link, bgColor }: ContactCardProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
        <span className="text-white font-bold">{icon}</span>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {content}
          </a>
        ) : (
          <p className="text-gray-600">{content}</p>
        )}
      </div>
    </div>
  );
} 