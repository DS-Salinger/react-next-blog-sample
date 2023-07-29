export const GA_TAG_ID = 'G-JFLNRNZHKV';

export const pageview = (url: string) => {
  if (!GA_TAG_ID) return;
  window.gtag('config', GA_TAG_ID, {
    page_path: url,
  });
}
