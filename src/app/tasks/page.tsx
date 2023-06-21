"use client";
import Link from 'next/link'
import { FormEvent } from 'react';


export default function Task() {

  const insertData = async (e : FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/postTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'Task One', description: 'This is task one' })
    })
  }

  const readAll = async () => {
    const res = await fetch('http://localhost:3000/api/getAllTasks', {
      method: 'GET',
    })
    const data = await res.json();
    console.log(data, 'data from readAll');
  }

  return (
    <main>
      <h1 className="flex justify-center m-5 p-2 text-4xl font-bold">Task Page</h1>
      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
        </Link>
      <Link href="/login" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>

      <form className="flex justify-center" onSubmit={(e) => insertData(e)}>
        <input type="text" placeholder="Title" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" placeholder="Description" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" placeholder="Status" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" placeholder="Due Date" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </form>


      <button onClick={insertData} className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounde">Insert into database</button>
      <button onClick={readAll} className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounde">Read All from DB</button>
    </main>
  )
}
