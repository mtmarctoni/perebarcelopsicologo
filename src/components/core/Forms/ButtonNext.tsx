interface Props {
    show: boolean;
    onClick: () => void;

}

const ButtonNext = ({ show, onClick }: Props) => {
    if (!show) return null;
    return (
        <div className="mt-4">
            <button
                onClick={onClick}
                className="px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-secondary-light transition-colors"
            >
                Continuar
            </button>
        </div>
    )
};

export default ButtonNext;
