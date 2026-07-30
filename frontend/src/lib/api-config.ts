interface ApiConfig {
  base: string;
  category: {
    anime: {
      gogoanime: {
        routes: {
          streamepisode: (episodeId: string, serverName: string) => string;
        };
      };
    };
  };
}

const apiConfig: ApiConfig = {
  base: 'https://api.consumet.org',
  category: {
    anime: {
      gogoanime: {
        routes: {
          streamepisode: (episodeId, serverName) => `/anime/gogoanime/watch/${episodeId}?server=${serverName}`,
        },
      },
    },
  },
};

export default apiConfig;
