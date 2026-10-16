const values = [
  { title: 'Integrity', text: 'Being accurate about our work, responsible with resources, and clear about plans and confirmed activities.' },
  { title: 'Inclusivity', text: 'Listening to different community voices and considering barriers to participation.' },
]

function CoreValues() {
  return (
    <section className="section-space bg-neutral-50">
      <div className="site-container">
        <h2 className="section-heading">Core Values</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <article key={value.title} className="ofd-card p-6">
              <h3 className="mb-3 text-xl font-semibold text-brand">{value.title}</h3>
              <p className="reading-copy">{value.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
