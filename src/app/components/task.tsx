import { useState } from 'react';
import Select from 'react-select';

export default function Task({eachTask, editTask, deleteTask} : {editTask: any, eachTask: any, deleteTask: any}) {
  const [modalTitle, setModalTitle] = useState(eachTask.title)
  const [modalDescription, setModalDescription] = useState(eachTask.description)
  const [modalStatus, setModalStatus] = useState(eachTask.status)
  const [modalDueDate, setModalDueDate] = useState<any>(eachTask.dueDate)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalSelect = (selectedOption: any): void => {
    setModalStatus(selectedOption);
  }

  const options : { value: string; label: string; }[] = [
    { value: 'Not Started', label: 'Not Started' },
    { value: 'Pending', label: 'Pending' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Urgent', label: 'Urgent' },
  ]


  return (
    <>
      <div key={eachTask.id} className="flex justify-center">
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.title}</h1>
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.description}</h1>
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.status}</h1>
        <h1 className="border-2 border-gray-500 m-2 p-2 rounded">{eachTask.dueDate.slice(0,10)}</h1>
        <dialog id={eachTask.id} open={isModalOpen}>
          <form onSubmit={(e) => {
                editTask(e, eachTask.id, modalTitle, modalDescription, modalStatus, modalDueDate)
                setIsModalOpen(false)
              }}>
            <input type="text" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} placeholder="Title" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <input type="text" value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} placeholder="Description" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <Select options={options} placeholder={modalStatus} value={modalStatus} className="m-2 p-2 rounded" onChange={(e) => handleModalSelect(e.value)}/>
            <input type="text" value={modalDueDate} onChange={(e) => setModalDueDate(e.target.value)} placeholder="Due Date" className="border-2 border-gray-500 m-2 p-2 rounded" />
            <button
              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Edit
            </button>
            <button
              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
              type="button"
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
          onClick={() => deleteTask(eachTask.id)}
        >
          Delete Task
        </button>
      </div>
    </>
  )
}