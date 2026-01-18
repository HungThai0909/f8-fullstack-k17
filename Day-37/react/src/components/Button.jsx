export const Button = ({
  children,
  variant = "default",
  disabled = false,
  onClick,
  isLoading = false,
  icon = null,
  iconPosition = "left",
  ...props
}) => {
  const variants = {
    default: "bg-gray-600 hover:bg-gray-500",
    primary: "bg-blue-600 hover:bg-blue-500",
    success: "bg-blue-600 hover:bg-blue-500",
    disabled: "bg-gray-600 text-gray-400 cursor-not-allowed",
  };

  const isDisabled = disabled || isLoading;
  const className = isDisabled ? variants.disabled : variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-8 py-3 text-white rounded-lg flex items-center gap-2 transition-colors min-w-[120px] justify-center cursor-pointer ${className}`}
      {...props}
    >
      {isLoading && <i className="fas fa-spinner fa-spin"></i>}
      {!isLoading && icon && iconPosition === "left" && (
        <i className={icon}></i>
      )}
      <span className={isLoading ? "opacity-80" : ""}>{children}</span>
      {icon && iconPosition === "right" && <i className={icon}></i>}
    </button>
  );
};
