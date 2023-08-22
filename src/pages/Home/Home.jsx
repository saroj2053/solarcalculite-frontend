import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { getNews } from "../../api/external";

import Loader from "../../components/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();
  }, []);

  const handleCardClick = url => {
    window.open(url, "_blank");
  };

  // Calculating index of the last article
  const indexOfLastArticle = currentPage * articlesPerPage;
  // Calculate index of the first article
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  // Get the current page of articles
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function getFirstNCharacters(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "...." : str;
  }

  return (
    <>
      {articles.length === 0 ? (
        <Loader text=" Articles" />
      ) : (
        <>
          <div className="header">Latest Photovoltaic News Articles</div>
          <nav className="pagination">
            {Array.from({
              length: Math.ceil(articles.length / articlesPerPage),
            }).map((_, index) => (
              <button
                style={{
                  width: "30px",
                  margin: "5px",
                  border: "none",
                }}
                key={index}
                className={currentPage === index + 1 ? "activePageNumber" : ""}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </nav>
          <div className="articles">
            {currentArticles?.map(article => (
              <div
                className="card"
                key={article.url}
                onClick={() => handleCardClick(article.url)}
              >
                <img src={article.urlToImage} alt="" />
                <h3>{getFirstNCharacters(article?.title, 70)}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
