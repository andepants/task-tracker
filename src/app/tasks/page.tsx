"use client";
import Link from 'next/link'
import { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Task from '../components/task';
import Select from 'react-select';
import { GroupBase } from 'react-select';

export default function Tasks() {
  const searchParams = useSearchParams();
  const user = searchParams?.get('user');
  const [allTasks, setAllTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Not Started')
  const [dueDate, setDueDate] = useState<any>(new Date())
  const [currentUser, setCurrentUser] = useState<any>('')
  const [sortBy, setSortBy] = useState({ value: 'title_asc', label: 'Sort By' })


  const options : { value: string; label: string; }[] = [
    { value: 'Not Started', label: 'Not Started' },
    { value: 'Pending', label: 'Pending' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Urgent', label: 'Urgent' },
  ]

  const sortOptions: { value: string; label: string; }[] = [
    { value: 'title_asc', label: 'Title (A-Z)' },
    { value: 'title_desc', label: 'Title (Z-A)' },
    { value: 'status_asc', label: 'Status (A-Z)' },
    { value: 'status_desc', label: 'Status (Z-A)' },
    { value: 'due_date_asc', label: 'Due Date (Earliest First)' },
    { value: 'due_date_desc', label: 'Due Date (Latest First)' }
  ];

  const readAll = async () => {
    console.log('inside read all', currentUser.id)
    const res = await fetch('http://localhost:3000/api/getAllTasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'id': currentUser.id })
    })
    const data = await res.json();
    console.log('data', data)
    setAllTasks(data);
  }

  useEffect(() => {
    if (currentUser === '') {
      return;
    }
    console.log('currentUser', currentUser)
    if (currentUser === undefined || currentUser === null || currentUser.error) {
      const createNewUser = async () => {
        const res = await fetch('http://localhost:3000/api/createNewUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: user })
        })
        const data = await res.json();
        setCurrentUser(data);
      }
      createNewUser();
    } else {
      readAll();
    }
  }, [currentUser])

  useEffect(() => {
    const retrieveUserId = async () => {
      console.log('inside retrieveUserId')
      const res = await fetch('http://localhost:3000/api/getUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user })
      })
      const data = await res.json();
      console.log('data', data)
      setCurrentUser(data);
    }
    if (user !== '') {
      retrieveUserId();
    }
  }, [])


  const insertData = async (e : FormEvent) => {
    console.log('inside insert data')
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/postTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, description: description, status: status, dueDate: dueDate, userId: currentUser.id})
    })
    setTitle('');
    setDescription('');
    setStatus('Not Started');
    readAll();
  }

  const editTask = async (e: any, id: any, title: string, description: string, status: string, dueDate: Date) => {
    console.log('inside edit task', id, title, description, status, dueDate)
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/editTask', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, title: title, description: description, status: status, dueDate: dueDate })
    })
    readAll();
  }

  const deleteTask = async (id : any) => {
    const res = await fetch('http://localhost:3000/api/deleteTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    readAll();
  }

  function sortByTitleAtoZ(a: any, b: any) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }
  function sortByTitleZtoA(a: any, b: any) {
    if (a.title < b.title) return 1;
    if (a.title > b.title) return -1;
    return 0;
  }
  function sortByStatusAtoZ(a: any, b: any) {
    if (a.status < b.status) return -1;
    if (a.status > b.status) return 1;
    return 0;
  }
  function sortByStatusZtoA(a: any, b: any) {
    if (a.status < b.status) return 1;
    if (a.status > b.status) return -1;
    return 0;
  }
  function sortByDueDateEarliestFirst(a: any, b: any) {
    if (a.dueDate < b.dueDate) return -1;
    if (a.dueDate > b.dueDate) return 1;
    return 0;
  }
  function sortByDueDateLatestFirst(a: any, b: any) {
    if (a.dueDate < b.dueDate) return 1;
    if (a.dueDate > b.dueDate) return -1;
    return 0;
  }


  const handleSelect = (selectedOption: any): void => {
    console.log(selectedOption, 'selectedOption', typeof selectedOption)
    setStatus(selectedOption);
  }

  const handleOptionsSelect = (selectedOption: any): void => {
    setSortBy(selectedOption);
  }

  useEffect(() => {
  const sortTasks = (sortBy: any) => {
    console.log('inside sortTasks', sortBy)
    if (sortBy.value === 'title_asc') {
      const sortedAllTasks = [...allTasks];
      sortedAllTasks.sort(sortByTitleAtoZ);
      setAllTasks(sortedAllTasks);
    } else if (sortBy.value === 'title_desc') {
      const sortedAllTasks = [...allTasks];
      sortedAllTasks.sort(sortByTitleZtoA);
      setAllTasks(sortedAllTasks);
    } else if (sortBy.value === 'status_asc') {
      const sortedAllTasks = [...allTasks];
      sortedAllTasks.sort(sortByStatusAtoZ);
      setAllTasks(sortedAllTasks);
    } else if (sortBy.value === 'status_desc') {
      const sortedAllTasks = [...allTasks];
      sortedAllTasks.sort(sortByStatusZtoA);
      setAllTasks(sortedAllTasks);
    } else if (sortBy.value === 'dueDate_asc') {
      const sortedAllTasks = [...allTasks];
      sortedAllTasks.sort(sortByDueDateEarliestFirst);
      setAllTasks(sortedAllTasks);
    } else if (sortBy.value === 'dueDate_desc') {
      const sortedAllTasks = [...allTasks];
      sortedAllTasks.sort(sortByDueDateLatestFirst);
      setAllTasks(sortedAllTasks);
    }
  }
  sortTasks(sortBy);
}, [sortBy]);



  return (
    <main>
      <h1 className="flex justify-center m-5 p-2 text-4xl font-bold">Task Page</h1>

      <form className="flex justify-center" onSubmit={(e) => insertData(e)}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <Select options={options} placeholder={status} value={status} className="m-2 p-2 rounded" onChange={(e) => handleSelect(e.value)}/>
        <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" className="border-2 border-gray-500 m-2 p-2 rounded" />
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </form>

      <Select options={sortOptions} placeholder={sortBy.label} value={sortBy} className="m-2 p-2 rounded" onChange={(e) => handleOptionsSelect(e)}/>
      {allTasks.map((eachTask : any, index: number) => (
        <Task key={index} eachTask={eachTask} editTask={editTask} deleteTask={deleteTask} />
      ))}

      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
      </Link>
    </main>
  )
}
