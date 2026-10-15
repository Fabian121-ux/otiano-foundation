import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !newsItem) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">News article not found</h1>
            <Link to="/latest-news" className="text-brand hover:text-brand">
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
      
      {/* Breadcrumb Section */}
      <section className="bg-neutral-50 pb-8 pt-32">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="text-sm text-neutral-600 mb-4">
            <Link to="/" className="hover:text-neutral-800">Home</Link> <span className="mx-2">›</span>
            <Link to="/latest-news" className="hover:text-neutral-800">Latest News</Link> <span className="mx-2">›</span>
            <span className="text-neutral-800">{newsItem.title}</span>
          </nav>
          <div className="text-sm text-neutral-500 mb-6">{newsItem.date}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8">
            {newsItem.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Featured Image */}
          <div className="mb-8">
            <img loading="lazy" decoding="async"
              src={getImageUrl(newsItem.image)}
              alt={newsItem.title}
              className="w-full max-h-[32rem] object-contain bg-neutral-50 rounded-card"
              onError={(e) => {
                e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/ofd-placeholder.svg'
                          e.currentTarget.alt = 'Otiano Foundation branded illustration; photograph unavailable'
              }}
            />
          </div>

          {/* Article Text */}
          <div className="prose max-w-none">
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              {newsItem.description}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
            {prevItem ? (
              <Link to={`/news/${prevItem.id}`} className="flex min-w-0 flex-1 items-center text-neutral-600 hover:text-brand transition-colors">
                <span className="text-2xl mr-2">‹</span>
                <span className="text-lg">{prevItem.title}</span>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextItem ? (
              <Link to={`/news/${nextItem.id}`} className="flex items-center text-neutral-600 hover:text-neutral-800 transition-colors">
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