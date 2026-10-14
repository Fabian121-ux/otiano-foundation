import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../Components/Admin/DashboardLayout'
import SEO from '../../Components/GeneralComponents/SEO'
import ApiService from '../../services/api'

function Dashboard() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0
  })
  const [recentNews, setRecentNews] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [newsResponse, eventsResponse, registrationsResponse] = await Promise.all([
          ApiService.getNews(),
          ApiService.getEvents(),
          ApiService.getEventRegistrations()
        ])

        const newsData = newsResponse.data || []
        const eventsData = eventsResponse.data || []
        const registrationsData = registrationsResponse.data || []
        const upcomingEventsData = eventsData.filter(event => event.status === 'upcoming')

        setStats({
          totalNews: newsData.length,
          totalEvents: eventsData.length,
          upcomingEvents: upcomingEventsData.length,
          totalRegistrations: registrationsData.length
        })

        setRecentNews(newsData.slice(0, 5))
        setUpcomingEvents(upcomingEventsData.slice(0, 5))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statsArray = [
    { label: 'Total News Articles', value: stats.totalNews, icon: '📰' },
    { label: 'Total Events', value: stats.totalEvents, icon: '📅' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: '🔜' },
    { label: 'Event Registrations', value: stats.totalRegistrations, icon: '👥' },
  ]

  return (
    <>
      <SEO 
        title="Admin Dashboard"
        description="Otinao Foundation for Development admin dashboard for managing website content, news, and events."
        keywords="Otinao Foundation for Development admin, dashboard, content management"
      />
      <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border animate-pulse">
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded mr-3 sm:mr-4"></div>
                  <div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-2"></div>
                    <div className="h-4 sm:h-6 bg-gray-200 rounded w-8 sm:w-12"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            statsArray.map((stat, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-3 sm:mr-4">{stat.icon}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent News */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent News Articles</h3>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="space-y-3 sm:space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentNews.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No news articles found</p>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {recentNews.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 text-xs sm:text-sm truncate">{item.title.substring(0, 40)}...</h4>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full ml-2 flex-shrink-0">
                        Published
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Upcoming Events</h3>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="space-y-3 sm:space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No upcoming events</p>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {upcomingEvents.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 text-xs sm:text-sm truncate">{item.title.substring(0, 40)}...</h4>
                        <p className="text-xs text-gray-500">{item.date} • {item.location}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full ml-2 flex-shrink-0">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </>
  )
}

export default Dashboard