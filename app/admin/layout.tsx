export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-bordeaux-950 dark:text-white transition-colors duration-200">
          {children}
      </div>
  )
}
