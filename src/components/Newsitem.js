import React, { Component } from 'react'

export class Newsitem extends Component {


  render() {
    let {title , description , imageUrl,newsurl} = this.props
    return (
      <div>
        <div  className="card" style={{width: "18rem"}}>
      <img src={!imageUrl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg":imageUrl}  className="card-img-top" alt="..."/>
    <div  className="card-body">
    <h5  className="card-title">{title}</h5>
    <p  className="card-text">{description}</p>
      <a rel="noreferrer" href={newsurl} target='_blank'  className="btn btn-dark btn-sm">Read More</a>
     </div>
    </div>
      </div>
    )
  }
}

export default Newsitem
