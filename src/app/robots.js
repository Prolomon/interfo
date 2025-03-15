import { userAgent } from "next/server"
import sitemap from "./sitemap"

export default function robots() {
    return {
      rules: [
        {
          userAgent: 'Googlebot',
          allow: ['/'],
          disallow: [''],
        }
      ],
      sitemap: `${process.env.WATAWARA_BASE_URL}/sitemap.xml`,
    }
  }