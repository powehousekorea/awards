import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'powehousekorea/awards',
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: '청년정책 어워즈 CMS',
    },
  },
  singletons: {
    // 사이트 설정
    siteSettings: singleton({
      label: '사이트 설정',
      path: 'src/content/settings/site',
      schema: {
        siteName: fields.text({ label: '사이트명', validation: { isRequired: true } }),
        siteDescription: fields.text({ label: '사이트 설명', multiline: true }),
        heroTitle: fields.text({ label: '히어로 타이틀' }),
        heroSubtitle: fields.text({ label: '히어로 서브타이틀', multiline: true }),
        heroVideoUrl: fields.url({ label: '히어로 영상 URL (YouTube)' }),
        footerText: fields.text({ label: '푸터 텍스트' }),
      },
    }),
    // 어워즈 소개
    about: singleton({
      label: '어워즈 소개',
      path: 'src/content/settings/about',
      schema: {
        title: fields.text({ label: '제목', validation: { isRequired: true } }),
        content: fields.mdx({ label: '소개 내용' }),
        vision: fields.text({ label: '비전', multiline: true }),
        mission: fields.text({ label: '미션', multiline: true }),
      },
    }),
  },
  collections: {
    // 8대 분야 카테고리
    categories: collection({
      label: '정책 분야 (8대 분야)',
      slugField: 'name',
      path: 'src/content/categories/*',
      schema: {
        name: fields.slug({ name: { label: '분야명', validation: { isRequired: true } } }),
        description: fields.text({ label: '설명', multiline: true }),
        icon: fields.text({ label: '아이콘 (이모지 또는 아이콘명)' }),
        order: fields.integer({ label: '정렬 순서', defaultValue: 0 }),
        color: fields.text({ label: '대표 색상 (HEX)', defaultValue: '#1e3a5f' }),
      },
    }),
    // 정책 아카이브
    policies: collection({
      label: '정책 아카이브',
      slugField: 'title',
      path: 'src/content/policies/*',
      schema: {
        title: fields.slug({ name: { label: '정책명', validation: { isRequired: true } } }),
        category: fields.relationship({
          label: '분야',
          collection: 'categories',
        }),
        providerType: fields.select({
          label: '제공 기관 유형',
          options: [
            { label: '중앙정부', value: 'government' },
            { label: '광역지자체', value: 'metropolitan' },
            { label: '기초지자체', value: 'local' },
            { label: '공공기관', value: 'public' },
            { label: '민간기업', value: 'private' },
            { label: '비영리단체', value: 'nonprofit' },
          ],
          defaultValue: 'government',
        }),
        provider: fields.text({ label: '주관기관', validation: { isRequired: true } }),
        year: fields.integer({ label: '연도', validation: { isRequired: true }, defaultValue: 2025 }),
        targetAge: fields.text({ label: '지원 대상 연령', defaultValue: '19세 ~ 34세' }),
        benefits: fields.text({ label: '주요 혜택', multiline: true }),
        description: fields.mdx({ label: '상세 설명' }),
        thumbnail: fields.image({
          label: '썸네일 이미지',
          directory: 'public/images/policies',
          publicPath: '/images/policies',
        }),
        officialUrl: fields.url({ label: '공식 페이지 URL' }),
        status: fields.select({
          label: '상태',
          options: [
            { label: '진행중', value: 'active' },
            { label: '마감', value: 'closed' },
            { label: '예정', value: 'upcoming' },
          ],
          defaultValue: 'active',
        }),
        isAwarded: fields.checkbox({ label: '수상 정책 여부', defaultValue: false }),
        awardYear: fields.integer({ label: '수상 연도' }),
        awardType: fields.select({
          label: '수상 유형',
          options: [
            { label: '없음', value: 'none' },
            { label: '대상', value: 'grand' },
            { label: '최우수상', value: 'excellence' },
            { label: '우수상', value: 'merit' },
            { label: '특별상', value: 'special' },
          ],
          defaultValue: 'none',
        }),
      },
    }),
    // 역대 수상작
    awards: collection({
      label: '역대 수상작',
      slugField: 'title',
      path: 'src/content/awards/*',
      schema: {
        title: fields.slug({ name: { label: '수상작 제목', validation: { isRequired: true } } }),
        year: fields.integer({ label: '수상 연도', validation: { isRequired: true } }),
        awardType: fields.select({
          label: '수상 유형',
          options: [
            { label: '대상', value: 'grand' },
            { label: '최우수상', value: 'excellence' },
            { label: '우수상', value: 'merit' },
            { label: '특별상', value: 'special' },
          ],
          defaultValue: 'grand',
        }),
        policy: fields.relationship({
          label: '관련 정책',
          collection: 'policies',
        }),
        category: fields.text({ label: '분야' }),
        provider: fields.text({ label: '주관기관' }),
        summary: fields.text({ label: '수상 사유 요약', multiline: true }),
        description: fields.mdx({ label: '상세 설명' }),
        image: fields.image({
          label: '수상 이미지',
          directory: 'public/images/awards',
          publicPath: '/images/awards',
        }),
        videoUrl: fields.url({ label: '관련 영상 URL' }),
      },
    }),
    // 뉴스/공지사항
    news: collection({
      label: '뉴스/공지',
      slugField: 'title',
      path: 'src/content/news/*',
      schema: {
        title: fields.slug({ name: { label: '제목', validation: { isRequired: true } } }),
        date: fields.date({ label: '날짜', validation: { isRequired: true } }),
        category: fields.select({
          label: '카테고리',
          options: [
            { label: '공지사항', value: 'notice' },
            { label: '뉴스', value: 'news' },
            { label: '이벤트', value: 'event' },
          ],
          defaultValue: 'notice',
        }),
        summary: fields.text({ label: '요약', multiline: true }),
        content: fields.mdx({ label: '내용' }),
        thumbnail: fields.image({
          label: '썸네일',
          directory: 'public/images/news',
          publicPath: '/images/news',
        }),
        isImportant: fields.checkbox({ label: '중요 공지', defaultValue: false }),
      },
    }),
  },
});
