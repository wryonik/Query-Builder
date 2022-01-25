interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="rounded bg-indigo-600 hover:bg-indigo-700 py-2 px-4 text-white text-sm w-max disabled:bg-disabled"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
