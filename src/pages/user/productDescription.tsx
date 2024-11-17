import React from "react";

interface ProductDescriptionProps {
    description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const remainingDescriptions = description.split(",").slice(5);

    return (
        <div>
            <ul>
                {remainingDescriptions.map((desc, index) => (
                    <li key={index}>{desc.trim()}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDescription;
