import React, { useEffect, useState } from "react";
import "./CSS/Login.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { Api_Key, Base_Url, fetchData, img_url } from "../App";
import "../components/CSS/MoviesItems.css";
import { BiLogoInvision } from "react-icons/bi";
import HomeCart_Skeleton from "./HomeCart_Skeleton";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const TryNew = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [loggedIn, saveLoggedIn] = useLocalStorage("isLoggedIn");
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([
    {
			id: 28,
			checked: false,
			name: "Action",
		},
		{
			id: 12,
			checked: false,
			name: "Adventure",
		},
		{
			id: 16,
			checked: false,
			name: "Animation",
		},
		{
			id: 35,
			checked: false,
			name: "Comedy",
		},
		{
			id: 80,
			checked: false,
			name: "Crime",
		},
		{
			id: 99,
			checked: false,
			name: "Documentary",
		},
		{
			id: 18,
			checked: false,
			name: "Drama",
		},
		{
			id: 10751,
			checked: false,
			name: "Family",
		},
		{
			id: 14,
			checked: false,
			name: "Fantasy",
		},
		{
			id: 36,
			checked: false,
			name: "History",
		},
		{
			id: 27,
			checked: false,
			name: "Horror",
		},
		{
			id: 10402,
			checked: false,
			name: "Music",
		},
		{
			id: 9648,
			checked: false,
			name: "Mystery",
		},
		{
			id: 10749,
			checked: false,
			name: "Romance",
		},
		{
			id: 878,
			checked: false,
			name: "Science Fiction",
		},
		{
			id: 10770,
			checked: false,
			name: "TV Movie",
		},
		{
			id: 53,
			checked: false,
			name: "Thriller",
		},
		{
			id: 10752,
			checked: false,
			name: "War",
		},
		{
			id: 37,
			checked: false,
			name: "Western",
		},
  ]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function fetchGenres() {
    let url = Base_Url + "/genre/movie/list?" + Api_Key;
    let data = await fetchData(url);
    console.log(url);
    console.log(data);
    setGenres(data);
  }

  function getRecommendedIds() {
    const ids = [];
    for (let cat of categories) {
      if (cat.checked) {
        ids.push(cat.id);
      }
    }
    let str = ids.reduce((v, acc) => {
      return acc + `,${v}`;
    }, "");
    let realStr = str.substr(0, str.length - 1);
    return realStr;
  }

  return (
    <div className="try-new-container">
      {loggedIn === "false" ? (
        <>
          <h1>Login Page</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              saveLoggedIn("true");
              window.location.reload();
            }}
          >
            <input
              type="text"
              placeholder="username"
              value={formValues.username}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
            />
            <input
              type="password"
              placeholder="password"
              value={formValues.password}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
            <input type="submit" />
          </form>
        </>
      ) : (
        <>
          <h3>Choose your Genres</h3>
          <div className="genres-container">
            {categories.map((category) => (
              <div key={category.id}>
                <label htmlFor={category.id}>{category.name}</label>
                <input
                  type="checkbox"
                  id={category.id}
                  value={category.id}
                  checked={category.checked}
                  onChange={(event) => {
                    const updatedCategories = categories.map((ct) =>
                      ct.id === category.id
                        ? { ...ct, checked: event.target.checked }
                        : ct
                    );
                    setCategories(updatedCategories);
                  }}
                />
              </div>
            ))}
          </div>
          <button
            id="get-recommendations-button"
            onClick={async () => {
              const url =
                Base_Url +
                "/discover/movie?" +
                Api_Key +
                `&with_genres=${getRecommendedIds()}`;
              let data = await fetchData(url);
              console.log(data);
              setRecommendedMovies(data.results);
            }}
          >
            Get Recommendations
          </button>
        </>
      )}
      <div id="MoviesItems" className="movies-items">
        <Slider {...settings}>
          {recommendedMovies.map(({ title, poster_path, vote_average, release_date, id }) => (
            <div key={id} className="movie-card">
              <>
                <Link to={`/moviedetail/${id}`} className="movie-link">
                  <img src={img_url + poster_path} alt="" className="movie-image" />
                </Link>
                <h4 className="movie-title">{String(title.slice(0, 19) + "...")}</h4>
                <div className="movie-date-rating">
                  <div className="movie-rating">
                    <i className="fa-sharp fa-solid fa-star" style={{ color: "#e4ff1a" }}></i>
                    {vote_average.toFixed(1)}
                  </div>
                  <span className="movie-release-date">{parseInt(release_date)}</span>
                </div>
              </>
            </div>
          ))}
        </Slider>
      </div>
      <div className="navigation-links">
        <Link to="/main">Go back to main page</Link>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default TryNew;
