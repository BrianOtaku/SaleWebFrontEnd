import React from "react";

interface ProductDescriptionProps {
    description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const remainingDescriptions = description.split("\n");

    return (
        <div
            style={{
                border: '1px solid rgb(213,213,213)',
                padding: '10px',
                borderRadius: '8px',
                maxHeight: '800px',
                overflowY: 'auto'
            }}
        >
            <ul
                style={{
                    marginBottom: '0px'
                }}
            >
                {remainingDescriptions.map((desc, index) => (
                    desc.trim() && <li key={index}>{desc.trim()}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDescription;
