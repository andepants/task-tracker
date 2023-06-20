import './globals.css'

export const metadata = {
  title: 'Task Tracker',
  description: 'A simple task tracker app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
