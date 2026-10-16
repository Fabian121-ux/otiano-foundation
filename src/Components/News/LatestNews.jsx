import EmptyState from '../GeneralComponents/EmptyState'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiService, { getImageUrl } from '../../services/api'

function LatestNews() {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await ApiService.getNews()
        setNewsData(response.data || [])
      } catch (err) {
        setError('Failed to load news')
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-neutral-600 max-w-prose">Loading news...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-brand mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-hover"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-brand mb-4">Latest News</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium">
News, announcements, and documented updates from the Foundation.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="bg-white section-space">
        <div className="max-w-7xl mx-auto px-6">
          {newsData.length === 0 ? (
            <EmptyState title="Foundation news"><p>Published announcements and confirmed activity updates will appear here. Contact OFD for current programme enquiries.</p></EmptyState>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsData.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`} className="bg-white rounded-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src={getImageUrl(item.image)} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/ofd-placeholder.svg'
                          e.currentTarget.alt = 'Otiano Foundation branded illustration; photograph unavailable'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-neutral-500 mb-2">
                      {item.date} • {item.category}
                    </div>
                    <h3 className="text-lg font-extrabold text-neutral-900 mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3 max-w-prose">
                      {item.description}
                    </p>
                    <span className="text-brand font-medium text-sm hover:text-brand transition-colors">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default LatestNews