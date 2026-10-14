import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../Components/Admin/DashboardLayout'
import SEO from '../../Components/GeneralComponents/SEO'
import ApiService, { getImageUrl } from '../../services/api'

function EventsForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Conference',
    date: '',
    time: '',
    location: '',
    venue: '',
    image: '',
    agenda: [{ time: '', activity: '' }],
    speakers: [{ name: '', title: '' }]
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (isEdit) {
      fetchEventItem()
    }
  }, [id, isEdit])

  const fetchEventItem = async () => {
    try {
      const response = await ApiService.getEventById(id)
      const eventData = response.data
      setFormData({
        title: eventData.title || '',
        description: eventData.description || '',
        category: eventData.category || 'Conference',
        date: eventData.date || '',
        time: eventData.time || '',
        location: eventData.location || '',
        venue: eventData.venue || '',
        image: getImageUrl(eventData.image),
        agenda: eventData.agenda || [{ time: '', activity: '' }],
        speakers: eventData.speakers || [{ name: '', title: '' }]
      })
    } catch (error) {
      console.error('Error fetching event item:', error)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
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
      
      if (imageFile) {
        try {
          const uploadResult = await ApiService.uploadImage(imageFile)
          imageUrl = uploadResult.url
        } catch (uploadError) {
          console.error('Upload failed:', uploadError)
          throw new Error('Failed to upload image')
        }
      }
      
      const eventData = {
        ...formData,
        status: 'upcoming',
        image: imageUrl
      }
      
      if (isEdit) {
        await ApiService.updateEvent(id, eventData)
      } else {
        await ApiService.createEvent(eventData)
      }
      
      setMessage({ type: 'success', text: `Event ${isEdit ? 'updated' : 'created'} successfully!` })
      setTimeout(() => navigate('/admin/events'), 2000)
    } catch (error) {
      console.error('Error saving event:', error)
      setMessage({ type: 'error', text: 'Failed to save event. Please try again.' })
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

  const handleAgendaChange = (index, field, value) => {
    const newAgenda = [...formData.agenda]
    newAgenda[index][field] = value
    setFormData({ ...formData, agenda: newAgenda })
  }

  const addAgendaItem = () => {
    setFormData({
      ...formData,
      agenda: [...formData.agenda, { time: '', activity: '' }]
    })
  }

  const removeAgendaItem = (index) => {
    const newAgenda = formData.agenda.filter((_, i) => i !== index)
    setFormData({ ...formData, agenda: newAgenda })
  }

  const handleSpeakerChange = (index, field, value) => {
    const newSpeakers = [...formData.speakers]
    newSpeakers[index][field] = value
    setFormData({ ...formData, speakers: newSpeakers })
  }

  const addSpeaker = () => {
    setFormData({
      ...formData,
      speakers: [...formData.speakers, { name: '', title: '' }]
    })
  }

  const removeSpeaker = (index) => {
    const newSpeakers = formData.speakers.filter((_, i) => i !== index)
    setFormData({ ...formData, speakers: newSpeakers })
  }

  return (
    <>
      <SEO 
        title={isEdit ? 'Edit Event' : 'Create Event'}
        description={`${isEdit ? 'Edit' : 'Create'} events for Otinao Foundation for Development website.`}
        keywords="Otinao Foundation for Development admin, events form, content management"
      />
      <DashboardLayout>
      <div className="w-full max-w-full sm:max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Event' : 'Create New Event'}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 max-w-full overflow-hidden">
          {message.text && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-md text-sm sm:text-base ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-full">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
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
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Summit">Summit</option>
                  <option value="Forum">Forum</option>
                  <option value="Awards">Awards</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="March 15, 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Lagos, Nigeria"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Eko Hotel & Suites"
                />
              </div>
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
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Agenda Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Agenda
                </label>
                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="text-red-600 hover:text-red-600 text-sm"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-3">
                {formData.agenda.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Time"
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={item.time}
                      onChange={(e) => handleAgendaChange(index, 'time', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Activity"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={item.activity}
                      onChange={(e) => handleAgendaChange(index, 'activity', e.target.value)}
                    />
                    {formData.agenda.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAgendaItem(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Speakers
                </label>
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="text-red-600 hover:text-red-600 text-sm"
                >
                  + Add Speaker
                </button>
              </div>
              <div className="space-y-3">
                {formData.speakers.map((speaker, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Speaker Name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={speaker.name}
                      onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Title/Position"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={speaker.title}
                      onChange={(e) => handleSpeakerChange(index, 'title', e.target.value)}
                    />
                    {formData.speakers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/events')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')} Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
    </>
  )
}

export default EventsForm