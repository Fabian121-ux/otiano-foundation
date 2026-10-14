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

  const itemsPerPage = 4
  const maxIndex = Math.max(0, newsItems.length - itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Latest News</h2>
            <p className="text-gray-600">Read our regional, national, and global media coverage.</p>
          </div>
          
          {newsItems.length > 0 && (
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {newsItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-100 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                <path d="M2 3h20a1 1 0 011 1v16a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h18V5H3z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">News & Updates</h3>
            <p className="text-gray-600 mb-8">We are building a growing record of stories, insights, and updates from our work across communities.</p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Our News section will soon feature:</h4>
              <ul className="text-gray-600 space-y-2 max-w-md mx-auto text-left">
                <li>• Program announcements and milestones</li>
                <li>• Community impact stories</li>
                <li>• Partnerships and events</li>
                <li>• Reports and thought leadership</li>
              </ul>
            </div>
            
            <p className="text-red-600 font-semibold text-lg">Coming Soon.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {newsItems.map((item) => (
                <div key={item.id} className="w-1/4 flex-shrink-0 px-3">
                  <div className="group">
                    <div className="mb-4">
                      <img 
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/src/assets/homepage/thumb-profile-governance-01.webp'
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {item.date} · {item.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <Link 
                      to={`/news/${item.id}`} 
                      className="text-red-600 font-medium hover:underline text-sm"
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