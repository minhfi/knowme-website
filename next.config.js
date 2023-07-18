/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: [
      'd1c3lr9kt7lhan.cloudfront.net',
      'd1fby3v3g7qakk.cloudfront.net',
      'd21pzkss2gzxz9.cloudfront.net',
      'd2fby7wpfkd4gg.cloudfront.net',
      'd2uwv9uqeubk6h.cloudfront.net',
      'd31t3ri277a6kn.cloudfront.net',
      'd3chj5szj0ckpe.cloudfront.net',
      'd3f50mwgiugwpa.cloudfront.net',
      'd3fzesk872lp7c.cloudfront.net',
      'd9fw8rsrls9ox.cloudfront.net',
      'dl0in988jq9k0.cloudfront.net',
      'dp8kcbolpwtml.cloudfront.net',
      'via.placeholder.com'
    ],
  }
}

module.exports = nextConfig
