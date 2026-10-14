import { useEffect } from 'react'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}) => {
  useEffect(() => {
    // Set page title
    document.title = title ? `${title} | Otiano Foundation for Development` : 'Otiano Foundation for Development'
    
    // Set or update meta tags
    const setMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    if (description) {
      setMetaTag('description', description)
    }
    
    if (keywords) {
      setMetaTag('keywords', keywords)
    }

    // Open Graph tags
    setMetaTag('og:title', title ? `${title} | Otiano Foundation for Development` : 'Otiano Foundation for Development', true)
    if (description) {
      setMetaTag('og:description', description, true)
    }
    setMetaTag('og:image', image, true)
    setMetaTag('og:url', url, true)
    setMetaTag('og:type', type, true)
    setMetaTag('og:site_name', 'Otiano Foundation for Development', true)

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', title ? `${title} | Otiano Foundation for Development` : 'Otiano Foundation for Development')
    if (description) {
      setMetaTag('twitter:description', description)
    }
    setMetaTag('twitter:image', image)

    // Additional meta tags
    setMetaTag('author', 'Otiano Foundation for Development')
    setMetaTag('robots', 'index, follow')
  }, [title, description, keywords, image, url, type])

  return null
}

export default SEO
