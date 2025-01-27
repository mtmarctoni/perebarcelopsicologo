interface BackButtonProps {
  show: boolean;
  onClick: () => void;
}

const BackButton = ({ show, onClick }: BackButtonProps) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="text-sm text-text-light hover:text-secondary transition-colors"
    >
      ← Volver atrás
    </button>
  );
};

export default BackButton;
