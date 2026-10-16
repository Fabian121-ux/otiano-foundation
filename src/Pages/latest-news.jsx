import LatestNews from '../Components/News/LatestNews'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
import SEO from '../Components/GeneralComponents/SEO'

function latestnews() {
  return (
    <>
      <SEO 
        title="Latest News"
        description="Stay updated with the latest news and updates from Otiano Foundation for Development's community development projects and initiatives."
        keywords="Otiano Foundation for Development news, latest updates, community projects, foundation announcements, Nigeria development news"
      />
      <Navbar />
      <LatestNews />
      <Footer />
    </>
  )
}

export default latestnews