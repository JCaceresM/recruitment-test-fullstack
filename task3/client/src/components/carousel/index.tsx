import React, { useState, useRef } from 'react';
import './styles.css';
import ProductCard from '../product-card';
import { IProduct } from '../../services/product';

interface CarouselProps {
    products: IProduct[];
}

const Carousel: React.FC<CarouselProps> = ({ products = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const scrollToItem = (index: number) => {
        const newIndex = index < 0 ? 0 : index >= products.length ? products.length - 1 : index;
        setCurrentIndex(newIndex);

        if (carouselRef.current) {
            carouselRef.current.scrollLeft = newIndex * carouselRef.current.offsetWidth;
        }
    };

    return (<>
        {products.length? <div className="carousel">
            <button
                className="prev-button"
                onClick={() => scrollToItem((currentIndex - 1 + products.length) % products.length)}
            >
                &#8249;
            </button>
            <div className="carousel" ref={carouselRef}>
                <div className="image-container">
                    {products.map((product, index) => (
                        <ProductCard
                            key={`${JSON.stringify(product)}-${index}`}
                            imageSrc={product.image}
                            price={product.price}
                            description={product.description}
                            className={index === currentIndex ? 'active' : ''}
                            user={product.user}
                        />
                    ))}
                </div>
            </div>
            <button
                className="next-button"
                onClick={() => scrollToItem((currentIndex + 1) % products.length)}
            >
                &#8250;
            </button>
        </div>: "No Hay Productos registrados"}
    </>
    );
};

export default Carousel;
