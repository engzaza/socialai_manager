import { supabase } from '../lib/supabase';

// Generic CRUD operations
export const supabaseService = {
  // Create
  async create(table, data) {
    const { data: result, error } = await supabase?.from(table)?.insert(data)?.select()?.single()
    
    if (error) throw error
    return result
  },

  // Read
  async read(table, query = {}) {
    let supabaseQuery = supabase?.from(table)?.select('*')
    
    // Apply filters
    if (query?.filters) {
      query?.filters?.forEach(filter => {
        supabaseQuery = supabaseQuery?.filter(filter?.column, filter?.operator, filter?.value)
      })
    }
    
    // Apply ordering
    if (query?.orderBy) {
      supabaseQuery = supabaseQuery?.order(query?.orderBy?.column, { 
        ascending: query?.orderBy?.ascending ?? false 
      })
    }
    
    // Apply limit
    if (query?.limit) {
      supabaseQuery = supabaseQuery?.limit(query?.limit)
    }
    
    const { data, error } = await supabaseQuery
    
    if (error) throw error
    return data || []
  },

  // Update
  async update(table, id, data) {
    const { data: result, error } = await supabase?.from(table)?.update(data)?.eq('id', id)?.select()?.single()
    
    if (error) throw error
    return result
  },

  // Delete
  async delete(table, id) {
    const { error } = await supabase?.from(table)?.delete()?.eq('id', id)
    
    if (error) throw error
    return true
  },

  // Get single record
  async getById(table, id) {
    const { data, error } = await supabase?.from(table)?.select('*')?.eq('id', id)?.single()
    
    if (error) throw error
    return data
  }
}

// Social Media specific services
export const socialMediaService = {
  // Get connected accounts for user
  async getConnectedAccounts(userId) {
    return await supabaseService?.read('social_accounts', {
      filters: [{ column: 'user_id', operator: 'eq', value: userId }],
      orderBy: { column: 'created_at', ascending: false }
    });
  },

  // Get posts for user
  async getPosts(userId, limit = 20) {
    return await supabaseService?.read('social_posts', {
      filters: [{ column: 'user_id', operator: 'eq', value: userId }],
      orderBy: { column: 'created_at', ascending: false },
      limit
    });
  },

  // Schedule a post
  async schedulePost(postData) {
    return await supabaseService?.create('social_posts', {
      ...postData,
      status: 'scheduled'
    });
  },

  // Get analytics data
  async getAnalytics(userId) {
    return await supabaseService?.read('post_analytics', {
      filters: [{ column: 'user_id', operator: 'eq', value: userId }]
    });
  },

  // Get content templates
  async getContentTemplates(userId) {
    return await supabaseService?.read('content_templates', {
      filters: [{ column: 'user_id', operator: 'eq', value: userId }],
      orderBy: { column: 'created_at', ascending: false }
    });
  }
}

// File storage service
export const storageService = {
  // Upload file
  async uploadFile(bucket, path, file, options = {}) {
    const { data, error } = await supabase?.storage?.from(bucket)?.upload(path, file, {
        upsert: options?.upsert || false,
        ...options
      })
    
    if (error) throw error
    return data
  },

  // Get file URL
  getPublicUrl(bucket, path) {
    const { data } = supabase?.storage?.from(bucket)?.getPublicUrl(path)
    
    return data?.publicUrl;
  },

  // Delete file
  async deleteFile(bucket, paths) {
    const { error } = await supabase?.storage?.from(bucket)?.remove(Array.isArray(paths) ? paths : [paths])
    
    if (error) throw error
    return true
  },

  // List files
  async listFiles(bucket, folder = '') {
    const { data, error } = await supabase?.storage?.from(bucket)?.list(folder)
    
    if (error) throw error
    return data || []
  }
}