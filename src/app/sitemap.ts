import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://youthpolicyawards.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/awards`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/notice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Awards 동적 페이지
  const awardsDir = path.join(process.cwd(), 'src/content/awards');
  let awardPages: MetadataRoute.Sitemap = [];

  if (fs.existsSync(awardsDir)) {
    const folders = fs.readdirSync(awardsDir);
    awardPages = folders
      .filter(folder => {
        const folderPath = path.join(awardsDir, folder);
        return fs.statSync(folderPath).isDirectory();
      })
      .map(folder => ({
        url: `${BASE_URL}/awards/${folder}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
  }

  // News 동적 페이지
  const newsDir = path.join(process.cwd(), 'src/content/news');
  let newsPages: MetadataRoute.Sitemap = [];

  if (fs.existsSync(newsDir)) {
    const folders = fs.readdirSync(newsDir);
    newsPages = folders
      .filter(folder => {
        const folderPath = path.join(newsDir, folder);
        return fs.statSync(folderPath).isDirectory();
      })
      .map(folder => ({
        url: `${BASE_URL}/news/${folder}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }));
  }

  // Notice 동적 페이지
  const noticeDir = path.join(process.cwd(), 'src/content/notices');
  let noticePages: MetadataRoute.Sitemap = [];

  if (fs.existsSync(noticeDir)) {
    const folders = fs.readdirSync(noticeDir);
    noticePages = folders
      .filter(folder => {
        const folderPath = path.join(noticeDir, folder);
        return fs.statSync(folderPath).isDirectory();
      })
      .map(folder => ({
        url: `${BASE_URL}/notice/${folder}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }));
  }

  return [...staticPages, ...awardPages, ...newsPages, ...noticePages];
}
