interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  avatar?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export default function ProfileCard({ 
  name, 
  title, 
  description, 
  avatar, 
  skills = [], 
  socialLinks = {} 
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        {description}
      </p>
      
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {(socialLinks.github || socialLinks.linkedin || socialLinks.email) && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">연락처</h3>
          <div className="flex space-x-4">
            {socialLinks.github && (
              <a 
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-xl">🐙</span>
                <span className="ml-1 text-sm">GitHub</span>
              </a>
            )}
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-xl">💼</span>
                <span className="ml-1 text-sm">LinkedIn</span>
              </a>
            )}
            {socialLinks.email && (
              <a 
                href={`mailto:${socialLinks.email}`}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-xl">📧</span>
                <span className="ml-1 text-sm">Email</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 