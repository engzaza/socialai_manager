import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useRealtime = (table, callback, event = '*') => {
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    const newChannel = supabase?.channel(`realtime-${table}`)?.on(
        'postgres_changes',
        {
          event,
          schema: 'public',
          table: table
        },
        (payload) => {
          if (callback && typeof callback === 'function') {
            callback(payload)
          }
        }
      )?.subscribe()

    setChannel(newChannel)

    return () => {
      if (newChannel) {
        supabase?.removeChannel(newChannel)
      }
    };
  }, [table, event])

  return channel
}