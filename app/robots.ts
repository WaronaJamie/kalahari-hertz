// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicitly allow major AI crawlers
      { userAgent: 'GPTBot', allow: '/' },          // OpenAI (ChatGPT)
      { userAgent: 'OAI-SearchBot', allow: '/' },   // OpenAI Search
      { userAgent: 'PerplexityBot', allow: '/' },   // Perplexity
      { userAgent: 'Google-Extended', allow: '/' }, // Google AI (Gemini)
    ],
    sitemap: 'https://kalaharihertz.co.bw/sitemap.xml',
  }
}