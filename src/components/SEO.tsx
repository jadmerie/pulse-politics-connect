import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  structuredData?: Record<string, any>;
}

const SEO = ({ title, description, canonicalPath, structuredData }: SEOProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical link
    const canonicalHref = `${window.location.origin}${canonicalPath}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    // Structured data JSON-LD
    const existingLd = document.getElementById('structured-data');
    if (existingLd) existingLd.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'structured-data';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalPath, structuredData]);

  return null;
};

export default SEO;
