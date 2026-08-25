/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['gmiu.edu.in', 'www.emmanuelbundi.com', 'tpargumentacion.wordpress.com', 'www.shutterstock.com', 'www.2classnotes.com', 'encrypted-tbn0.gstatic.com', 'www.playlsi.com', 'motorfloor.com', 't3.ftcdn.net', 's7ap1.scene7.com', 'www.complan.in', 'static.vecteezy.com'],
  },
}

module.exports = nextConfig
