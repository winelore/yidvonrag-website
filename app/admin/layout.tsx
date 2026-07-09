export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white transition-colors duration-200">
          {children}
      </div>
  )
}
