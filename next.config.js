/** @type {import('next').NextConfig} */
const nextConfig = {

    async redirects() {
        return [
          {
            source: '/sitemap.xml',
            destination: '/sitemap.xml/route',
            permanent: true,
          },
        ];
      },
}

module.exports = nextConfig
