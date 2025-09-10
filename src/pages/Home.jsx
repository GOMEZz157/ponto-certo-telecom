import Cards from "../components/Cards";
import Header from "../components/Header";
import Plans from "../components/Plans";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <section className="bg-offwhite">
      <Header />
      <Slider />
      <Cards />
      <Plans />
    </section>
  );
};

export default Home;
