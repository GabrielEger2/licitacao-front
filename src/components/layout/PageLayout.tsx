import SideBar from '../SideBar'
import Footer from './Footer'
import Navbar from './Navbar'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SideBar />
      <div className="flex-1">
        <Navbar />
        <main className="p-2 md:p-6 mb-10 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
