import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import axios from "axios";

const Home = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    axios
      .get(
        "https://job-seeking-backend-code.onrender.com/api/v1/user/getuser",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        setIsAuthorized(false);
      });
  }, []);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
