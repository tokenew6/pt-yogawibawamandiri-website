import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  Users, 
  Files, 
  LogOut,
  Menu,
  X,
  Bot,
  Zap,
  TrendingUp,
  Eye,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'

interface DashboardStats {
  articles: number
  projects: number
  services: number
  users: number
}

const Dashboard = () => {
  const { user, profile, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    articles: 0,
    projects: 0,
    services: 0,
    users: 0
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const isExactDashboard = location.pathname === '/dashboard'

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [articlesResult, projectsResult, servicesResult, usersResult] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' })
      ])

      setStats({
        articles: articlesResult.count || 0,
        projects: projectsResult.count || 0,
        services: servicesResult.count || 0,
        users: usersResult.count || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      roles: ['admin', 'editor', 'viewer']
    },
    {
      label: 'Artikel',
      icon: FileText,
      path: '/dashboard/articles',
      roles: ['admin', 'editor']
    },
    {
      label: 'Proyek',
      icon: Briefcase,
      path: '/dashboard/projects',
      roles: ['admin', 'editor']
    },
    {
      label: 'Layanan',
      icon: Settings,
      path: '/dashboard/services',
      roles: ['admin', 'editor']
    },
    {
      label: 'File Manager',
      icon: Files,
      path: '/dashboard/files',
      roles: ['admin', 'editor']
    },
    {
      label: 'Pengguna',
      icon: Users,
      path: '/dashboard/users',
      roles: ['admin']
    }
  ]

  const availableMenuItems = menuItems.filter(item => 
    profile && item.roles.includes(profile.role)
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0 lg:w-64'
      } ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 lg:relative' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/5f8e0e82-2031-4a9f-b848-f05d23c37cf2.png" 
                alt="PT. YWM Logo"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h1 className="font-bold text-ywm-dark">YWM Admin</h1>
                <div className="flex items-center text-xs text-blue-600">
                  <Bot size={12} className="mr-1" />
                  AI-Powered
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {availableMenuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-ywm-red text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">{profile?.full_name || user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start"
            >
              <LogOut size={16} className="mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <h2 className="text-xl font-semibold text-gray-900">
              {isExactDashboard ? 'Dashboard' : 'Admin Panel'}
            </h2>
          </div>
          
          <Link 
            to="/"
            className="text-sm text-ywm-red hover:underline flex items-center"
          >
            <Eye size={16} className="mr-1" />
            Lihat Website
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {isExactDashboard ? (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-ywm-red to-red-700 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Selamat Datang, {profile?.full_name || 'Admin'}!
                    </h1>
                    <p className="text-red-100">
                      Kelola konten website PT. Yoga Wibawa Mandiri dengan sistem AI
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bot size={32} />
                    <Zap size={24} className="text-yellow-300" />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                    <FileText className="h-4 w-4 text-ywm-red" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : stats.articles}</div>
                    <p className="text-xs text-gray-600">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      Konten website
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
                    <Briefcase className="h-4 w-4 text-ywm-red" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : stats.projects}</div>
                    <p className="text-xs text-gray-600">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      Portfolio perusahaan
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Layanan</CardTitle>
                    <Settings className="h-4 w-4 text-ywm-red" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : stats.services}</div>
                    <p className="text-xs text-gray-600">
                      <Zap className="inline h-3 w-3 mr-1" />
                      Layanan aktif
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pengguna</CardTitle>
                    <Users className="h-4 w-4 text-ywm-red" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{loading ? '...' : stats.users}</div>
                    <p className="text-xs text-gray-600">
                      <Users className="inline h-3 w-3 mr-1" />
                      Akun terdaftar
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/dashboard/articles/new')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 text-ywm-red" />
                      Tulis Artikel Baru
                    </CardTitle>
                    <CardDescription>
                      Buat artikel baru dengan bantuan AI
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/dashboard/projects/new')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="mr-2 text-ywm-red" />
                      Tambah Proyek
                    </CardTitle>
                    <CardDescription>
                      Dokumentasikan proyek terbaru
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/dashboard/files')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Files className="mr-2 text-ywm-red" />
                      Upload File
                    </CardTitle>
                    <CardDescription>
                      Kelola dokumen dan media
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
