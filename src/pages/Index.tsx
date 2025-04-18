import { useEffect, useState } from 'react';
import { photos } from '@/data/photosData';
import { searchPhotos } from '@/utils/searchUtils';
import Navbar from '@/components/Navbar';
import PhotoGrid from '@/components/PhotoGrid';
import axios from 'axios';

const Index = () => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/photo`)
            .then((response) => {
                setSearchResults(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setSearchResults([]);
            });
    }, []);

    const handleSearch = (query: string) => {
        const results = searchPhotos(searchResults, query);
        setSearchResults(results);
    };

    return (
        <div className='min-h-screen bg-background'>
            <Navbar onSearch={handleSearch} />
            <main className='max-w-7xl mx-auto p-6'>
                <h1 className='text-3xl font-bold mb-6'>Explore Photos</h1>
                <PhotoGrid
                    photos={searchResults}
                    emptyMessage='No photos match your search. Try something else!'
                />
            </main>
        </div>
    );
};

export default Index;
