import React, { useEffect } from "react";

export default function Sitemap() {
  const baseUrl = "https://puraweb.cr";
  const currentDate = new Date().toISOString().split('T')[0];

  const pages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/Home", priority: "1.0", changefreq: "weekly" },
    { url: "/Servicios", priority: "0.9", changefreq: "monthly" },
    { url: "/Planes", priority: "0.9", changefreq: "monthly" },
    { url: "/Nosotros", priority: "0.8", changefreq: "monthly" },
    { url: "/Contacto", priority: "0.8", changefreq: "monthly" },
    { url: "/Support", priority: "0.7", changefreq: "monthly" },
    { url: "/GuiaBienvenida", priority: "0.6", changefreq: "monthly" },
    { url: "/PoliticasPrivacidad", priority: "0.5", changefreq: "yearly" },
    { url: "/TerminosCondiciones", priority: "0.5", changefreq: "yearly" },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  useEffect(() => {
    // Copy sitemap to clipboard for easy access
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(sitemapXml);
      } catch (err) {
        // Clipboard access may be denied
      }
    };
    copyToClipboard();
  }, [sitemapXml]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sitemapXml);
      alert("Sitemap copiado al portapapeles");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = sitemapXml;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Sitemap copiado al portapapeles");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([sitemapXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sitemap XML</h1>
        <p className="text-gray-600 mb-6">
          Copia este contenido y súbelo como <code className="bg-gray-200 px-2 py-1 rounded">sitemap.xml</code> en la raíz de tu dominio, o envíalo directamente a Google Search Console.
        </p>
        
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Copiar al Portapapeles
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Descargar sitemap.xml
          </button>
        </div>

        <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
          {sitemapXml}
        </pre>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-900 mb-2">Instrucciones para Google Search Console:</h2>
          <ol className="list-decimal list-inside text-blue-800 space-y-1 text-sm">
            <li>Descarga el archivo sitemap.xml</li>
            <li>Súbelo a la raíz de tu dominio (https://puraweb.cr/sitemap.xml)</li>
            <li>Ve a <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="underline">Google Search Console</a></li>
            <li>Selecciona tu propiedad y ve a "Sitemaps"</li>
            <li>Ingresa la URL del sitemap y envíalo</li>
          </ol>
        </div>
      </div>
    </div>
  );
}