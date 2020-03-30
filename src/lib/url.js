export const encodeParam = value => encodeURIComponent(value);

export const buildQuery = obj =>
  Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined)
    .map(key => `${key}=${encodeParam(obj[key])}`)
    .join('&');

export const buildUrl = (url, query = {}) => {
  const encodedQuery = buildQuery(query);
  const hasQuery = url.includes('?');
  const hasEmptyParam = hasQuery && url.substr(-1) !== '?';
  const hasParam = hasQuery && url.includes('=');
  const hasParams = hasParam && url.includes('&');

  if (hasParam || hasParams || hasEmptyParam) {
    return `${url}&${encodedQuery}`;
  }

  if (hasQuery) {
    return `${url}${encodedQuery}`;
  }

  return `${url}?${encodedQuery}`;
};
