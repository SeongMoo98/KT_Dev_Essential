import ProfileCard from "@/components/ProfileCard";

export default function About() {
  const profileData = {
    name: "김개발",
    title: "Frontend Developer",
    description: "안녕하세요! 저는 Next.js와 React를 공부하고 있는 개발자입니다. 현재 useState, 라우팅 등 React의 기본 개념들을 학습하고 있으며, 이 웹사이트는 Next.js App Router를 사용하여 만들어졌습니다. 사용자 경험을 중요시하며, 깔끔하고 효율적인 코드 작성을 지향합니다.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "example@email.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          소개 페이지입니다
        </h1>
        
        <ProfileCard {...profileData} />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">추가 정보</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-800">🎯 목표</h3>
              <p className="text-gray-700">
                사용자 친화적인 웹 애플리케이션을 개발하고, 
                최신 기술 트렌드를 학습하여 더 나은 개발자가 되고자 합니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-800">📚 학습 중</h3>
              <p className="text-gray-700">
                React Hooks, Next.js App Router, TypeScript, 
                그리고 다양한 상태 관리 라이브러리들을 학습하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 