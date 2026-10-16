import EmptyState from '../GeneralComponents/EmptyState'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiService, { getImageUrl } from '../../services/api'

function News() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await ApiService.getNews()
        setNewsItems(response.data || [])
      } catch (err) {
        setError('Failed to load news')
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const [itemsPerPage, setItemsPerPage] = useState(1)

  useEffect(() => {
    const small = window.matchMedia('(min-width: 640px)')
    const large = window.matchMedia('(min-width: 1024px)')
    const updatePageSize = () => {
      setItemsPerPage(large.matches ? 4 : small.matches ? 2 : 1)
      setCurrentIndex(0)
    }
    updatePageSize()
    small.addEventListener('change', updatePageSize)
    large.addEventListener('change', updatePageSize)
    return () => {
      small.removeEventListener('change', updatePageSize)
      large.removeEventListener('change', updatePageSize)
    }
  }, [])
  const maxIndex = Math.max(0, newsItems.length - itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  if (loading) {
    return (
      <section className="bg-white section-space">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-neutral-600 max-w-prose">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white section-space">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-brand">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white section-space">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">Latest News</h2>
            <p className="text-neutral-600 max-w-prose">Published news and activity updates from the Foundation.</p>
          </div>
          
          {newsItems.length > 0 && (
            <div className="flex gap-2">
              <button 
                aria-label="Previous news articles"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="min-h-11 min-w-11 p-2 rounded-full border border-neutral-300 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                aria-label="Next news articles"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="p-2 rounded-full border border-neutral-300 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {newsItems.length === 0 ? (
          <EmptyState title="Foundation news"><p>Published announcements and confirmed activity updates will appear here. Contact OFD for current programme enquiries.</p></EmptyState>
        ) : (
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {newsItems.map((item) => (
                <div key={item.id} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3">
                  <div className="group">
                    <div className="mb-4">
                      <img loading="lazy" decoding="async"
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-card"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/ofd-placeholder.svg'
                          e.currentTarget.alt = 'Otiano Foundation branded illustration; photograph unavailable'
                        }}
                      />
                    </div>
                    <div className="text-sm text-neutral-500 mb-2">
                      {item.date} · {item.category}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-3 group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 max-w-prose">
                      {item.description}
                    </p>
                    <Link 
                      to={`/news/${item.id}`} 
                      className="text-brand font-medium hover:underline text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default News