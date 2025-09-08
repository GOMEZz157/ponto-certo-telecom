import logo from "../assets/logo-horizontal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="bg-dark-blue w-screen">
      <nav className="flex justify-between items-center px-8 py-4 text-white">
        <img src={logo} className="max-h-13" alt="Logo da ponto certo" />
        <div className="flex gap-8 text-lg">
          <a href="/" className="hover:text-yellow">Home</a>
          <a href="/planos" className="hover:text-yellow">Planos</a>
          <a href="/contato" className="hover:text-yellow">Contato</a>
          <a href="https://pontocerto.dualstack.speedtestcustom.com/" className="hover:text-yellow">
            Speed Test
          </a>
        </div>
        <a
          href="https://pontocertotelecom.com.br/central_assinante_web/login"
          className="flex items-center gap-3 text-lg hover:bg-yellow hover:text-dark-blue px-4 py-2 rounded-2xl font-bold bg-dark-blue text-white border border-yellow transition-colors"
        >
          <FontAwesomeIcon icon={faCircleUser} />
          Central do Cliente
        </a>
      </nav>
    </header>
  );
}

export default Header;
