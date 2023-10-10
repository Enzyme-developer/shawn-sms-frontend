export function extractTokenFromUrl(url) {
  const parts = url.split("/");
  return parts.pop();
}
