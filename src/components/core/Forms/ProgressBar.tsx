interface Props {
    percentage: number;
}

const ProgressBar = ({percentage}: Props) => {
    return (
        <div className="mt-8">
            <div className="h-1 bg-text-light rounded-full">
                <div
                    className="h-full bg-secondary-light rounded-full transition-all duration-300"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    )
};

export default ProgressBar;