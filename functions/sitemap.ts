Deno.serve(async (req) => {
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

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
});