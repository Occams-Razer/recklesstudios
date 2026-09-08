import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Work from "./components/Work/Work";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
