# 🍎 애플 스타일 인증 시스템

Supabase와 Next.js를 사용한 모던한 인증 시스템입니다.

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에 접속하여 새 프로젝트 생성
2. 프로젝트 설정 → API 탭에서 URL과 anon key 복사
3. `.env.local` 파일에 붙여넣기

### 3. 데이터베이스 테이블 생성

Supabase Dashboard → Table Editor에서 다음 SQL을 실행:

```sql
-- profiles 테이블 생성
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  intro TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 회원가입 시 자동으로 프로필 생성하는 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, intro)
  VALUES (NEW.id, '', '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. 인증 설정

Supabase Dashboard → Authentication → Settings:
- Site URL: `http://localhost:3000`
- Enable email confirmations: 비활성화

## 🛠️ 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📱 주요 기능

### 🔐 인증 시스템
- 이메일/비밀번호 회원가입 및 로그인
- 애플 스타일의 깔끔한 UI
- 자동 세션 관리

### 👤 프로필 관리
- 사용자 닉네임 및 자기소개 편집
- 실시간 데이터 저장
- 계정 정보 표시

### 🎨 UI/UX 특징
- 모던한 그라디언트 디자인
- 부드러운 애니메이션
- 반응형 레이아웃
- 로딩 상태 표시

## 🗂️ 프로젝트 구조

```
src/
├── app/
│   ├── login/page.js      # 로그인/회원가입 페이지
│   ├── profile/page.js    # 프로필 관리 페이지
│   └── page.js           # 메인 페이지 (리디렉션)
├── lib/
│   └── supabaseClient.js # Supabase 클라이언트 설정
└── ...
```

## 🔧 기술 스택

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (권장)

## 🚀 배포

1. [Vercel](https://vercel.com)에 프로젝트 연결
2. 환경 변수 설정 (Supabase URL, Key)
3. 배포 완료!

## 📝 라이센스

MIT License
