'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function IPhonePurchase() {
  const [selectedModel, setSelectedModel] = useState('iPhone 15 Pro');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [selectedColor, setSelectedColor] = useState('네추럴 티타늄');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const models = [
    { name: 'iPhone 15 Pro', price: '1,550,000원', description: '티타늄. 매우 강력한 칩. Pro 카메라 시스템.' },
    { name: 'iPhone 15 Pro Max', price: '1,750,000원', description: '더 큰 화면. 더 강력한 성능.' },
    { name: 'iPhone 15', price: '1,250,000원', description: '새로운 차원의 사진 촬영.' },
    { name: 'iPhone 15 Plus', price: '1,350,000원', description: '더 큰 화면으로 더 많은 것을.' }
  ];

  const storageOptions = [
    { size: '128GB', price: '0원' },
    { size: '256GB', price: '+200,000원' },
    { size: '512GB', price: '+400,000원' },
    { size: '1TB', price: '+600,000원' }
  ];

  const colorOptions = [
    { name: '네추럴 티타늄', color: 'from-gray-300 to-gray-400' },
    { name: '블루 티타늄', color: 'from-blue-400 to-blue-600' },
    { name: '화이트 티타늄', color: 'from-gray-100 to-gray-200' },
    { name: '블랙 티타늄', color: 'from-gray-700 to-gray-900' }
  ];

  const getBasePrice = () => {
    const model = models.find(m => m.name === selectedModel);
    return model ? parseInt(model.price.replace(/[^0-9]/g, '')) : 1550000;
  };

  const getStoragePrice = () => {
    const storage = storageOptions.find(s => s.size === selectedStorage);
    return storage ? parseInt(storage.price.replace(/[^0-9]/g, '') || '0') : 0;
  };

  const totalPrice = getBasePrice() + getStoragePrice();

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
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-300 hover:text-white">🛒</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-12">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <Image
            src="/images/purchase.jpg"
            alt="iPhone Purchase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="text-center text-white z-10 max-w-4xl mx-auto px-4 relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">iPhone 구매</h1>
            <p className="text-3xl md:text-4xl text-gray-300 mb-8">당신에게 맞는 iPhone을 선택하세요</p>
            <p className="text-xl text-gray-400">무료 배송 및 Apple Trade In으로 더 저렴하게</p>
          </div>
        </section>

        {/* Product Selection */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Model Selection */}
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-white mb-8">모델 선택</h2>
                <div className="space-y-6">
                  {models.map((model) => (
                    <div
                      key={model.name}
                      className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedModel === model.name
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                      }`}
                      onClick={() => setSelectedModel(model.name)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{model.name}</h3>
                          <p className="text-gray-300">{model.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{model.price}</p>
                          <p className="text-gray-400">시작가</p>
                        </div>
                      </div>
                      {selectedModel === model.name && (
                        <div className="bg-blue-500/20 rounded-2xl p-4">
                          <p className="text-blue-300 text-sm">✓ 선택됨</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-8">
                {/* Storage Selection */}
                <div className="bg-gray-900 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">저장 용량</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {storageOptions.map((storage) => (
                      <button
                        key={storage.size}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedStorage === storage.size
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-gray-700 hover:border-gray-600 bg-gray-800 text-gray-300 hover:text-white'
                        }`}
                        onClick={() => setSelectedStorage(storage.size)}
                      >
                        <div className="font-semibold text-lg">{storage.size}</div>
                        <div className="text-sm opacity-75">{storage.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="bg-gray-900 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">색상</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {colorOptions.map((color) => (
                      <button
                        key={color.name}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedColor === color.name
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                        }`}
                        onClick={() => setSelectedColor(color.name)}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${color.color} rounded-full mx-auto mb-2`}></div>
                        <span className="font-semibold text-white text-sm">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-black rounded-3xl p-8">
              <h2 className="text-4xl font-bold text-white text-center mb-8">주문 요약</h2>
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-gray-700">
                  <span className="text-xl text-gray-300">모델:</span>
                  <span className="text-xl font-semibold text-white">{selectedModel}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-700">
                  <span className="text-xl text-gray-300">저장 용량:</span>
                  <span className="text-xl font-semibold text-white">{selectedStorage}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-700">
                  <span className="text-xl text-gray-300">색상:</span>
                  <span className="text-xl font-semibold text-white">{selectedColor}</span>
                </div>
                <div className="flex justify-between items-center py-6 bg-blue-500/10 rounded-2xl px-6">
                  <span className="text-2xl font-bold text-white">총 가격:</span>
                  <span className="text-3xl font-bold text-blue-500">₩{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-blue-600 text-white px-12 py-6 rounded-full hover:bg-blue-700 transition-colors text-xl font-semibold">
                  구매하기
                </button>
                <Link 
                  href="/" 
                  className="bg-gray-800 text-white px-12 py-6 rounded-full hover:bg-gray-700 transition-colors text-xl font-semibold text-center"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">구매 혜택</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center text-white">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="text-2xl font-bold mb-4">무료 배송</h3>
                <p className="text-gray-300">모든 iPhone 주문에 무료 배송이 포함됩니다</p>
              </div>
              <div className="text-center text-white">
                <div className="text-5xl mb-4">🔄</div>
                <h3 className="text-2xl font-bold mb-4">Apple Trade In</h3>
                <p className="text-gray-300">기존 기기를 교환하여 더 저렴하게 구매하세요</p>
              </div>
              <div className="text-center text-white">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-2xl font-bold mb-4">AppleCare+</h3>
                <p className="text-gray-300">추가 보호 및 지원을 위한 AppleCare+ 추가</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 