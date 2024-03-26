import React, { useState, useEffect, lazy, Suspense, useContext } from "react";
import "./App.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import SignUp from "./components/Signin";
import Loader from "./components/Loader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider, useMovieContext } from "./components/MovieContext";
import Logout from "./components/Logout";
const Navbar = lazy(() => import("./components/Navbar"));
const MovieFilter = lazy(() => import("./components/MovieFilter"));
const MovieBanner = lazy(() => import("./components/MovieBanner"));
const TrendingMovies = lazy(() => import("./components/TrendingMovies"));
const TopRatedMovies = lazy(() => import("./components/TopRatedMovies"));
const UpcomingMovie = lazy(() => import("./components/UpcomingMovie"));
const FreeMovie = lazy(() => import("./components/FreeMovie"));
const MovieDetail = lazy(() => import("./components/MovieDetail"));
const Search = lazy(() => import("./components/Search"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const FilterMovieCard = lazy(() => import("./components/FilterMovieCard"));
const Login = lazy(() => import("./components/Login"));
const TryNew = lazy(() => import("./components/TryNew"));

const Base_Url = "https://api.themoviedb.org/3";
const Api_Key = "api_key=01f1b62444c170838b3fffa722cf2aa3";
const img_url = "https://image.tmdb.org/t/p/w500";

const fetchData = async function (url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error While fetching data:", error);
	}
};

function App() {
	const [loggedIn, setLoggedIn] = useLocalStorage("isLoggedIn", false);
	const [isLoading, setisLoading] = useState(true);
	const [toggleMode, setToggleMode] = useState("hidden");

	// console.log({
	// 	loggedIn,
	// 	saveLoggedIn,
	// });

	Promise.all([
		fetchData(Base_Url + "/trending/all/day?" + Api_Key),
		fetchData(Base_Url + "/top_rated?" + Api_Key),
		fetchData(Base_Url + "/upcoming?" + Api_Key),
		fetchData(Base_Url + "/trending/all/day?" + Api_Key),
	]).then(() => {
		setisLoading(false);
		<Loader />;
	});

	const handleLogin = (username) => {
    setLoggedIn(true);
  };

	const handleSignUp = (username) =>{
		setLoggedIn(true);
	}

	const HideShow = () => {
		if (toggleMode === "hidden") {
			setToggleMode("visible");
		} else {
			setToggleMode("hidden");
		}
	};
	return (
		<>
			<Suspense fallback={<Loader />}>
				<MovieProvider>
					<BrowserRouter>
						<Navbar
							burger={
								<div id="burger" onClick={HideShow}>
									<li></li>
									<li></li>
									<li></li>
								</div>
							}
						/>
						<>
							{loggedIn === "true" ? (
								<>
									<Search />
									<MovieFilter
										Mode={toggleMode}
										HideShow={HideShow}
									/>
								</>
							) : null}

							<div className="container">
								<Routes>
									<Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
									<Route path="/trynew" element={<TryNew />} />  
									<Route
										path="/main"
										element={
											<>
												<MovieBanner
													isLoading={isLoading}
													setisLoading={setisLoading}
												/>
												<TrendingMovies
													isLoading={isLoading}
													setisLoading={setisLoading}
												/>
												<TopRatedMovies
													isLoading={isLoading}
													setisLoading={setisLoading}
												/>
												<UpcomingMovie
													isLoading={isLoading}
													setisLoading={setisLoading}
												/>
												<FreeMovie
													isLoading={isLoading}
													setisLoading={setisLoading}
												/>
											</>
										}
									/>
									<Route
										path="*"
										element={<PageNotFound />}
									/>
									<Route path="/search" />
									<Route
										path="/movie/:genreId"
										element={<FilterMovieCard />}
									/>
									<Route
										path="/MovieDetail/:id"
										element={<MovieDetail />}
									/>
									<Route
										path="/logout"
										element={<Logout />}
									/>
								</Routes>
								<></>
							</div>
						</>
					</BrowserRouter>
				</MovieProvider>
			</Suspense>
		</>
	);
}

export { App, Base_Url, Api_Key, img_url, fetchData };
export default App;
