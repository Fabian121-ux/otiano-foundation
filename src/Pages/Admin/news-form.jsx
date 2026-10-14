import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../Components/Admin/DashboardLayout'
import SEO from '../../Components/GeneralComponents/SEO'
import ApiService, { getImageUrl } from '../../services/api'

function NewsForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    image: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (isEdit) {
      fetchNewsItem()
    }
  }, [id, isEdit])

  const fetchNewsItem = async () => {
    try {
      const response = await ApiService.getNewsById(id)
      const newsData = response.data
      setFormData({
        title: newsData.title || '',
        description: newsData.description || '',
        date: newsData.date || '',
        image: getImageUrl(newsData.image)
      })
    } catch (error) {
      console.error('Error fetching news item:', error)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      let imageUrl = formData.image
      
      // Handle image upload if new file selected
      if (imageFile) {
        try {
          const uploadResult = await ApiService.uploadImage(imageFile)
          imageUrl = uploadResult.url
        } catch (uploadError) {
          console.error('Upload failed:', uploadError)
          throw new Error('Failed to upload image')
        }
      }
      
      const newsData = {
        ...formData,
        category: 'News',
        image: imageUrl
      }
      
      if (isEdit) {
        await ApiService.updateNews(id, newsData)
      } else {
        await ApiService.createNews(newsData)
      }
      
      setMessage({ type: 'success', text: `News article ${isEdit ? 'updated' : 'created'} successfully!` })
      setTimeout(() => navigate('/admin/news'), 2000)
    } catch (error) {
      console.error('Error saving news:', error)
      setMessage({ type: 'error', text: 'Failed to save news article. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <SEO 
        title={isEdit ? 'Edit News Article' : 'Create News Article'}
        description={`${isEdit ? 'Edit' : 'Create'} news articles for Otinao Foundation for Development website.`}
        keywords="Otinao Foundation for Development admin, news form, content management"
      />
      <DashboardLayout>
      <div className="w-full max-w-full sm:max-w-2xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit News Article' : 'Create New Article'}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 max-w-full overflow-hidden">
          {message.text && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-md text-sm sm:text-base ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="text"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={6}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/news')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')} Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
    </>
  )
}

export default NewsForm