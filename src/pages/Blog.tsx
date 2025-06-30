import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight,
  FileText,
  Bot
} from 'lucide-react'

type Article = Database['public']['Tables']['articles']['Row']

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAllTags = () => {
    const tagSet = new Set<string>()
    articles.forEach(article => {
      article.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet)
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || article.tags?.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ywm-red"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ywm-red to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText size={48} className="mr-4" />
            <Bot size={32} className="text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog & Artikel
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Informasi terkini dan insights dari PT. Yoga Wibawa Mandiri tentang industri semen dan konstruksi
          </p>
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Bot size={20} className="mr-2" />
            <span className="text-sm">Powered by AI Technology</span>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? 'default' : 'outline'}
                onClick={() => setSelectedTag(null)}
                size="sm"
              >
                Semua Artikel
              </Button>
              {getAllTags().map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  onClick={() => setSelectedTag(tag)}
                  size="sm"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || selectedTag ? 'Tidak ada artikel yang ditemukan' : 'Belum ada artikel'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedTag 
                  ? 'Coba ubah kata kunci pencarian atau filter yang dipilih'
                  : 'Artikel akan segera tersedia'
                }
              </p>
              {(searchTerm || selectedTag) && (
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTag(null)
                  }}
                  variant="outline"
                >
                  Reset Filter
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-xl transition-shadow duration-300 group">
                  {article.thumbnail && (
                    <div className="relative overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-wrap gap-1">
                        {article.tags?.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags && article.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{article.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-ywm-red transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(article.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/artikel/${article.slug}`}
                      className="inline-flex items-center text-ywm-red hover:text-red-700 font-medium group"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ywm-red to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ingin Mendapatkan Update Artikel Terbaru?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Ikuti perkembangan terbaru industri semen dan konstruksi dari PT. Yoga Wibawa Mandiri
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/kontak"
              className="bg-white text-ywm-red px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Hubungi Kami
            </Link>
            <Link 
              to="/layanan"
              className="border-2 border-white text-white hover:bg-white hover:text-ywm-red px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Blog
