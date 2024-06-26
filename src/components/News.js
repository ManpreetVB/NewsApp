import React, { useEffect,useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=>{
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(true)
  const [totalResults,setTotalResults]=useState(0)

  
  
  
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

 
    

  const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=93cad91ccb42405c932c0b76b344fd52&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(articles.concat(parsedData.totalResults))
    setLoading(false)
    // this.setState({
    //   articles: page === 1 ? parsedData.articles : this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //    loading: false,
    //   page: page,
    // });
    props.setProgress(100);
  }

 useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsHunt`;
  updateNews();
 },[props.category])

 const handlePreviousClick = async () => {
  setPage(page-1)
    updateNews();
  };

 const handleNextClick = async () => {
  setPage(page+1)
    updateNews();
  };

 const fetchMoreData = async () => {
  const nextPage = page + 1;
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=93cad91ccb42405c932c0b76b344fd52&page=${nextPage}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);
  setPage(nextPage);
  };

  
    return (
     <>
        <h1 className='text-center'style={{ margin: '35px 0px',marginTop:'90px' }}>NewsHunt - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)}
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }



News.defaultProps = {
  country: 'in',
  pageSize: 3,
  category: 'general',
};

News. propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

