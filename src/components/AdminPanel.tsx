import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Plus, Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price: number
}

interface GalleryItem {
  id: string
  title: string
  description: string
  image_url: string
  category: string
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

const AdminPanel = () => {
  const [services, setServices] = useState<Service[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [servicesRes, galleryRes, contactsRes] = await Promise.all([
        supabase.from('services').select('*').order('created_at', { ascending: true }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false })
      ])

      if (servicesRes.data) setServices(servicesRes.data)
      if (galleryRes.data) setGallery(galleryRes.data)
      if (contactsRes.data) setContacts(contactsRes.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Services Management</h2>
            <Button onClick={() => setEditingService({} as Service)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gallery Management</h2>
            <Button onClick={() => setEditingGallery({} as GalleryItem)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <h2 className="text-2xl font-semibold">Contacts Management</h2>
          
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {contact.name}
                    <Badge 
                      variant={contact.status === 'new' ? 'destructive' : 
                              contact.status === 'read' ? 'default' : 'secondary'}
                    >
                      {contact.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {contact.email} • {contact.phone} • {new Date(contact.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold">{contact.subject}</h4>
                  <p className="mt-2">{contact.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel
