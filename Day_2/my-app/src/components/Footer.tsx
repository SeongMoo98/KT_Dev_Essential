export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">나의 Next.js 웹사이트</h3>
            <p className="text-gray-300 text-sm">
              React와 Next.js를 학습하며 만든 개인 웹사이트입니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  홈
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white">
                  소개
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-300 hover:text-white">
                  좋아하는 것
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  연락처
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">기술 스택</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Next.js 14</li>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 나의 Next.js 웹사이트. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 