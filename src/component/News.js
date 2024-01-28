import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    pageSize: 20,
    category: "general"
  }

  static propTypes = {
    pageSize: PropTypes.number
  }
 
capitalize= (s) =>
  {
      return s && s[0].toUpperCase() + s.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      tototalResult: 0

    };
    document.title=`Newsmonkey - ${this.capitalize(this.props.category)} `;
  }

   updateNews= async()=>{
    this.props.setprogress(0)
    const url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8365456d6d0f4432817a1da3b8132a43&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setprogress(30);
      
    let parsedData = await data.json();
    this.props.setprogress(70);
       this.setState({ articles: parsedData.articles,
                    tototalResult: parsedData.totalResults,
                    loading: false});
    this.props.setprogress(100)
  }

  async componentDidMount() {
    this.updateNews()
  }

  // handlePreviousClick = async () =>{
  // //   let url =
  // //   `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8365456d6d0f4432817a1da3b8132a43&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  // //   this.setState({loading: true});
  // //   let data = await fetch(url);
  // // let parsedData = await data.json();
  // // this.setState({
  // //     page: this.state.page - 1,
  // //     articles: parsedData.articles,
  // //     loading: false
  // // }) 
  // this.setState({
  //   page: this.state.page - 1,})
  //   this.updateNews()
  // }

//    handleNextClick = async () =>{
    
//     //   let url =
//     //   `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}s&apiKey=8365456d6d0f4432817a1da3b8132a43&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//     //   this.setState({loading: true});
//     //   let data = await fetch(url);
//     // let parsedData = await data.json();
//     // this.setState({
//     //     page: this.state.page + 1,
//     //     articles: parsedData.articles,
//     //     loading: false
        
//     // });
//     this.setState({
//           page: this.state.page + 1,})
//           this.updateNews()
// }

fetchMoreData = async () => {
  console.log(this.state.page)

  const url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8365456d6d0f4432817a1da3b8132a43&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({page: this.state.page +1});
      this.setState({loading: true});
      
      console.log(this.state.page)
      let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading: true});
    this.setState({ articles:this.state.articles.concat(parsedData.articles),
                    tototalResult: parsedData.totalResults,
                    loading: false});
                    console.log(this.state.page)
};

  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading &&<Spiner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.tototalResult}
          loader={<Spiner/>}
        >
            <div className="container">
        <div className="row">
          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-3" key={index}>
                <NewsItem
                  title={element.title?element.title.slice(0, 45):""}
                  descripition={element.description?element.description.slice(0, 35):""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author?element.author:"Unknown"}
                  date={element.publishedAt}
                  source = {element.source.name}
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
}

export default News;
