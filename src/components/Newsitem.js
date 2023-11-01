import React from "react";

const Newsitem = (props) => {
    let { title, discription, imageUrl, url, author, date,source } = props;
    return (
      <div className="card">
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://images.moneycontrol.com/static-mcnews/2021/06/Morning-Scan-9-770x433.jpg?impolicy=website&width=770&height=431"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}
            <span className="position-absolute top-0 badge rounded-pill bg-danger" style={{right:'0'}} >
              {source}
            </span>
          </h5>
          <p className="card-text">{discription}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}{" "}
            </small>
          </p>
          <a
            href={url}
            rel="noreferrer"
            className="btn btn-sm btn-outline-primary"
            target="_blank"
          >
            Read More...
          </a>
        </div>
      </div>
    );
}


export default Newsitem