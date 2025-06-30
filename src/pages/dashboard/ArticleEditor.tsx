import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Bot, 
  Zap, 
  Image as ImageIcon,
  Tag,
  Globe,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

type Article = Database['public']['Tables']['articles']['Row']

const ArticleEditor = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const isNewArticle = id === 'new'
  const useAI = searchParams.get('ai') === 'true'
  const navigate = useNavigate()
  const { profile } = useAuth()
  const { toast } = useToast()

  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    thumbnail: '',
    slug: '',
    author: profile?.full_name || '',
    published: false,
    tags: []
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [generatingAI, setGeneratingAI] = useState(false)

  useEffect(() => {
    if (!isNewArticle && id) {
      loadArticle(id)
    } else if (useAI) {
      showAIGenerator()
    }
  }, [id, isNewArticle, useAI])

  const loadArticle = async (articleId: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single()

      if (error) throw error
      setArticle(data)
    } catch (error) {
      console.error('Error loading article:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat artikel',
        variant: 'destructive',
      })
      navigate('/dashboard/articles')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setArticle(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !article.tags?.includes(newTag.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }))
  }

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return

    setGeneratingAI(true)
    try {
      // Simulate AI generation - in real implementation, this would call JS Puter API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const aiContent = `# ${aiPrompt}

Artikel ini dibuat dengan bantuan AI untuk PT. Yoga Wibawa Mandiri.

## Pendahuluan

PT. Yoga Wibawa Mandiri sebagai perusahaan pengantongan semen terkemuka di Lhokseumawe, Aceh, terus berinovasi dalam memberikan layanan terbaik kepada pelanggan.

## Pembahasan Utama

Dengan pengalaman lebih dari 15 tahun di industri semen, kami memahami betul kebutuhan pasar konstruksi di wilayah Aceh dan Sumatera Utara. Fasilitas modern kami di Pelabuhan Krueng Geukueh memungkinkan proses pengantongan yang efisien dan berkualitas tinggi.

### Keunggulan Layanan

1. **Kualitas Terjamin** - Sertifikat ISO memastikan standar kualitas internasional
2. **Distribusi Luas** - Jaringan distribusi ke seluruh Aceh dan Sumut  
3. **Kapasitas Besar** - Mampu menangani 500K+ ton semen per tahun
4. **Teknologi Modern** - Proses pengantongan otomatis dan higienis

## Kesimpulan

PT. Yoga Wibawa Mandiri berkomitmen untuk terus memberikan layanan pengantongan dan distribusi semen terbaik, mendukung pembangunan infrastruktur di wilayah Aceh dan sekitarnya.

---

*Artikel ini dibuat dengan teknologi AI untuk memberikan informasi terkini tentang layanan PT. Yoga Wibawa Mandiri.*`

      const aiTitle = aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1)
      const aiExcerpt = `${aiPrompt} - Informasi lengkap dari PT. Yoga Wibawa Mandiri, perusahaan pengantongan semen terpercaya di Lhokseumawe.`

      setArticle(prev => ({
        ...prev,
        title: aiTitle,
        content: aiContent,
        excerpt: aiExcerpt,
        slug: generateSlug(aiTitle),
        tags: ['ai-generated', 'semen-padang', 'lhokseumawe', 'konstruksi']
      }))

      toast({
        title: 'AI Content Generated!',
        description: 'Konten berhasil dibuat dengan AI. Anda dapat mengedit sebelum menyimpan.',
      })
    } catch (error) {
      console.error('Error generating AI content:', error)
      toast({
        title: 'Error',
        description: 'Gagal generate konten AI',
        variant: 'destructive',
      })
    } finally {
      setGeneratingAI(false)
      setAiPrompt('')
    }
  }

  const showAIGenerator = () => {
    setAiPrompt('')
  }

  const handleSave = async () => {
    if (!article.title || !article.content) {
      toast({
        title: 'Error',
        description: 'Judul dan konten artikel wajib diisi',
        variant: 'destructive',
      })
      return
    }

    setSaving(true)
    try {
      const articleData = {
        ...article,
        updated_at: new Date().toISOString(),
        author: profile?.full_name || article.author || 'Admin'
      }

      if (isNewArticle) {
        delete articleData.id
        articleData.created_at = new Date().toISOString()
        
        const { data, error } = await supabase
          .from('articles')
          .insert(articleData)
          .select()
          .single()

        if (error) throw error
        
        toast({
          title: 'Berhasil',
          description: 'Artikel berhasil dibuat',
        })
        navigate(`/dashboard/articles/${data.id}`)
      } else {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id)

        if (error) throw error

        toast({
          title: 'Berhasil',
          description: 'Artikel berhasil disimpan',
        })
      }
    } catch (error) {
      console.error('Error saving article:', error)
      toast({
        title: 'Error',
        description: 'Gagal menyimpan artikel',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ywm-red"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard/articles')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNewArticle ? 'Artikel Baru' : 'Edit Artikel'}
            </h1>
            {useAI && (
              <p className="text-sm text-blue-600 flex items-center">
                <Bot className="mr-1 h-3 w-3" />
                Mode AI Generator
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {article.published && article.slug && (
            <Button
              variant="outline"
              onClick={() => window.open(`/artikel/${article.slug}`, '_blank')}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menyimpan...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Generator */}
      {(useAI || isNewArticle) && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Bot className="mr-2" />
              AI Content Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ai-prompt">Topik atau Prompt AI</Label>
              <Input
                id="ai-prompt"
                placeholder="Contoh: Keunggulan Semen Padang untuk Konstruksi Modern"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generateWithAI()}
              />
            </div>
            <Button
              onClick={generateWithAI}
              disabled={generatingAI || !aiPrompt.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {generatingAI ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                Konten Artikel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={article.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Masukkan judul artikel..."
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={article.excerpt || ''}
                  onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Ringkasan singkat artikel..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Konten</Label>
                <Textarea
                  id="content"
                  value={article.content || ''}
                  onChange={(e) => setArticle(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Tulis konten artikel dalam format Markdown..."
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan Markdown untuk formatting (# untuk heading, **bold**, *italic*, dll.)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2" />
                Publikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Publish Artikel</Label>
                <Switch
                  id="published"
                  checked={article.published || false}
                  onCheckedChange={(checked) => setArticle(prev => ({ ...prev, published: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={article.slug || ''}
                  onChange={(e) => setArticle(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-artikel"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: /artikel/{article.slug || 'url-artikel'}
                </p>
              </div>

              <div>
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  value={article.author || ''}
                  onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nama penulis"
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="mr-2" />
                Gambar Utama
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="thumbnail">URL Gambar</Label>
                <Input
                  id="thumbnail"
                  value={article.thumbnail || ''}
                  onChange={(e) => setArticle(prev => ({ ...prev, thumbnail: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {article.thumbnail && (
                <div className="mt-3">
                  <img
                    src={article.thumbnail}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Tag baru"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  Tambah
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ArticleEditor
