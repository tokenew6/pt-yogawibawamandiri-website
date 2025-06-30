import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import Layout from '@/components/Layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft,
  Share2,
  Bot,
  Clock
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Article = Database['public']['Tables']['articles']['Row']

const ArticleDetail = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])

  useEffect(() => {
    if (slug) {
      loadArticle(slug)
    }
  }, [slug])

  const loadArticle = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', articleSlug)
        .eq('published', true)
        .single()

      if (error) throw error
      setArticle(data)
      
      // Load related articles
      if (data?.tags && data.tags.length > 0) {
        loadRelatedArticles(data.id, data.tags)
      }
    } catch (error) {
      console.error('Error loading article:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedArticles = async (currentId: string, tags: string[]) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .neq('id', currentId)
        .overlaps('tags', tags)
        .limit(3)

      if (error) throw error
      setRelatedArticles(data || [])
    } catch (error) {
      console.error('Error loading related articles:', error)
    }
  }

  const shareArticle = async () => {
    const url = window.location.href
    const title = article?.title || ''
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch (error) {
        // Fallback to copying URL
        copyToClipboard(url)
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link artikel berhasil disalin!')
    })
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ywm-red"></div>
        </div>
      </Layout>
    )
  }

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">Artikel yang Anda cari mungkin telah dihapus atau belum dipublikasi.</p>
            <Link 
              to="/blog"
              className="bg-ywm-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Kembali ke Blog
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ywm-red to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center text-red-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Blog
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-red-100">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {new Date(article.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{calculateReadingTime(article.content)} menit baca</span>
              </div>
              <Button
                onClick={shareArticle}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/20"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {article.thumbnail && (
              <div className="mb-12">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-red max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-ywm-dark mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-ywm-dark mb-4 mt-8">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold text-ywm-dark mb-3 mt-6">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">{children}</ol>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-ywm-red pl-4 my-6 italic text-gray-600 bg-gray-50 py-3">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-ywm-red">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
                      {children}
                    </pre>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* AI Generated Badge */}
            {article.tags?.includes('ai-generated') && (
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <div className="flex items-center text-blue-700">
                  <Bot className="mr-2 h-5 w-5" />
                  <span className="font-medium">Artikel ini dibuat dengan bantuan AI</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Konten telah diverifikasi dan disesuaikan oleh tim PT. Yoga Wibawa Mandiri
                </p>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ywm-dark">Bagikan Artikel Ini</h3>
                <Button onClick={shareArticle} className="bg-ywm-red hover:bg-red-700">
                  <Share2 className="mr-2 h-4 w-4" />
                  Bagikan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ywm-dark mb-8 text-center">
                Artikel Terkait
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/artikel/${relatedArticle.slug}`}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    {relatedArticle.thumbnail && (
                      <img
                        src={relatedArticle.thumbnail}
                        alt={relatedArticle.title}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {relatedArticle.tags?.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-ywm-dark mb-2 group-hover:text-ywm-red transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(relatedArticle.created_at).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-ywm-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tertarik dengan Layanan Kami?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Hubungi PT. Yoga Wibawa Mandiri untuk kebutuhan pengantongan semen Anda
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

export default ArticleDetail
