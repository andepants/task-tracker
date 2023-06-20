import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className="flex justify-center m-5 p-2 text-4xl font-bold">Login Page</h1>
      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
      </Link>
      <Link href="/tasks" className="flex justify-center">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Taks
        </button>
        </Link>
    </main>
  )
}
