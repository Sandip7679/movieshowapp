import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";

let API_key = "7df2ae268ce4ddefdcfc55ae3ab35c86";
let base_url = "https://api.themoviedb.org/3";
let startPage = 1;
let currPage = 1;
let url_search = "";
let Languages = [
  ["All", "All"],
  ["Hindi", "hi"],
  ["English", "en"],
  ["Bengali", "bn"],
  ["Gujarati", "gu"],
  ["Marathi", "mr"],
  ["Tamil", "ta"],
  ["Telugu", "te"],
  ["Urdu", "ur"],
  ["Malayalam", "ml"],
  ["Chainese", "zh"],
  ["Russian", "ru"],
  ["Nepali", "ne"],
];
let years = ["All"];
let movie_genres = [
  ["All", "All"],
  ["Action", 28],
  ["Adventure", 12],
  ["Animation", 16],
  ["Comedy", 35],
  ["Crime", 80],
  ["Documentary", 99],
  ["Drama", 18],
  ["Family", 10751],
  ["Fantasy", 14],
  ["History", 36],
  ["Horror", 27],
  ["Music", 10402],
  ["Mystery", 9648],
  ["Romance", 10749],
  ["Science Fiction", 878],
  ["TV Movie", 10770],
  ["Thriller", 53],
  ["War", 10752],
  ["Western", 37],
];

let TV_genres = [
  ["All", "All"],
  ["Action & Adventure", 10759],
  ["Animation", 16],
  ["Comedy", 35],
  ["Crime", 80],
  ["Documentry", 99],
  ["Drama", 18],
  ["Family", 10751],
  ["Kids", 10762],
  ["Mistery", 9648],
  ["Reality", 10764],
  ["Sci-Fi & Fanfasy", 10765],
  ["Soap", 10766],
  ["Talk", 10767],
  ["War & Politics", 10768],
  ["Western", 37],
];
let Genres = [];
export default function Main(props) {
  // let url_middle = `/discover/${props.show}?&with_original_language=hi&api_key=`;
  let url = base_url + props.url_type[0] + API_key;
  // let url = base_url + url_middle+API_key;
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState("");
  const [Year, setYear] = useState("");
  const [Language, setLanguage] = useState("");
  const [Genre, setGenre] = useState("");
  useEffect(() => {
    startPage = 1;
    currPage = 1;
    Genres = props.show == "movie" ? movie_genres : TV_genres;
  }, []);
  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);

  useEffect(() => {
    setUrl(url);
  }, [props.url_type]);
  const getData = (showTypes) => {
    currPage = 1;
    startPage = 1;
    url = base_url + props.url_type[props.type.indexOf(showTypes)] + API_key;
    setYear("");
    setLanguage("");
    setGenre("");
    setUrl(url);
    setSearch("");
  };
  const searchMovie = (evt) => {
    // setSearch(evt.target.value);
    // url = base_url+ props.url_type[props.url_type.length-1]+ search;
    //     setUrl(url);
    if (evt.key === "Enter") {
      url = url_search;
      evt.target.value = "";
    }
  };
  //  filter section
  useEffect(() => {
    let year = 2022;
    while (year >= 1950) {
      years.push(year);
      year--;
    }
  }, []);
  useEffect(() => {
    let url_middle = `/discover/${props.show}?&with_original_language=${Language}&primary_release_year=${Year}&with_genres=${Genre}&api_key=`;
    let url_filter = base_url + url_middle + API_key;
    setUrl(url_filter);
  }, [Language, Year, Genre]);

  //End of filter section

  useEffect(() => {
    let cleartime = setTimeout(() => {
      currPage = 1;
      startPage = 1;
      url_search =
        base_url + props.url_type[props.url_type.length - 1] + search;
      if (search !== "") setUrl(url_search);
      else setUrl(url);
    }, 300);
    return () => clearTimeout(cleartime);
  }, [search]);

  let pages = [];
  for (let i = startPage; i < startPage + 10; i++) {
    pages[i] = i;
  }
  function IncreasePages() {
    startPage++;
    currPage++;
    setCurrPageUrl();
  }
  function DecreasePages() {
    startPage--;
    currPage--;
    setCurrPageUrl();
  }
  function getPage(e) {
    currPage = e.target.innerHTML - 0;
    setCurrPageUrl();
  }
  function setCurrPageUrl() {
    if (search === "") setUrl(url_set + `&page=${currPage}`);
    else setUrl(url_search + `&page=${currPage}`);
  }
  return (
    <div>
      <div className="header_secondary">
        <div className="filter_section">
          <nav>
            <ul>
              {props.type.map((value) => {
                return (
                  <li>
                    <a
                      href="#"
                      name={value}
                      onClick={(e) => {
                        getData(e.target.name);
                      }}
                    >
                      {value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="filter">
            <p className="filter_by">Filter By: </p>
            <div>
              {props.show === "movie" && (
                <>
                  Year{" "}
                  <select
                    name=""
                    id=""
                    value={Year}
                    onChange={(e) =>
                      e.target.value == "All"
                        ? setYear("")
                        : setYear(e.target.value)
                    }
                  >
                    {years.map((year) => {
                      return <option>{year}</option>;
                    })}
                  </select>
                </>
              )}
            </div>
            <div>
              Language{" "}
              <select
                id="language"
                value={Language}
                onChange={(e) =>
                  e.target.value == "All"
                    ? setLanguage("")
                    : setLanguage(e.target.value)
                }
              >
                {Languages.map((language) => {
                  return <option value={language[1]}>{language[0]}</option>;
                })}
              </select>
            </div>
            <div>
              Genres{" "}
              <select
                value={Genre}
                onChange={(e) => {
                  e.target.value == "All"
                    ? setGenre("")
                    : setGenre(e.target.value);
                }}
              >
                {Genres.map((genre) => {
                  return <option value={genre[1]}>{genre[0]}</option>;
                })}
              </select>
            </div>
          </div>
          <form>
            <div className="search-btn">
              <input
                type="text"
                placeholder={
                  props.show === "movie"
                    ? "Enter Movie Name"
                    : "Enter TV Show Name"
                }
                className="inputText"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyPress={searchMovie}
              ></input>
              <button>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="slide_home">{props.title}</div>
      </div>
      <div className="container">
        {movieData === undefined || movieData.length === 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return (
              <div className="movie">
                <Card info={res} key={pos} Id={pos} type={props.show} />
              </div>
            );
          })
        )}
      </div>
      <div className="pagination">
        <div
          className="prev-next"
          style={
            startPage === 1 ? { visibility: "hidden" } : { display: "block" }
          }
          onClick={DecreasePages}
        >
          <i className="fas fa-angle-left"></i>
        </div>
        {pages.map((ele, index) => {
          return (
            <div
              onClick={getPage}
              className={index === currPage ? "currpage" : "pages"}
            >
              {index}
            </div>
          );
        })}
        <div
          className="prev-next"
          style={
            startPage === 11 ? { visibility: "hidden" } : { display: "block" }
          }
          onClick={IncreasePages}
        >
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
    </div>
  );
}
