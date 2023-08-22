import axios from "axios";

const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=photovoltaic AND solar panel&sortBy=publishedAt&language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

export const getNews = async () => {
  let response;
  let randomArticles;
  try {
    response = await axios.get(NEWS_API_ENDPOINT);

    response = response.data.articles;

    function generateRandomArticles(articles, count) {
      const shuffled = articles.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    randomArticles = generateRandomArticles(response, 60);
  } catch (error) {
    return error;
  }

  return randomArticles;
};
