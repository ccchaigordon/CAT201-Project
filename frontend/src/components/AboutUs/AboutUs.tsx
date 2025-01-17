import NavBar from "../global/NavBar";
import Footer from "../global/Footer";
import React, {useEffect, useState, useRef} from "react";
import "../../style/AboutUs.css";

const AboutUsPage: React.FC = () => {
  const [aboutUsFadeIn, setAboutUsFadeIn] = useState(false); //State for About Us fade-in
  const [ourStoryFadeIn, setOurStoryFadeIn] = useState(false); //State for Our Story fade-in
  const [lastFadeIn, setLastFadeIn] = useState(false); //State for Last fade-in
  const storyRef = useRef<HTMLDivElement | null>(null);
  const lastRef = useRef<HTMLDivElement | null>(null);

  //Fade in when landing
  useEffect(() => {
    const timer = setTimeout(() => setAboutUsFadeIn(true), 200);
    return () => clearTimeout(timer);
  }, []);

  //Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOurStoryFadeIn(true); //Trigger fade-in for Our Story
        }
      },
      { threshold: 0.3 } //Trigger when 30% of the section is visible
    );

    if (storyRef.current) {
      observer.observe(storyRef.current);
    }

    return () => {
      if (storyRef.current) {
        observer.unobserve(storyRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLastFadeIn(true); // Trigger fade-in for Our Vision
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    return () => {
      if (lastRef.current) {
        observer.unobserve(lastRef.current);
      }
    };
  }, []);
    
  return (
    <>
      <div>
        <NavBar />
      </div> 

      {/* about us */}
      <div className="about-us-section">
      <div className="about-us-page"> 
      <img
          className="about-us-image"
          src="/assets/about_man.jpg"
          alt="About Us" />
        <div className="about-us-content">
          <h1 className={`Title ${aboutUsFadeIn ? "fade-in" : ""}`}>About Us</h1>
          <h2 className={`Subtitle ${aboutUsFadeIn ? "fade-in" : ""}`}>Where Music Meets Passion</h2>
          <div className="Description-container">
          <p className={`Description ${aboutUsFadeIn ? "fade-in" : ""}`}>
            Welcome to Pluck Your Heart String Music Co., your trusted partner in every musical journey.
            Established in 2024, our story began with a simple yet powerful vision: to create a platform where 
            musicians, both aspiring and seasoned, could find not only the tools they need but also a sense of 
            belonging in a community that shares their passion. 
          </p>
        </div>
        </div>
      </div>
    </div>

    {/* our story */}
    <div className="story-section" ref={storyRef}>
      <div className="story-page">
        <img
          className="story-image"
          src="/assets/about_bass.jpg"
          alt="Our Story" />
        <div className="our-story-content">
          <div className="story-title-box">
          <h1 className={`our-story-title ${ourStoryFadeIn ? "fade-in" : ""}`}>Our Story</h1>
          </div>
        <div className="story-content-box">
          <p className={`Description ${ourStoryFadeIn ? "fade-in" : ""}`}>
          Every great endeavor starts with a spark. Ours was born from a small jam session in a cozy garage where a group of friends, 
          united by their love for music, struggled to find quality instruments and accessories at an affordable price. Frustrated by 
          limited options and uninspired by what was available in the market, we decided to take matters into our own hands. <br></br><br></br>
          From those humble beginnings, Pluck Your Heart String Music Co. emerged with a mission to make high-quality instruments and equipment
          accessible to everyone. What started as a small idea has grown into an online haven for musicians across the globe.
          </p>
        </div>
        </div>
      </div>
    </div>

    {/* last section */}
    <div className="last-section" ref={lastRef}>
      <div className="last-page">
        <img
          className="last-image"
          src="/assets/about_guitar.jpg"
          alt="Choose Us" />
        <div className="last-content">
          <div className="last-title-box">
          <h1 className={`last-title ${lastFadeIn ? "fade-in" : ""}`}>
            Unleash your sound.<br></br> Inspire the world. <br></br>Let’s create magic together.</h1>
          </div>
        <div className="last-content-box">
          <p className={`Description ${lastFadeIn ? "fade-in" : ""}`}>
          At Pluck Your Heart String Music Co., you’re not just a customer—you’re part of our musical family. 
          Whether you’re strumming your first chord, shredding on a solo, or laying down a groove, 
          we’re here to help you find your rhythm. Together, let’s make music that touches hearts and transcends time.
          </p>
        </div>
        </div>
      </div>
    </div>
    
      <Footer />
    </>
  );
}

export default AboutUsPage;
