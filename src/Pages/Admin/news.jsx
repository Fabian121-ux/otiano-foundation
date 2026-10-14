import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../Components/Admin/DashboardLayout'
import SEO from '../../Components/GeneralComponents/SEO'
import ApiService, { getImageUrl } from '../../services/api'

function NewsManagement() {
  const [news, setNews] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await ApiService.getNews()
      setNews(response.data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await ApiService.deleteNews(id)
        setNews(news.filter(item => item.id !== id))
      } catch (error) {
        console.error('Error deleting news:', error)
        alert('Failed to delete news article')
      }
    }
  }

  return (
    <>
      <SEO 
        title="News Management"
        description="Manage news articles for Otinao Foundation for Development website."
        keywords="Otinao Foundation for Development admin, news management, content management"
      />
      <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">News Management</h2>
          <Link
            to="/admin/news/create"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-center text-sm sm:text-base"
          >
            Add New Article
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
          <input
            type="text"
            placeholder="Search news articles..."
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* News Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          {loading ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">Loading news...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base">No news articles found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto max-w-full">
              <div className="min-w-[640px]">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredNews.map((item) => (
                      <tr key={item.id}>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center">
                            {item.image ? (
                              <img
                                className="h-10 w-10 rounded object-cover mr-3 flex-shrink-0"
                                src={getImageUrl(item.image)}
                                alt=""
                                onError={(e) => {
                                  e.target.src = '/src/assets/homepage/thumb-profile-governance-01.webp'
                                }}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded bg-gray-200 mr-3 flex items-center justify-center flex-shrink-0">
                                <span className="text-gray-400 text-xs">No img</span>
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900">
                                {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.description.substring(0, 40)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/news/edit/${item.id}`}
                              className="text-red-600 hover:text-red-900 text-xs sm:text-sm"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 text-xs sm:text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
    </>
  )
}

export default NewsManagement