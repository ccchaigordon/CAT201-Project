import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import Footer from "../global/Footer";
import React, {useEffect, useState} from "react";
import "../../style/AboutUs.css";

const AboutUsPage: React.FC = () => {
    const [fadeIn, setFadeIn] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setFadeIn(true), 200);
      return () => clearTimeout(timer);
    }, []);
    
//function AboutUsPage() {
  return (
    <>
      <div>
        <NavBar /><SearchBar />
      </div> 
      <div className="about-us-page"> 
      <img
          className="background-image"
          src="/assets/man_guitar.jpg"
          alt="About Us"
        />
        <div className="content">
        <h1 className={`Title ${fadeIn ? "fade-in" : ""}`}>About Us</h1>
        <h2 className={`Subtitle ${fadeIn ? "fade-in" : ""}`}>Where Music Meets Passion</h2>
        <div className="Description-container">
        <p className={`Description ${fadeIn ? "fade-in" : ""}`}>
        Welcome to Pluck Your Heart String Music Co., your trusted partner in every musical journey.
        Established in 2024, our story began with a simple yet powerful vision: to create a platform where 
        musicians, both aspiring and seasoned, could find not only the tools they need but also a sense of 
        belonging in a community that shares their passion. 
        </p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUsPage;
