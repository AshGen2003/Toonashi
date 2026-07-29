const apiConfig = {
  base: 'https://api.consumet.org',
  category: {
    anime: {
      gogoanime: {
        routes: {
          streamepisode: (episodeId, serverName) => `/anime/gogoanime/watch/${episodeId}?server=${serverName}`
        }
      }
    }
  }
};

export default apiConfig;