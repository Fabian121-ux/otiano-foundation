import StrategicPlan from '../Components/StrategicPlan/StrategicPlan'
// import Quote from '../Components/StrategicPlan/Quote'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
import SEO from '../Components/GeneralComponents/SEO'

function strategicplan() {
  return (
    <>
      <SEO 
        title="Strategic Plan"
        description="Learn about Otiano Foundation for Development's strategic plan, goals, and roadmap for sustainable community development and social impact."
        keywords="Otiano Foundation for Development strategic plan, development goals, community strategy, Nigeria foundation planning, social impact strategy"
      />
      <Navbar />
      <StrategicPlan />
      {/* <Quote /> */}
      <Footer />
    </>
  )
}

export default strategicplan