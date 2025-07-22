'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('회원가입이 완료되었습니다! 이제 로그인해 주세요.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage('로그인 성공! 리디렉션 중...');
        setTimeout(() => router.push('/profile'), 1000);
      }
    } catch (error) {
      setMessage(`오류: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 애플 스타일 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* 로고/제목 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {isSignUp ? '계정 만들기' : '로그인'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isSignUp ? '새로운 계정을 만들어 시작하세요' : '계정에 로그인하세요'}
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {/* 메시지 */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('성공') || message.includes('완료') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  처리 중...
                </div>
              ) : (
                isSignUp ? '회원가입' : '로그인'
              )}
            </button>
          </form>

          {/* 전환 버튼 */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage('');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
            >
              {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
            </button>
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            계속 진행하면 서비스 약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
} 