// api.js
export async function fetchData() {
    try {
        const responseDog = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!responseDog.ok) {
            throw new Error('Network response was not ok');
        }
        const dogJsonData = await responseDog.json();

        const combinedData = await Promise.all(
            Object.keys(dogJsonData.message).map(async (key) => {
                try {
                    const imageURL = `https://dog.ceo/api/breed/${key}/images/random`;
                    const responseImage = await fetch(imageURL);
                    if (!responseImage.ok) {
                        throw new Error('Network response for image was not ok');
                    }
                    const dogImageJsonData = await responseImage.json();
                    return {
                        breed: key,
                        breedsList: dogJsonData.message[key],
                        img: dogImageJsonData.message,
                    };
                } catch (error) {
                    console.error(`Error fetching image for ${key}:`, error);
                    return null;
                }
            })
        );

        return combinedData.filter(data => data !== null);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
