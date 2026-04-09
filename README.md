# AICord Documentation
This repository holds MDX & MD files for AICord's documentation page

## Collaboration
Pull requests are welcome

## Docs Page SEO

Docs pages support SEO metadata via frontmatter.

### Are all tags required?

No. Only `title` and `description` are strongly recommended.
Everything else is optional and can be set only where needed.

When fields are missing:

- Canonical is auto-generated (`/docs` or `/docs/<slug>`)
- Open Graph and Twitter fields fall back to `title`/`description` where possible
- Robots uses default behavior unless explicitly set

### Minimal example

```md
---
title: Webhooks
description: Learn how to configure webhook mode for AICord characters.
---
```

### Full example

```md
---
title: Webhooks Guide
description: Configure webhook mode for production-grade character delivery.
keywords: [aicord, webhook, discord bot]
canonical: /docs/guides/webhooks

noindex: false
nofollow: false
robots:
  index: true
  follow: true
  noarchive: false
  nosnippet: false
  noimageindex: false
  googleBot:
    index: true
    follow: true
    max-image-preview: large
    max-video-preview: 120
    max-snippet: -1

author: AICord Team
authors: [AICord Team, Docs Team]
creator: AICord
publisher: AICord
category: Documentation
classification: Technical Docs
applicationName: AICord Docs
referrer: origin-when-cross-origin

ogTitle: Webhooks Guide - AICord Docs
ogDescription: Configure webhook mode for production-grade character delivery.
ogType: article
ogUrl: /docs/guides/webhooks
ogSiteName: AICord Docs
ogLocale: en_US
ogImage:
  url: /assets/brand/docs-webhooks.png
  alt: AICord webhook docs cover image
  width: 1200
  height: 630

twitterCard: summary_large_image
twitterTitle: Webhooks Guide - AICord Docs
twitterDescription: Configure webhook mode for production-grade character delivery.
twitterImage: /assets/brand/docs-webhooks.png
twitterCreator: "@aicordapp"
twitterSite: "@aicordapp"

googleSiteVerification: your-google-verification-token
yandexVerification: your-yandex-token
yahooVerification: your-yahoo-token
bingVerification: your-bing-token

meta:
  "theme-color": "#0e101a"
  "apple-mobile-web-app-capable": "yes"
---
```

### Supported frontmatter keys

| Purpose | Supported keys |
| --- | --- |
| Title | `title`, `seoTitle`, `metaTitle` |
| Description | `description`, `excerpt`, `seoDescription`, `metaDescription` |
| Keywords | `keywords`, `tags` |
| Canonical | `canonical`, `permalink` |
| Metadata base URL | `metadataBase`, `siteUrl`, `baseUrl` |
| Robots (simple) | `robots` (string), `noindex`, `noIndex`, `nofollow`, `noFollow` |
| Robots (advanced) | `robots.index`, `robots.follow`, `robots.noarchive`, `robots.nosnippet`, `robots.noimageindex`, `robots.nocache`, `robots.googleBot.*` |
| OG title | `ogTitle`, `og:title`, `openGraph.title` |
| OG description | `ogDescription`, `og:description`, `openGraph.description` |
| OG type | `ogType`, `og:type`, `openGraph.type` |
| OG URL | `ogUrl`, `og:url`, `openGraph.url` |
| OG site name | `ogSiteName`, `og:site_name`, `openGraph.siteName` |
| OG locale | `ogLocale`, `og:locale`, `openGraph.locale` |
| OG image(s) | `ogImage`, `og:image`, `image`, `openGraph.images` |
| Article timing/tags | `publishedTime`, `article:published_time`, `modifiedTime`, `article:modified_time`, `lastUpdated`, `openGraph.tags` |
| Twitter card | `twitterCard`, `twitter:card`, `twitter.card` |
| Twitter title | `twitterTitle`, `twitter:title`, `twitter.title` |
| Twitter description | `twitterDescription`, `twitter:description`, `twitter.description` |
| Twitter image(s) | `twitterImage`, `twitter:image`, `twitter.images` |
| Twitter account fields | `twitterCreator`, `twitter:creator`, `twitter.creator`, `twitterSite`, `twitter:site`, `twitter.site` |
| Authors | `author`, `authors` |
| Generic metadata | `creator`, `publisher`, `applicationName`, `category`, `classification`, `referrer` |
| Verification | `googleSiteVerification`, `google-site-verification`, `verificationGoogle`, `yandexVerification`, `yandex`, `yahooVerification`, `y_key`, `bingVerification`, `msvalidate.01` |
| Custom meta passthrough | `meta`, `other`, `customMeta` |

### Notes

- `ogImage` and `twitterImage` support string, comma-separated string, array, or object (`url`, `alt`, `width`, `height`).
- `keywords` supports comma-separated string or array.
- `author` can be a string; `authors` can be an array.
- `robots.googleBot.max-image-preview` must be one of: `none`, `standard`, `large`.
