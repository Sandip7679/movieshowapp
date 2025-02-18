// import { getDefaultNormalizer } from '@testing-library/react';
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Main from "./Main";

export default function ShowDetails(prop) {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState({});
  let type = [];
  let url_type = [`/${prop.type}/${id}/similar?api_key=`];
  useEffect(() => {
    let url = `https://api.themoviedb.org/3/${prop.type}/${id}/videos?api_key=7df2ae268ce4ddefdcfc55ae3ab35c86`;
    fetch(url)
      .then((data) => data.json())
      .then((video) => setVideos(video.results));
    let url_detail = `https://api.themoviedb.org/3/${prop.type}/${id}?api_key=7df2ae268ce4ddefdcfc55ae3ab35c86`;
    fetch(url_detail)
      .then((data) => data.json())
      .then((details) => setDetail(details));
  }, [id]);

  function decreaseIndex() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  function increaseIndex() {
    if (index < videos.length - 1) setIndex(index + 1);
  }
  return (
    <>
      <div className="goback-title-section">
        <div className="goback">
          <Link to={`/${prop.type}`} style={{ color: "white" }}>
            <i className="fa fa-arrow-left"></i>
          </Link>
        </div>
        <div className="detail-title">
          {detail && <h1>{detail.title ? detail.title : detail.name}</h1>}
        </div>
      </div>

      <div className="showdetails">
        {videos.length !== 0 && videos[index].key !== null ? (
          <>
            <div className="watch">
              <div
                className="arrow arrow-left"
                style={
                  index > 0 ? { display: "block" } : { visibility: "hidden" }
                }
                onClick={decreaseIndex}
              >
                <i className="fas fa-angle-left fa-5x arrow-icon"></i>
              </div>
              <iframe
                width="100%"
                height="100%"
                // width="753"
                // height="480"
                // className=""
                src={`https://www.youtube.com/embed/${videos[index].key}`}
                title={videos[index].name}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div
                className="arrow arrow-right"
                style={
                  index < videos.length - 1
                    ? { display: "block" }
                    : { visibility: "hidden" }
                }
                onClick={increaseIndex}
              >
                <i className="fas fa-angle-right fa-5x arrow-icon"></i>
              </div>
            </div>
          </>
        ) : (
          <div className="video-notFound">
            Sorry, this video is not available !
          </div>
        )}
        <div className="details">
          {detail && (
            <div className="text">
              <h1>Overview</h1>
              <h3>{detail.overview}</h3>
              <h2>Rating</h2>
              <h3>{detail.vote_average} / 10</h3>
              {detail.release_date ? (
                <>
                  <h2>Release Date</h2>
                  <h3>{detail.release_date}</h3>
                </>
              ) : (
                <>
                  <h2>First Air Date</h2>
                  <h3>{detail.first_air_date}</h3>
                </>
              )}

              <h2>Language</h2>
              <h3>
                {detail.spoken_languages &&
                  detail.spoken_languages[0] &&
                  detail.spoken_languages[0].name}
              </h3>
            </div>
          )}
        </div>
      </div>
      <div className="similar-shows">
        {/* <div className="similar_title">You may also like</div> */}
        <div className="similar">
          <Main type={type} url_type={url_type} show={prop.type} title = {"You may also like"}/>
        </div>
      </div>
    </>
  );
}
