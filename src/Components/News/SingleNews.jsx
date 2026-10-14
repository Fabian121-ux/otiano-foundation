import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../GeneralComponents/Navbar'
import SEO from '../GeneralComponents/SEO'
import ApiService, { getImageUrl } from '../../services/api'

function SingleNews() {
  const { id } = useParams()
  const [newsItem, setNewsItem] = useState(null)
  const [allNews, setAllNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [newsResponse, allNewsResponse] = await Promise.all([
          ApiService.getNewsById(id),
          ApiService.getNews()
        ])
        setNewsItem(newsResponse.data)
        setAllNews(allNewsResponse.data || [])
      } catch (err) {
        setError('Failed to load news article')
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  if (loading) {
    return (
      <div>
        <Navbar isDark={true} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !newsItem) {
    return (
      <div>
        <Navbar isDark={true} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">News article not found</h1>
            <Link to="/latest-news" className="text-red-600 hover:text-red-600">
              Back to Latest News
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentIndex = allNews.findIndex(item => item.id === parseInt(id))
  const prevItem = currentIndex > 0 ? allNews[currentIndex - 1] : null
  const nextItem = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null
  return (
    <div>
      {newsItem && (
        <SEO 
          title={newsItem.title}
          description={newsItem.description.substring(0, 160) + '...'}
          keywords={`Otinao Foundation for Development news, ${newsItem.title}, community development, Nigeria foundation`}
          image={getImageUrl(newsItem.image)}
          type="article"
        />
      )}
      <Navbar isDark={true} />
      
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 pb-8 pt-32">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-gray-800">Home</Link> <span className="mx-2">›</span>
            <Link to="/latest-news" className="hover:text-gray-800">Latest News</Link> <span className="mx-2">›</span>
            <span className="text-gray-800">{newsItem.title}</span>
          </nav>
          <div className="text-sm text-gray-500 mb-6">{newsItem.date}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            {newsItem.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={getImageUrl(newsItem.image)}
              alt={newsItem.title}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/src/assets/homepage/thumb-profile-governance-01.webp'
              }}
            />
          </div>

          {/* Article Text */}
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {newsItem.description}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {prevItem ? (
              <Link to={`/news/${prevItem.id}`} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <span className="text-2xl mr-2">‹</span>
                <span className="text-lg">{prevItem.title}</span>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextItem ? (
              <Link to={`/news/${nextItem.id}`} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <span className="text-lg">{nextItem.title}</span>
                <span className="text-2xl ml-2">›</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SingleNews