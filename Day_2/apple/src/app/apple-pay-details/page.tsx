'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ApplePayDetails() {
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
            src="/images/apple pay.jpg"
            alt="Apple Pay"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="text-center text-white z-10 max-w-4xl mx-auto px-4 relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">Apple Pay</h1>
            <p className="text-3xl md:text-4xl text-gray-300 mb-8">간편하고 안전한 결제의 새로운 표준</p>
            <p className="text-xl text-gray-400 mb-12">Face ID, Touch ID 또는 암호로 보호되는 안전한 결제</p>
            <div className="flex justify-center">
              <Link 
                href="/" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold"
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
                <div className="text-6xl mb-6">🔒</div>
                <h3 className="text-3xl font-bold mb-4">보안</h3>
                <p className="text-xl text-gray-300">Face ID, Touch ID 또는 암호로 보호되는 안전한 결제. 실제 카드 번호는 저장되지 않습니다.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl mb-6">⚡</div>
                <h3 className="text-3xl font-bold mb-4">빠른 결제</h3>
                <p className="text-xl text-gray-300">한 번의 터치로 즉시 결제 완료. 카드를 꺼낼 필요 없이 간편하게 결제하세요.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl mb-6">🌍</div>
                <h3 className="text-3xl font-bold mb-4">전 세계 사용</h3>
                <p className="text-xl text-gray-300">전 세계 수백만 곳의 매장에서 사용 가능. 온라인 쇼핑에서도 안전하게 결제하세요.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-white text-center mb-16">사용 방법</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center text-white">
                <div className="text-6xl font-bold text-blue-500 mb-4">1</div>
                <h3 className="text-2xl font-bold mb-4">카드 추가</h3>
                <p className="text-gray-300">Wallet 앱에서 신용카드나 직불카드를 추가하세요. 카드 정보는 안전하게 암호화됩니다.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl font-bold text-blue-500 mb-4">2</div>
                <h3 className="text-2xl font-bold mb-4">결제 준비</h3>
                <p className="text-gray-300">매장에서 Apple Pay를 지원하는 결제 단말기를 찾으세요. NFC 로고가 있는 곳에서 사용 가능합니다.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl font-bold text-blue-500 mb-4">3</div>
                <h3 className="text-2xl font-bold mb-4">결제 실행</h3>
                <p className="text-gray-300">iPhone을 단말기에 가져다 대고 Face ID 또는 Touch ID로 인증하세요. 간단하고 빠릅니다.</p>
              </div>
              <div className="text-center text-white">
                <div className="text-6xl font-bold text-blue-500 mb-4">4</div>
                <h3 className="text-2xl font-bold mb-4">완료</h3>
                <p className="text-gray-300">결제가 완료되면 확인 메시지가 표시됩니다. 모든 거래 내역을 Wallet 앱에서 확인할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Devices Section */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-white text-center mb-16">지원 기기</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-2">iPhone</h3>
                <p className="text-gray-300">iPhone 6 이후 모델</p>
                <ul className="text-sm text-gray-400 mt-4 space-y-1">
                  <li>• iPhone 15 시리즈</li>
                  <li>• iPhone 14 시리즈</li>
                  <li>• iPhone 13 시리즈</li>
                  <li>• iPhone 12 시리즈</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">⌚</div>
                <h3 className="text-2xl font-bold mb-2">Apple Watch</h3>
                <p className="text-gray-300">모든 Apple Watch 모델</p>
                <ul className="text-sm text-gray-400 mt-4 space-y-1">
                  <li>• Apple Watch Series 9</li>
                  <li>• Apple Watch SE</li>
                  <li>• Apple Watch Ultra 2</li>
                  <li>• Apple Watch Nike</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">💻</div>
                <h3 className="text-2xl font-bold mb-2">Mac</h3>
                <p className="text-gray-300">Touch ID가 있는 Mac</p>
                <ul className="text-sm text-gray-400 mt-4 space-y-1">
                  <li>• MacBook Air</li>
                  <li>• MacBook Pro</li>
                  <li>• iMac</li>
                  <li>• Mac mini</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center text-white hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-2">iPad</h3>
                <p className="text-gray-300">Touch ID 또는 Face ID가 있는 iPad</p>
                <ul className="text-sm text-gray-400 mt-4 space-y-1">
                  <li>• iPad Pro</li>
                  <li>• iPad Air</li>
                  <li>• iPad</li>
                  <li>• iPad mini</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-white text-center mb-16">보안 기능</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-black rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-white mb-6">토큰화</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>실제 카드 번호는 저장되지 않습니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>고유한 디바이스 계정 번호를 사용합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>각 거래마다 고유한 보안 코드를 생성합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>Apple은 결제 정보를 저장하지 않습니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>은행 수준의 보안으로 보호됩니다</span>
                  </li>
                </ul>
              </div>
              <div className="bg-black rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-white mb-6">생체 인증</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>Face ID 또는 Touch ID로 결제를 인증합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>암호를 통한 추가 보안을 제공합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>디바이스가 잠겨있으면 결제가 불가능합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>매번 새로운 보안 코드를 생성합니다</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>실시간 사기 탐지 시스템</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Transit Section */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-white mb-16">
              <h2 className="text-5xl font-bold mb-6">대중교통에서도 Apple Pay</h2>
              <p className="text-2xl text-gray-300">지하철, 버스, 기차에서도 간편하게 결제하세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center">
                <div className="text-5xl mb-4">🚇</div>
                <h3 className="text-2xl font-bold text-white mb-4">지하철</h3>
                <p className="text-gray-300">게이트를 통과할 때 iPhone을 가져다 대기만 하면 됩니다</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center">
                <div className="text-5xl mb-4">🚌</div>
                <h3 className="text-2xl font-bold text-white mb-4">버스</h3>
                <p className="text-gray-300">버스 승차 시 카드 단말기에 iPhone을 터치하세요</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center">
                <div className="text-5xl mb-4">🚄</div>
                <h3 className="text-2xl font-bold text-white mb-4">기차</h3>
                <p className="text-gray-300">기차역에서도 Apple Pay로 간편하게 결제하세요</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Apple Pay를 시작해보세요</h2>
            <p className="text-2xl text-gray-300 mb-12">지금 설정하고 더 간편하고 안전한 결제를 경험하세요</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-blue-600 text-white px-12 py-6 rounded-full hover:bg-blue-700 transition-colors text-xl font-semibold">
                설정하기
              </button>
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