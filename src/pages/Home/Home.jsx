import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../components/Loader/Loader";

function Home() {
  const darkMode = useTheme();
  const cardLayout = darkMode ? "card__dark" : "card__light";
  const [articles, setArticles] = useState([]);
  // const [weather, setWeather] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();

    // const getWeatherData = async () => {
    //   try {
    //     const response = await fetch("http://localhost:8000/weatherData");

    //     const data = await response.json();
    //     setWeather(data.list);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getWeatherData();
  }, []);

  // for (let i = 0; i < weather.length; i++) {
  //   console.log(weather[i].deg);
  // }

  const handleCardClick = url => {
    window.open(url, "_blank");
  };

  return (
    <>
      {articles.length === 0 ? (
        <Loader text=" Articles" />
      ) : (
        <>
          <div className="header">Latest Photovoltaic News Articles</div>
          <div className="articles">
            {articles?.map(article => (
              <div
                className={`card ${cardLayout}`}
                key={article.url}
                onClick={() => handleCardClick(article.url)}
              >
                <img src={article.urlToImage} alt="" />
                <h3>{article.title}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
