import React from 'react';
import './styles.css';

interface User {
    name: string;
}

interface ProductCardProps {
    imageSrc: string;
    price: number;
    description: string;
    className?: string;
    user?: Partial<User> | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
    imageSrc,
    price,
    description,
    className = '',
    user,
}) => {
    return (
        <div className={`product-card ${className}`}>
            <img src={imageSrc} alt="Product" className="product-image" />
            <div className="product-details">
                <p className="product-price">${price}</p>
                <p className="product-description">{description}</p>
                {user?.name && <p className="product-description">by {user?.name}</p>}
            </div>
        </div>
    );
};

export default ProductCard;
