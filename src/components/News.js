import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css'

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const apiKey = 'f3c76f55b5a74b56ac3488561dcaec01';

  const updateComponent = async() => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(15);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateComponent();
    // eslint-disable-next-line
  }, [])
  

  const fetchMoreData = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

  }

    return (
      <>
        <h1 className="text-center body-heading">NewsLetter - Top Headlines</h1>
        <InfiniteScroll

          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            {loading && <Spinner />}
            <div className="row">
              {
                articles.map((element,index) => {
                  return (
                    <div className="col-md-3 my-3" key={index}>
                      <Newsitem 
                        title={element.title}
                        discription={element.description}
                        imageUrl={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

News.defaultProps = {
    pageSize: "6",
    country: "in",
    category: "general",
  };

News.propTypes = {
    pageSize: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
  };




export default News
