'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function IPhoneDetails() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-black'
      }`}>
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl">🍎</Link>
              <Link href="/" className="text-sm text-gray-300 hover:text-white">← 돌아가기</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-12">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <Image
            src="/images/iPhone.jpg"
            alt="iPhone 15 Pro"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="text-center text-white z-10 max-w-4xl mx-auto px-4 relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">iPhone 15 Pro</h1>
            <p className="text-3xl md:text-4xl text-gray-300 mb-8">티타늄. 매우 강력한 칩. Pro 카메라 시스템.</p>
            <p className="text-xl text-gray-400 mb-12">₩1,550,000부터</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/iphone-purchase" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                구매하기
              </Link>
              <Link 
                href="/" 
                className="text-blue-500 hover:text-blue-400 text-lg font-semibold"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center text-white">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-3xl font-bold mb-4">A17 Pro 칩</h3>
                <p className="text-xl text-gray-300">3나노미터 공정으로 제작된 가장 강력한 칩. 게임과 앱의 성능을 한 차원 높여줍니다.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl mb-6">📸</div>
                <h3 className="text-3xl font-bold mb-4">Pro 카메라 시스템</h3>
                <p className="text-xl text-gray-300">48MP 메인 카메라, 초광각, 망원 카메라로 전문가급 사진과 영상을 촬영하세요.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl mb-6">✨</div>
                <h3 className="text-3xl font-bold mb-4">티타늄 디자인</h3>
                <p className="text-xl text-gray-300">항공우주급 티타늄으로 제작된 경이로운 디자인. 가볍고 강하며 아름답습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-white text-center mb-16">기술 사양</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-black rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">디스플레이</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>6.1인치 Super Retina XDR 디스플레이</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>2556 x 1179 픽셀 해상도, 460 ppi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>ProMotion 120Hz 적응형 새로고침</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>Always-On 디스플레이</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>HDR 디스플레이</span>
                  </li>
                </ul>
              </div>
              <div className="bg-black rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">카메라</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>48MP 메인 카메라 (ƒ/1.78 조리개)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>12MP 초광각 카메라 (ƒ/2.2 조리개)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>12MP 망원 카메라 (3배 광학 줌, ƒ/2.8 조리개)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>12MP TrueDepth 전면 카메라</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>Cinematic 모드, ProRAW, ProRes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-white mb-16">
              <h2 className="text-5xl font-bold mb-6">성능</h2>
              <p className="text-2xl text-gray-300">A17 Pro 칩이 모든 것을 가능하게 합니다</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">3.78GHz</div>
                <p className="text-gray-300">최대 클럭 속도</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">6코어</div>
                <p className="text-gray-300">CPU</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">6코어</div>
                <p className="text-gray-300">GPU</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">16코어</div>
                <p className="text-gray-300">Neural Engine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-white text-center mb-16">색상</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white">네추럴 티타늄</h3>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white">블루 티타늄</h3>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white">화이트 티타늄</h3>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white">블랙 티타늄</h3>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-white mb-8">iPhone 15 Pro를 경험해보세요</h2>
            <p className="text-2xl text-gray-300 mb-12">지금 구매하고 새로운 차원의 경험을 시작하세요</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/iphone-purchase" 
                className="bg-blue-600 text-white px-12 py-6 rounded-full hover:bg-blue-700 transition-colors text-xl font-semibold"
              >
                구매하기
              </Link>
              <Link 
                href="/" 
                className="bg-gray-800 text-white px-12 py-6 rounded-full hover:bg-gray-700 transition-colors text-xl font-semibold"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 