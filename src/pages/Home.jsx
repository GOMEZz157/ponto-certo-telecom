import Cards from "../components/Cards";
import Contato from "./Contato";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Plans from "../components/Plans";
import Slider from "../components/Slider";
import Benefícios from "../components/Benefícios";


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
        {/* Seção de planos com ID para scroll */}
        <section id="planos">
          <Plans />
        </section>
        <section id="beneficios">
          <Benefícios />
        </section>
        <Contato />
        <Footer />
      </div>
    </section>
  );
};

export default Home;