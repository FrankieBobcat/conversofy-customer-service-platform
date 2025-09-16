import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  article?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: object | object[];
}

const defaultProps: Required<Omit<SEOProps, 'article' | 'structuredData'>> = {
  title: 'Conversofy - AI-Powered Customer Service Automation',
  description: 'Transform your customer service with AI chatbots and automation solutions. Simple, effective, and affordable customer service tools for businesses of all sizes.',
  keywords: 'AI chatbot, customer service automation, customer support, AI customer service, chatbot platform, automated support, customer service software',
  image: '/images/og-default.jpg',
  url: '',
  type: 'website'
};

// Helper function to get current URL
const getCurrentUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return 'https://conversofy.com';
};

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  article,
  structuredData
}: SEOProps) {
  const seo = {
    title: title || defaultProps.title,
    description: description || defaultProps.description,
    keywords: keywords || defaultProps.keywords,
    image: image || defaultProps.image,
    url: url || getCurrentUrl(),
    type
  };

  // Format full title with site name
  const fullTitle = title ? `${title} | Conversofy` : seo.title;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content="Conversofy" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content="@conversofy" />
      <meta name="twitter:creator" content="@conversofy" />
      
      {/* Article-specific meta tags */}
      {article && type === 'article' && (
        <>
          <meta property="article:author" content={article.author} />
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Conversofy Team" />
      <link rel="canonical" href={seo.url} />
      
      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
}

// Structured Data Generators
export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://conversofy.com/#organization",
  "name": "Conversofy",
  "url": "https://conversofy.com",
  "logo": "https://conversofy.com/logo.png",
  "description": "AI-powered customer service automation platform providing chatbots and customer support solutions for businesses of all sizes.",
  "foundingDate": "2023",
  "sameAs": [
    "https://twitter.com/conversofy",
    "https://linkedin.com/company/conversofy"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@conversofy.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://conversofy.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const createWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://conversofy.com/#website",
  "url": "https://conversofy.com",
  "name": "Conversofy - AI Customer Service Automation",
  "description": "Transform your customer service with AI chatbots and automation solutions",
  "publisher": {
    "@id": "https://conversofy.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://conversofy.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@id": "https://conversofy.com/#organization"
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate || article.publishedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});