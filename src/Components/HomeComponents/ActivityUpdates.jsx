import { Link } from 'react-router-dom'
import { documentedActivities } from '../../data/documentedActivities'

function ActivityUpdates({ activities = documentedActivities }) {
  return (
    <section id="activities" className="section-space bg-white" aria-labelledby="activities-heading">
      <div className="site-container">
        <div className="section-intro">
          <p className="section-eyebrow">From our communities</p>
          <h2 id="activities-heading" className="section-heading">Activities &amp; Updates</h2>
          <p className="reading-copy">A place for documented OFD activities, with photographs, dates, locations, and practical updates.</p>
        </div>
        {activities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <article key={activity.id} className="ofd-card overflow-hidden">
                <img src={activity.image} alt={activity.imageAlt} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
                <div className="space-y-3 p-5 sm:p-6">
                  <time dateTime={activity.date} className="text-sm font-medium text-brand">{new Date(activity.date + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>
                  <h3 className="text-xl font-semibold text-neutral-900">{activity.title}</h3>
                  <p className="text-sm font-medium text-neutral-600">{activity.location}</p>
                  <p className="reading-copy">{activity.summary}</p>
                  {activity.href && <Link to={activity.href} className="ofd-text-link">Read more <span className="sr-only">about {activity.title}</span><span aria-hidden="true">→</span></Link>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="ofd-card max-w-3xl border-l-4 border-l-brand p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-neutral-900">Documented activity updates</h3>
            <p className="reading-copy">Updates will be published here as activity records and photographs are confirmed. For current programme enquiries, please contact the Foundation.</p>
            <Link to="/contact" className="ofd-text-link mt-5">Contact OFD <span aria-hidden="true">→</span></Link>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/latest-news" className="ofd-text-link">News <span aria-hidden="true">→</span></Link>
          <Link to="/events" className="ofd-text-link">Events <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}

export default ActivityUpdates
