"use client";
import Link from 'next/link'
import { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Task from '../components/task';
import { TaskProps } from '../interfaces/tasks';


export default function Tasks() {
  const searchParams = useSearchParams();
  const user = searchParams?.get('user');
  const [allTasks, setAllTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState<any>(new Date())
  const [currentUser, setCurrentUser] = useState<any>('')

  const readAll = async () => {
    console.log('userId', user)
    const res = await fetch('http://localhost:3000/api/getAllTasks', {
      method: 'GET',
    })
    const data = await res.json();
    console.log(data, 'data from readAll');

    setAllTasks(data);
  }

  useEffect(() => {
    console.log('currentUser right before createNewUser', currentUser)
    if (currentUser === undefined || currentUser === null) {
      console.log('inside if statement', currentUser)
      const createNewUser = async () => {
        const res = await fetch('http://localhost:3000/api/createNewUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: user })
        })
        const data = await res.json();
        console.log(data, 'data from createNewUser');
        setCurrentUser(data?.id);
      }
      createNewUser();
    } else {
      console.log('currentUser', currentUser)
      // readAll(); with the userId
    }
  }, [currentUser])

  useEffect(() => {
    const retrieveUserId = async () => {
      const res = await fetch('http://localhost:3000/api/getUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user })
      })
      const data = await res.json();
      console.log(data, 'data from retrieveUserId');
      setCurrentUser(data?.id);
    }
    retrieveUserId();
  }, [])

  // useEffect(() => {
  //   readAll();
  // }, [])

  const insertData = async (e : FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/postTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, description: description, status: status, dueDate: dueDate, user: user })
    })
    console.log(res, 'res from insertData');
    readAll();
  }

  const editTask = async (e : FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/editTask', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, description: description, status: status, dueDate: dueDate })
    })
  }

  const deleteTask = async (e : FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/deleteTask', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, description: description, status: status, dueDate: dueDate })
    })
  }


  return (
    <main>
      <h1 className="flex justify-center m-5 p-2 text-4xl font-bold">Task Page</h1>

      <form className="flex justify-center" onSubmit={(e) => insertData(e)}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </form>

      {allTasks.map((eachTask : any, index: number) => (
        <Task key={index} eachTask={eachTask} editTask={editTask}/>
      ))}

      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
      </Link>
    </main>
  )
}
