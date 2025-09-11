// Home.jsx
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Plans from "../components/Plans";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <section className="bg-offwhite relative">
      <Header />

      {/* Container do slider e cards */}
      <div className="relative">
        <Slider />
        {/* Cards sobrepostos sem quebrar o fluxo */}
        <div className="relative -mt-20 z-10">
          <Cards />
        </div>
      </div>

      {/* Espaço abaixo para não subir */}
      <div className="pt-20">
        <Plans />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
