import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseQuery = (table, query = '', dependencies = []) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        let supabaseQuery = supabase?.from(table)?.select(query || '*')

        const { data: result, error: queryError } = await supabaseQuery

        if (isCancelled) return

        if (queryError) {
          setError(queryError)
        } else {
          setData(result || [])
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
    }
  }, dependencies)

  return { data, loading, error, refetch: () => setLoading(true) }
}