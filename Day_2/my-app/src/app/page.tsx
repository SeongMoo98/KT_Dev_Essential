"use client";

import { useState } from "react";

export default function Home() {
  // 카운터 상태
  const [count, setCount] = useState(0);
  
  // 입력 폼 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // 체크박스 상태
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // 배열 상태 (할일 목록)
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // 할일 추가 함수
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  // 할일 삭제 함수
  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // 폼 제출 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`이름: ${name}\n이메일: ${email}\n메시지: ${message}\n구독여부: ${isSubscribed ? '예' : '아니오'}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          React useState 예제
        </h1>
        
        {/* 카운터 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. 카운터 예제</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              감소
            </button>
            <span className="text-2xl font-bold min-w-[60px] text-center">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              증가
            </button>
            <button
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              리셋
            </button>
          </div>
        </div>

        {/* 할일 목록 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. 할일 목록 예제</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="할일을 입력하세요"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              추가
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span>{todo}</span>
                <button
                  onClick={() => removeTodo(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 폼 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">3. 폼 예제</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">이름:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">이메일:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">메시지:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="subscribe"
                checked={isSubscribed}
                onChange={(e) => setIsSubscribed(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="subscribe" className="text-sm">
                뉴스레터 구독하기
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              제출하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
