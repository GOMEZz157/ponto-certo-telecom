const BlueButton = ({ text, variant = "primary", className = "" }) => {
  const base =
    "flex items-center justify-center font-bold py-4 px-11 rounded-2xl uppercase transition";

  const variants = {
    primary: "bg-blue text-white hover:bg-dark-blue hover:scale-x-105",
    secondary: "bg-dark-blue text-white hover:bg-blue",
    highlight: "bg-white text-dark-blue hover:bg-yellow hover:scale-x-105",
    nohover: "bg-blue text-white",
    third: "bg-white text-dark-blue hover:text-white hover:bg-blue",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {text}
    </button>
  );
};

export default BlueButton;
