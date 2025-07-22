'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 현재 사용자 상태 확인
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Supabase Auth Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-700">
                    안녕하세요, {user.email}님!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            {user ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  로그인 성공! 🎉
                </h2>
                <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">사용자 정보</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>이메일:</strong> {user.email}</p>
                    <p><strong>사용자 ID:</strong> {user.id}</p>
                    <p><strong>가입일:</strong> {new Date(user.created_at).toLocaleDateString('ko-KR')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Supabase 인증 시스템에 오신 것을 환영합니다!
                </h2>
                <p className="text-gray-600 mb-8">
                  이메일과 비밀번호로 회원가입하고 로그인해보세요.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/signup"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium"
                  >
                    회원가입
                  </Link>
                  <Link
                    href="/login"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md text-sm font-medium"
                  >
                    로그인
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
