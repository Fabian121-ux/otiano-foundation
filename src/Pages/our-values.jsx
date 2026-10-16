import OurValues from '../Components/OurValues/OurValues'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
// import Quote from '../Components/OurValues/Quote'
import SEO from '../Components/GeneralComponents/SEO'
// import CoreValues from '../Components/OurValues/CoreValues'

function ourvalues() {
  return (
    <div>
      <SEO 
        title="Our Values"
        description="Explore Otiano Foundation for Development's core values that guide our work in education, healthcare, and community development across Nigeria."
        keywords="Otiano Foundation for Development values, core values, integrity, excellence, community service, Nigeria foundation principles"
      />
      <Navbar />
      <OurValues />
      {/* <CoreValues /> */}
      {/* <Quote /> */}
      <Footer />
    </div>
  )
}

export default ourvalues