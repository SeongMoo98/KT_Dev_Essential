'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: '스토어',
      subItems: ['스토어 찾기', '온라인 스토어', 'Apple Store 앱', '재고 확인', 'Apple Trade In', '금융 혜택']
    },
    {
      name: 'Mac',
      subItems: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Studio', 'Mac Pro', '모니터']
    },
    {
      name: 'iPad',
      subItems: ['iPad Pro', 'iPad Air', 'iPad', 'iPad mini', 'Apple Pencil', 'Magic Keyboard']
    },
    {
      name: 'iPhone',
      subItems: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone SE', '비교하기']
    },
    {
      name: 'Watch',
      subItems: ['Apple Watch Series 9', 'Apple Watch SE', 'Apple Watch Ultra 2', 'Apple Watch Nike', '비교하기']
    },
    {
      name: 'AirPods',
      subItems: ['AirPods Pro', 'AirPods', 'AirPods Max', '비교하기']
    },
    {
      name: 'TV 및 홈',
      subItems: ['Apple TV 4K', 'HomePod', 'HomePod mini', 'Apple TV 앱']
    },
    {
      name: '엔터테인먼트',
      subItems: ['Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcast']
    },
    {
      name: '액세서리',
      subItems: ['AirTag', 'Apple TV 리모컨', '케이블 및 도크', '케이스 및 보호장비']
    },
    {
      name: '고객지원',
      subItems: ['AppleCare+', 'Apple ID', 'iCloud', 'Apple Store 앱', 'Apple 지원']
    }
  ];

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
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button className="text-sm text-gray-300 hover:text-white transition-colors">
                    {category.name}
                  </button>
                  {hoveredCategory === category.name && (
                    <div className="absolute top-full left-0 bg-black/95 backdrop-blur-md text-white shadow-2xl rounded-lg p-4 min-w-48 z-50 border border-gray-800">
                      <ul className="space-y-2">
                        {category.subItems.map((item) => (
                          <li key={item}>
                            <Link href="#" className="text-sm hover:text-blue-400 transition-colors block py-1">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-300 hover:text-white">🔍</button>
              <button className="text-sm text-gray-300 hover:text-white">🛍️</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-12">
        {/* Hero Section - iPhone 15 Pro */}
        <section className="relative h-screen flex items-center justify-center">
          <Image
            src="/images/iPhone.jpg"
            alt="iPhone 15 Pro"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="text-center text-white z-10 relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPhone 15 Pro</h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">티타늄. 매우 강력한 칩. Pro 카메라 시스템.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/iphone-details" 
                className="text-blue-500 hover:text-blue-400 text-xl font-semibold"
              >
                더 알아보기 ›
              </Link>
              <Link 
                href="/iphone-purchase" 
                className="text-blue-500 hover:text-blue-400 text-xl font-semibold"
              >
                쇼핑하기 ›
              </Link>
            </div>
          </div>
        </section>

        {/* Apple Pay Section */}
        <section className="relative h-screen flex items-center justify-center">
          <Image
            src="/images/apple pay.jpg"
            alt="Apple Pay"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="text-center text-white z-10 relative">
            <h2 className="text-6xl md:text-8xl font-bold mb-4">Apple Pay</h2>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">간편하고 안전한 결제의 새로운 표준</p>
            <div className="flex justify-center">
              <Link 
                href="/apple-pay-details" 
                className="text-blue-500 hover:text-blue-400 text-xl font-semibold"
              >
                더 알아보기 ›
              </Link>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Mac */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">💻</div>
                <h3 className="text-3xl font-bold mb-2">Mac</h3>
                <p className="text-gray-300 mb-4">강력한 성능의 새로운 차원</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  더 알아보기 ›
                </Link>
              </div>

              {/* iPad */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-3xl font-bold mb-2">iPad</h3>
                <p className="text-gray-300 mb-4">창의성을 위한 완벽한 도구</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  더 알아보기 ›
                </Link>
              </div>

              {/* Watch */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">⌚</div>
                <h3 className="text-3xl font-bold mb-2">Watch</h3>
                <p className="text-gray-300 mb-4">건강한 삶을 위한 동반자</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  더 알아보기 ›
                </Link>
              </div>

              {/* AirPods */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">🎧</div>
                <h3 className="text-3xl font-bold mb-2">AirPods</h3>
                <p className="text-gray-300 mb-4">완벽한 사운드 경험</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  더 알아보기 ›
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-white text-center mb-16">Apple 서비스</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black rounded-3xl p-8 text-center text-white">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-2xl font-bold mb-4">Apple Music</h3>
                <p className="text-gray-300 mb-6">9천만 곡의 음악을 무제한으로 스트리밍</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  체험해보기 ›
                </Link>
              </div>
              <div className="bg-black rounded-3xl p-8 text-center text-white">
                <div className="text-5xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold mb-4">Apple Arcade</h3>
                <p className="text-gray-300 mb-6">200개 이상의 독점 게임을 광고 없이</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  체험해보기 ›
                </Link>
              </div>
              <div className="bg-black rounded-3xl p-8 text-center text-white">
                <div className="text-5xl mb-4">📺</div>
                <h3 className="text-2xl font-bold mb-4">Apple TV+</h3>
                <p className="text-gray-300 mb-6">Apple이 제작한 독점 오리지널 콘텐츠</p>
                <Link href="#" className="text-blue-500 hover:text-blue-400 font-semibold">
                  체험해보기 ›
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
              <div>
                <h4 className="text-white font-semibold mb-4">쇼핑 및 알아보기</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-white">스토어</Link></li>
                  <li><Link href="#" className="hover:text-white">Mac</Link></li>
                  <li><Link href="#" className="hover:text-white">iPad</Link></li>
                  <li><Link href="#" className="hover:text-white">iPhone</Link></li>
                  <li><Link href="#" className="hover:text-white">Watch</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">서비스</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-white">Apple Music</Link></li>
                  <li><Link href="#" className="hover:text-white">Apple TV+</Link></li>
                  <li><Link href="#" className="hover:text-white">Apple Arcade</Link></li>
                  <li><Link href="#" className="hover:text-white">iCloud</Link></li>
                  <li><Link href="#" className="hover:text-white">Apple One</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Apple Store</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-white">매장 찾기</Link></li>
                  <li><Link href="#" className="hover:text-white">Genius Bar</Link></li>
                  <li><Link href="#" className="hover:text-white">Today at Apple</Link></li>
                  <li><Link href="#" className="hover:text-white">Apple 캠프</Link></li>
                  <li><Link href="#" className="hover:text-white">Apple Store 앱</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">비즈니스</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-white">Apple과 비즈니스</Link></li>
                  <li><Link href="#" className="hover:text-white">비즈니스를 위한 쇼핑</Link></li>
                  <li><Link href="#" className="hover:text-white">교육</Link></li>
                  <li><Link href="#" className="hover:text-white">교육을 위한 쇼핑</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>Copyright © 2024 Apple Inc. 모든 권리 보유.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
