export default function useImage(img_url: string): string {
  if (process.env.NODE_ENV === 'development') {
    return 'files://' + img_url;
  } else {
    return 'file://' + img_url;
  }
}
