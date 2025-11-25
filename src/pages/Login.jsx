// src/pages/Login/Login.jsx
import styles from "./Login.module.css";
import Navbar from "../components/Navbar/Navbar";
import HeroIllustration from "../components/Login/HeroIllustration/HeroIllustration";
import SignInCard from "../components/Login/SignInCard/SignInCard";
import Footer from "../components/Footer/Footer";

const Login = () => {
  const handleSignIn = (credentials) => {
    console.log("Sign in attempted:", credentials);
    // Add your login logic here
    // Example: API call, authentication, etc.
  };

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Left Section - Illustration */}
          <div className={styles.leftColumn}>
            <HeroIllustration />
          </div>

          {/* Right Section - Sign In Card */}
          <div className={styles.rightColumn}>
            <SignInCard onSignIn={handleSignIn} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
