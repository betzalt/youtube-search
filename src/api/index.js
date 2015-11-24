import fetch from 'isomorphic-fetch';

export const formatSearch = (query, response) => ({
  query,
  nextPageToken: response.nextPageToken,
  results: response.items.map(data => ({
    id: data.id.videoId,
    title: data.snippet.title,
    description: data.snippet.description,
    thumbnail: data.snippet.thumbnails.high.url,
    channelTitle: data.snippet.channelTitle,
    channelId: data.snippet.channelId,
  })),
});

export const requestSearchResults = (query, pageToken) => {
  let url = 'https://www.googleapis.com/youtube/v3/search' +
    '?part=snippet' +
    '&type=video' +
    '&maxResults=25' +
    '&key=AIzaSyAe_7Gr4-9RNPW9RTusvRTzQ3-M0pz0_i0' +
    `&q=${query}`;

  if (pageToken) {
    url = `${url}&pageToken=${pageToken}`;
  }

  return fetch(url)
    .then(response => response.json())
    .then(response => formatSearch(query, response));
};
