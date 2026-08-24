import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500',
  secondary: 'bg-zinc-900 hover:bg-zinc-800',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
  disabled = false,
  onClick,
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 border-amber-700/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] shadow-sm transition',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
    '!text-white',
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
