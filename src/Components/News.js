import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps={
    country: 'in',
    pagesize: 10,
    category: 'general',
    bdgeColor: 'primary'
  }

  static propTypes={
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    bdgeColor: PropTypes.string,
  };
   capitalize=(str)=> {
    // Check if the input is a valid string
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }
  
    // Check if the string is not empty
    if (str.length === 0) {
      return str; // Return an empty string as is
    }
  
    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  constructor(props){
    super(props);
    console.log("Hello I am a constructor from news component");
    this.state={
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0
    }
    document.title=`${this.capitalize(this.props.category)} - NewsMonk`;
  }
  async updates(){
    this.props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74a39cc9450342b98a7e933b15aed232&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();
    this.props.setProgress(70);
  this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
  this.props.setProgress(100);
  }
  async componentDidMount(){
     
  this.updates();
  }
  HandlePreclick=async ()=>{
    
    
    this.setState({
      page: this.state.page-1,
       
})
  this.updates();
}
  

  
  HandleNextclick=async ()=>{
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
       
     
  
    this.setState({
          page: this.state.page+1,
          
    })
    this.updates();

    }
     
  }

  fetchMoreData=async()=>{
    this.setState({page: this.state.page+1});
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74a39cc9450342b98a7e933b15aed232&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json();
  this.setState({articles: this.state.articles.concat(parsedData.articles), 
    totalResults: parsedData.totalResults
    })
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonk- Top {this.capitalize(this.props.category)} Headlines</h1>
         {/*{this.state.loading && <Spinner/>}*/}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          //loader={<Spinner/>}
           > 
            
        <div className="container"> 
        <div className="row">
         { this.state.articles.map((element)=>{ 
           
            return <div className="col md-3" key={element.url}> 
          <Newsitem  title={element.title} description={element.description} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} bdgeColor={this.props.bdgeColor}/>
         </div> 
         })}
        </div>
        </div>
         
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.HandlePreclick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" class="btn btn-dark" onClick={this.HandleNextclick}>Next &rarr;</button>
        </div>*/}
      </>
    )
  }
}


export default News
