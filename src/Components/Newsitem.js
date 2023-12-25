import React, { Component } from 'react'

export class Newsitem extends Component {
     
  render() {
     let {title, description, imageurl, newsUrl, author, date, source, bdgeColor}= this.props;
    return (
      <div className="my-3">
         {/*<h2>NewsMonk-Top Headlines</h2>*/}
         <div className="card" style={{width: "18rem"}}>
            <img src={!imageurl?"https://www.vuelio.com/uk/wp-content/uploads/2019/02/Breaking-News.jpg" :imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <span className={`position-absolute top-0  translate-middle badge rounded-pill bg-${bdgeColor}`} style={{zIndex:'1', left: '90%'}}>{source}</span >  
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">by : {author?author:"Unknown"} on : {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
