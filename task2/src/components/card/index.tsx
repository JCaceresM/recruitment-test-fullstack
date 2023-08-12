import './styles.css';

type CardProps = {
    img: string;
    title?: string;
    breedsList?: string[];
};

const Card: React.FC<CardProps> = ({ img, title, breedsList }) => {
    const placeholderImage = "https://via.placeholder.com/150";

    return (
        <div className='card'>
            <div className='card-content'>
                <img className='card-img' src={img || placeholderImage} alt="img" />
                <ul className='card-breeds'>
                    {breedsList && breedsList.length > 0 ? (
                        breedsList.slice(0, 3).map((breed: string, index: number) => (
                            <li key={index}>{breed}</li>
                        ))
                    ) : (
                        <li>No hay razas</li>
                    )}
                </ul>
            </div>
            {title && <h2 className='card-title'>{title}</h2>}
        </div>
    );
};

export default Card;
