import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card'; // Make sure the import path matches your file structure
import { Container } from './components/container';
import { fetchData } from './api';

function App() {
    const [dogData, setDogData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchDogData() {
            try {
                const combinedData = await fetchData();
                setDogData(combinedData);
                setLoading(false);
                setError(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchDogData();
    }, []);



    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>Error fetching data.</p>;
    }

    if (dogData.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <Container>
            {dogData.map((dog: any) => (
                <Card key={dog.breed} {...dog} title={dog.breed} />
            ))}
        </Container>
    );
}

export default App;
