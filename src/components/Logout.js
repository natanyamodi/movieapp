import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const [loggedIn, saveLoggedIn] = useLocalStorage("isLoggedIn");
  const navigate = useNavigate();

  // Update isLoggedIn to false and navigate to the login page when component mounts
  useEffect(() => {
    saveLoggedIn("false");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <h3>Logging Out....</h3>
    </>
  );
}
