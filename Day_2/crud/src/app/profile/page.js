'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [profile, setProfile] = useState({ username: '', intro: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
    await getProfile(user.id);
  };

  const getProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('프로필 조회 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: profile.username,
          intro: profile.intro,
          created_at: profile.created_at || new Date().toISOString(),
        });

      if (error) throw error;
      setMessage('프로필이 성공적으로 저장되었습니다!');
    } catch (error) {
      setMessage(`저장 오류: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">프로필</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
            >
              관리자 페이지
            </button>
            <button
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* 사용자 정보 헤더 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {profile.username ? profile.username.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {profile.username || '사용자'}
            </h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>

          {/* 프로필 폼 */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                자기소개
              </label>
              <textarea
                value={profile.intro}
                onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="자기소개를 입력하세요"
              />
            </div>

            {/* 메시지 */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('성공') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* 저장 버튼 */}
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  저장 중...
                </div>
              ) : (
                '프로필 저장'
              )}
            </button>
          </div>
        </div>

        {/* 추가 정보 카드 */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">계정 정보</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">이메일</span>
              <span className="text-gray-900 font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">가입일</span>
              <span className="text-gray-900 font-medium">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 