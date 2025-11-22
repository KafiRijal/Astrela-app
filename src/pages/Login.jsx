import React from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroIllustration from "../components/Login/HeroIllustration/HeroIllustration";
import SignInCard from "../components/Login/SignInCard/SignInCard";
import Footer from "../components/Footer/Footer";

export default function Login() {
  function handleSignIn(creds) {
    console.log("Sign in attempted:", creds);
  }

  const mainStyle = {
    minHeight: "calc(100vh - 160px)",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "36px 20px",
    boxSizing: "border-box",
  };

  const containerStyle = {
    maxWidth: 1200,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 460px",
    gap: 40,
    alignItems: "center",
    boxSizing: "border-box",
  };

  const columnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Navbar />
      <main style={mainStyle}>
        <div style={containerStyle}>
          <div style={columnStyle}>
            <HeroIllustration />
          </div>

          <div style={columnStyle}>
            <SignInCard onSignIn={handleSignIn} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
