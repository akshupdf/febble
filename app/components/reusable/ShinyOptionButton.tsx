import React from 'react';

interface Props {
    text: string;
    selected: boolean;
    onClick: () => void;
}

const ShinyOptionButton: React.FC<Props> = ({ text, selected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`shiny-button w-full text-center text-sm font-semibold transition-all duration-300 ${selected ? 'selected' : ''
                }`}
        >
            {text}
            {selected && <div className="shine" />}
        </button>
    );
};

export default ShinyOptionButton;
