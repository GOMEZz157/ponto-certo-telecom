
import logo from "../assets/logo-horizontal.png";
import BlueButton from "./BlueButton";
import rocket from "../assets/rocket.png";

const Footer = () => {


  return (
    <footer>
      <div className="bg-dark-blue flex justify-around items-center p-8 text-white flex-wrap gap-20 mt-30">
        <div className="font-bold max-w-xs flex flex-col gap-8">
          <h2 className="uppercase text-4xl">
            iNTERNET DE QUALIDADE É COM A PONTO CERTO
          </h2>
          <p className="text-xl text-yellow">
            QUER TIRAR DÚVIDAS OU SOLICITAR UM PLANO?
          </p>
          <BlueButton text="FALE com o suporte" variant="primary" />
        </div>
        <img src={logo} alt="Logo da ponto certo" />
      </div>
      <div className="bg-yellow flex justify-around items-center p-4 text-dark-blue flex-wrap gap-6">
        <p className="font-poppins">© 2021-2025 | Ponto Certo Internet. Todos os direitos reservados.</p>
        <p className="flex items-center gap-2">
          Desenvolvido por <img src={rocket} alt="icone da rocketride dev" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
