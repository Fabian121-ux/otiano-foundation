const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:8000/uploads'

// Helper function to get full upload URL
export const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath.startsWith('/src/assets/')) return '/images/ofd-placeholder.svg'
  if (/^(https?:|data:|blob:)/.test(imagePath) || imagePath.startsWith('/images/')) return imagePath
  return `${UPLOAD_URL}/${imagePath}`
}

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('adminToken')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Upload
  static async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)

    // Note: We use fetch directly here because we need to send FormData, not JSON
    // and we don't want the default Content-Type header
    const url = `${API_BASE_URL}/upload.php`
    const token = localStorage.getItem('adminToken')
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Image upload failed')
    }
    
    return data
  }

  // Authentication
  static async login(credentials) {
    return this.request('/auth.php', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  // News API
  static async getNews() {
    return this.request('/news.php')
  }

  static async getNewsById(id) {
    return this.request(`/news.php?id=${id}`)
  }

  static async createNews(newsData) {
    return this.request('/news.php', {
      method: 'POST',
      body: JSON.stringify(newsData)
    })
  }

  static async updateNews(id, newsData) {
    return this.request(`/news.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData)
    })
  }

  static async deleteNews(id) {
    return this.request(`/news.php?id=${id}`, {
      method: 'DELETE'
    })
  }

  // Events API
  static async getEvents() {
    return this.request('/events.php')
  }

  static async getEventById(id) {
    return this.request(`/events.php?id=${id}`)
  }

  static async createEvent(eventData) {
    return this.request('/events.php', {
      method: 'POST',
      body: JSON.stringify(eventData)
    })
  }

  static async updateEvent(id, eventData) {
    return this.request(`/events.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    })
  }

  static async deleteEvent(id) {
    return this.request(`/events.php?id=${id}`, {
      method: 'DELETE'
    })
  }

  // Event Registrations API
  static async registerForEvent(eventId, registrationData) {
    return this.request('/registrations.php', {
      method: 'POST',
      body: JSON.stringify({
        event_id: eventId,
        ...registrationData
      })
    })
  }

  static async getEventRegistrations() {
    return this.request('/registrations.php')
  }

  // Newsletter API
  static async subscribeToNewsletter(email) {
    return this.request('/newsletter.php', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  static async getNewsletterSubscriptions() {
    return this.request('/newsletter.php')
  }

  // Event Feedback API
  static async submitEventFeedback(feedbackData) {
    return this.request('/event-feedback.php', {
      method: 'POST',
      body: JSON.stringify(feedbackData)
    })
  }

  static async getEventFeedback() {
    return this.request('/event-feedback.php')
  }
}

export default ApiService