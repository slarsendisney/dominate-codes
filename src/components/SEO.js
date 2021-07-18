import React from "react"
import { Helmet } from "react-helmet-async"

function SEO({ description, lang = "enGB", meta, title = "Play" }) {
  const site = {
    siteMetadata: {
      title: "Dominate.Codes",
      social: {
        twitter: "samlarsendisney",
      },
      description:
        "The fastest way to improve your computer science knowledge. Dominate your next coding interview.",
    },
  }
  const metaDescription = description || site.siteMetadata.description
  let cardUrl = "https://dominate.codes/meta-preview-image.png"
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s · ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${title} · ${site.siteMetadata.title}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: cardUrl,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: `${title} · ${site.siteMetadata.title}`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: cardUrl,
        },
      ]}
    />
  )
}

export default SEO
