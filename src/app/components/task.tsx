import { useState } from 'react';

export default function Task({eachTask, editTask} : {editTask: any, eachTask: any}) {
  console.log(eachTask, 'eachTask from task.tsx')
  const [modalTitle, setModalTitle] = useState('')
  const [modalDescription, setModalDescription] = useState('')
  const [modalStatus, setModalStatus] = useState('')
  const [modalDueDate, setModalDueDate] = useState<any>(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div key={eachTask.id} className="flex justify-center">
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.title}</h1>
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.description}</h1>
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.status}</h1>
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.dueDate}</h1>
        <dialog id={eachTask.id} open={isModalOpen}>
          <form onSubmit={(e) => editTask(e)}>
            <input type="text" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} placeholder="Title" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <input type="text" value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} placeholder="Description" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <input type="text" value={modalStatus} onChange={(e) => setModalStatus(e.target.value)} placeholder="Status" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <input type="text" value={modalDueDate} onChange={(e) => setModalDueDate(e.target.value)} placeholder="Due Date" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <button
              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Edit
            </button>
            <button
              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </form>
        </dialog>
        <button
          className="flex justify-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Task
        </button>
        <button
          className="flex justify-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          // onClick={() => setIsModalOpen(true)}
        >
          Delete Task
        </button>
      </div>
    </>
  )
}