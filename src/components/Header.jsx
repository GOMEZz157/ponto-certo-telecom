import logo from "../assets/logo-horizontal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// Lista de links comuns (desktop + mobile)
const links = [
  { href: "/", label: "Home" },
  { href: "/planos", label: "Planos" },
  { href: "/contato", label: "Contato" },
  { href: "https://pontocerto.dualstack.speedtestcustom.com/", label: "Speed Test" },
];

// Botão reutilizável
function CentralDoClienteButton({ className = "", onClick }) {
  return (
    <a
      href="https://pontocertotelecom.com.br/central_assinante_web/login"
      className={`flex items-center gap-3 text-lg font-bold border border-yellow rounded-2xl transition-colors px-6 py-3 ${className}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleUser} />
      Central do Cliente
    </a>
  );
}

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-dark-blue w-screen">
      <nav className="flex justify-between items-center px-8 py-4 text-white">
        {/* Logo */}
        <a href="/" className="cursor-pointer">
          <img src={logo} className="max-h-13" alt="Logo da ponto certo" />
        </a>

        {/* Botão Hamburguer (mobile) */}
        <button
          className="text-2xl hover:text-yellow focus:outline-none lg:hidden"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          <FontAwesomeIcon icon={menuAberto ? faTimes : faBars} />
        </button>

        {/* Menu desktop */}
        <ul className="gap-8 text-lg hidden lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-yellow">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botão Central do Cliente (desktop) */}
        <div className="hidden lg:flex">
          <CentralDoClienteButton className="bg-dark-blue text-white hover:bg-yellow hover:text-dark-blue" />
        </div>
      </nav>

      {/* Dropdown mobile */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuAberto ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 px-8 py-6 bg-dark-blue text-white border-t border-yellow">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-yellow"
                onClick={() => setMenuAberto(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="w-full">
            <CentralDoClienteButton
              className="w-full justify-center bg-dark-blue text-white hover:bg-yellow hover:text-dark-blue mt-2"
              onClick={() => setMenuAberto(false)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
