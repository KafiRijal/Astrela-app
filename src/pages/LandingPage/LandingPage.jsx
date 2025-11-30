import Navbar from "../../components/LandingPage/Navbar/Navbar";
import Hero from "../../components/LandingPage/Hero/Hero";
import About from "../../components/LandingPage/About/About";
import Features from "../../components/LandingPage/Features/Features";
import HowItWorks from "../../components/LandingPage/HowItWorks/HowItWorks";
import Footer from "../../components/LandingPage/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
