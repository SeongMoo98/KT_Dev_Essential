'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', intro: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkUserAndLoadProfiles();
  }, []);

  const checkUserAndLoadProfiles = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    await loadProfiles();
  };

  const loadProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      setMessage(`데이터 로드 오류: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setEditForm({
      username: profile.username || '',
      intro: profile.intro || '',
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: editForm.username,
          intro: editForm.intro,
        })
        .eq('id', editingId);

      if (error) throw error;
      
      setMessage('프로필이 성공적으로 수정되었습니다!');
      setEditingId(null);
      await loadProfiles();
    } catch (error) {
      setMessage(`수정 오류: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('정말로 이 프로필을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessage('프로필이 성공적으로 삭제되었습니다!');
      await loadProfiles();
    } catch (error) {
      setMessage(`삭제 오류: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ username: '', intro: '' });
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
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">관리자 페이지</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/profile')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
            >
              프로필로
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 메시지 */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('성공') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* 테이블 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">프로필 목록</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    닉네임
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    자기소개
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    생성일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {profiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {profile.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === profile.id ? (
                        <input
                          type="text"
                          value={editForm.username}
                          onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{profile.username || '-'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === profile.id ? (
                        <textarea
                          value={editForm.intro}
                          onChange={(e) => setEditForm({...editForm, intro: e.target.value})}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{profile.intro || '-'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {profile.created_at ? new Date(profile.created_at).toLocaleDateString('ko-KR') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === profile.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            저장
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(profile)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(profile.id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {profiles.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              프로필 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 