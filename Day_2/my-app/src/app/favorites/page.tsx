import ProfileCard from "@/components/ProfileCard";

export default function Favorites() {
  const userProfile = {
    name: "김개발",
    title: "취미가 많은 개발자",
    description: "코딩뿐만 아니라 다양한 취미를 가지고 있는 개발자입니다. 음악, 음식, 게임, 여행 등 다양한 분야에 관심이 많아서 항상 새로운 것을 배우고 있습니다.",
    skills: ["음악 감상", "요리", "게임", "여행", "독서"],
    socialLinks: {
      github: "https://github.com",
      email: "example@email.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          좋아하는 것들
        </h1>
        
        <ProfileCard {...userProfile} />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">내가 좋아하는 것들</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-600">🎵 음악</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>K-pop</li>
                <li>Jazz</li>
                <li>Classical</li>
                <li>Indie</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-600">🍕 음식</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>피자</li>
                <li>파스타</li>
                <li>초밥</li>
                <li>커피</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-600">🎮 취미</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>코딩</li>
                <li>게임</li>
                <li>독서</li>
                <li>여행</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-orange-600">💻 기술</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 