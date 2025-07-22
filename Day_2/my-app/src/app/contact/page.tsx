import ContactCard from "@/components/ContactCard";

export default function Contact() {
  const contactInfo = [
    {
      icon: "📧",
      title: "이메일",
      content: "example@email.com",
      bgColor: "bg-blue-500"
    },
    {
      icon: "🐙",
      title: "GitHub",
      content: "github.com",
      link: "https://github.com",
      bgColor: "bg-gray-800"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      content: "linkedin.com",
      link: "https://linkedin.com",
      bgColor: "bg-green-500"
    },
    {
      icon: "📱",
      title: "전화번호",
      content: "010-1234-5678",
      bgColor: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          연락처
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">연락 방법</h2>
          
          <div className="space-y-6">
            {contactInfo.map((contact, index) => (
              <ContactCard
                key={index}
                icon={contact.icon}
                title={contact.title}
                content={contact.content}
                link={contact.link}
                bgColor={contact.bgColor}
              />
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">메시지 보내기</h3>
            <p className="text-gray-600 text-sm">
              궁금한 점이나 협업 제안이 있으시면 언제든 연락주세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 