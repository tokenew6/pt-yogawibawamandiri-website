import { useState, useEffect } from 'react'
import { supabase, type Database } from '@/lib/supabase'

type Tables = Database['public']['Tables']

// Company data hook
export function useCompany() {
  const [company, setCompany] = useState<Tables['companies']['Row'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCompany() {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .limit(1)
          .single()

        if (error) throw error
        setCompany(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [])

  return { company, loading, error }
}

// Services data hook
export function useServices() {
  const [services, setServices] = useState<Tables['services']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setServices(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { services, loading, error }
}

// Gallery data hook
export function useGallery() {
  const [gallery, setGallery] = useState<Tables['gallery']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setGallery(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  return { gallery, loading, error }
}

// Contact submission hook
export function useContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitContact = async (contactData: Tables['contacts']['Insert']) => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([contactData])

      if (error) throw error
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit contact form')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setError(null)
  }

  return { submitContact, submitting, success, error, resetForm }
}

// Real-time subscription hook
export function useRealtimeSubscription<T>(
  table: string,
  callback: (payload: any) => void
) {
  useEffect(() => {
    const subscription = supabase
      .channel(`public:${table}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table
      }, callback)
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [table, callback])
}
