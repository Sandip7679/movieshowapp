import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";

let base_url = "https://api.themoviedb.org/3";
let api_key = "7df2ae268ce4ddefdcfc55ae3ab35c86";

export default function SlideShow(props) {
  const [shows, setShows] = useState([]);
  const [start_index, setIndex] = useState(0);

  // const [displayCardNum, setDisplayCardNum] = useState(6);

  // useEffect(() => {
  //   const handleResize = () => {
  //     // setWidth(window.innerWidth);
  //     console.log("window.innerWidth...", window.innerWidth);
  //     if (window.innerWidth < 1000) setDisplayCardNum(5);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    let url = base_url + props.url + api_key;
    fetch(url)
      .then((data) => data.json())
      .then((res) => setShows(res.results));
  }, []);

  return (
    <>
      <div
        className="slide-title"
        onClick={() => props.func(props.url, props.title, props.type)}
      >
        {props.title}
      </div>
      <div className="slide-container">
        <div
          className="slide-arrow slide-arrow-left"
          onClick={() => setIndex(start_index - 1)}
          style={
            start_index < 1
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          <i className="fas fa-angle-left"></i>
        </div>
        {shows && (
          <>
            {shows.map((show, ind) => {
              return (
                ind < start_index + props.displayCardNum &&
                ind >= start_index && (
                  <div key={ind} className="slide-card">
                    <Card info={show} Id={ind} key={ind} type={props.type} />
                  </div>
                )
              );
            })}
          </>
        )}
        <div
          className="slide-arrow slide-arrow-right"
          onClick={() => setIndex(start_index + 1)}
          style={
            start_index > 13
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
    </>
  );
}
