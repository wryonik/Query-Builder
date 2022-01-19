interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="rounded bg-indigo-600 hover:bg-indigo-700 py-2 px-4 text-white text-sm max-w-fit"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
