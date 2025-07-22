import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">나의 Next.js 웹사이트</h1>
          <nav className="flex space-x-6">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              홈
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              소개
            </Link>
            <Link 
              href="/favorites" 
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              좋아하는 것
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              연락처
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 