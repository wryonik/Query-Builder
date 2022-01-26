interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "disabled";
}

const defaultProps = {
  variant: "primary",
  disabled: false,
  label: "Button",
};

const Button = ({ label, onClick, disabled, variant }: ButtonProps) => {
  return (
    <button
      className={`rounded bg-indigo-600 hover:bg-indigo-700 py-2 px-4 text-white text-sm w-max ${
        variant === "disabled" ? "bg-disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
