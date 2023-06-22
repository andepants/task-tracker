"use client";
import Link from 'next/link'
import { useState } from 'react';

export default function Home() {

  const[user, setUser] = useState<string>('');

  const handleChange = (e: any) => {
    setUser(e.target.value);
  }

  return (
    <main>
      <h1 className="flex justify-center m-5 p-2 text-4xl font-bold">Task Tracker</h1>
      <div className="flex justify-center">
        <label className="m-2 text-xl font-bold p-2">User</label>
        <input
          type="text"
          placeholder="Bob"
          className="border-2 border-gray-500 m-2 p-2 rounded"
          value={user}
          onChange={handleChange}
        />
      </div>
      <Link
        href={{
          pathname: '/tasks',
          query: { user: user.toLowerCase() },
        }}
        className="flex justify-center"
      >
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Take me to my tasks
        </button>
        </Link>
      <Link href="/login" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </main>
  )
}
