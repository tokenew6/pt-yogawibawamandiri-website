import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Tag,
  Bot,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

type Article = Database['public']['Tables']['articles']['Row']

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all')
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    loadArticles()
  }, [filterPublished])

  const loadArticles = async () => {
    try {
      let query = supabase
        .from('articles')
        .select('*')
        .order('updated_at', { ascending: false })

      if (filterPublished !== 'all') {
        query = query.eq('published', filterPublished === 'published')
      }

      const { data, error } = await query

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error('Error loading articles:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat artikel',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error

      setArticles(prev => prev.filter(article => article.id !== id))
      toast({
        title: 'Berhasil',
        description: 'Artikel berhasil dihapus',
      })
    } catch (error) {
      console.error('Error deleting article:', error)
      toast({
        title: 'Error',
        description: 'Gagal menghapus artikel',
        variant: 'destructive',
      })
    }
  }

  const generateArticleWithAI = async () => {
    toast({
      title: 'AI Generator',
      description: 'Mengarahkan ke halaman pembuatan artikel dengan AI...',
    })
    navigate('/dashboard/articles/new?ai=true')
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ywm-red"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-gray-600">Buat, edit, dan kelola artikel website</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={generateArticleWithAI}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Bot className="mr-2 h-4 w-4" />
            Generate AI
          </Button>
          <Button onClick={() => navigate('/dashboard/articles/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Artikel Baru
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={filterPublished === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterPublished('all')}
            size="sm"
          >
            Semua
          </Button>
          <Button
            variant={filterPublished === 'published' ? 'default' : 'outline'}
            onClick={() => setFilterPublished('published')}
            size="sm"
          >
            Published
          </Button>
          <Button
            variant={filterPublished === 'draft' ? 'default' : 'outline'}
            onClick={() => setFilterPublished('draft')}
            size="sm"
          >
            Draft
          </Button>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada artikel</h3>
            <p className="text-gray-600 text-center mb-6">
              Mulai buat artikel pertama Anda atau gunakan AI generator untuk membuat konten otomatis
            </p>
            <div className="flex space-x-2">
              <Button onClick={generateArticleWithAI} variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Generate dengan AI
              </Button>
              <Button onClick={() => navigate('/dashboard/articles/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Buat Artikel Manual
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant={article.published ? 'default' : 'secondary'}>
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/dashboard/articles/${article.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Artikel</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus artikel "{article.title}"? 
                            Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(article.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(article.updated_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/artikel/${article.slug}`}
                    target="_blank"
                    className="text-ywm-red hover:underline text-sm flex items-center"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Lihat
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/dashboard/articles/${article.id}`)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Articles
