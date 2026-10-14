import React from 'react'
import DashboardLayout from '../../Components/Admin/DashboardLayout'
import NewsletterSubscriptions from '../../Components/Admin/NewsletterSubscriptions'
import SEO from '../../Components/GeneralComponents/SEO'

function NewsletterSubscriptionsPage() {
  return (
    <>
      <SEO 
        title="Newsletter Subscriptions - Admin"
        description="View and manage newsletter subscriptions"
        keywords="newsletter, subscriptions, admin"
      />
      <DashboardLayout>
        <NewsletterSubscriptions />
      </DashboardLayout>
    </>
  )
}

export default NewsletterSubscriptionsPage