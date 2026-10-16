import Trustees from '../Components/Trustees/Trustess'
// import Quote from '../Components/StrategicPlan/Quote'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
import SEO from '../Components/GeneralComponents/SEO'

function trustees() {
  return (
    <>
      <SEO 
        title="Board of Trustees"
        description="Meet Otiano Foundation for Development's dedicated Board of Trustees who provide leadership and governance for our community development initiatives."
        keywords="Otiano Foundation for Development trustees, board members, foundation leadership, governance, Nigeria foundation board"
      />
      <Navbar />
      <Trustees />
      <Footer />
    </>
  )
}

export default trustees