import { useParams, Navigate } from 'react-router-dom';
import { photos } from '@/data/photosData';
import Navbar from '@/components/Navbar';
import PhotoDetail from '@/components/PhotoDetail';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PhotoView = () => {
    const { id } = useParams<{ id: string }>();

    const [photo, setPhoto] = useState({
        id: '',
        imageUrl: '',
        caption: '',
        creator: '',
        tags: [],
        createdAt: '',
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/photo/${id}`)
            .then((response) => {
                setPhoto(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                // setSearchResults([]);
            });
    }, []);

    if (!photo) {
        return <Navigate to='/' />;
    }

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <main className='max-w-7xl mx-auto p-6'>
                <PhotoDetail photo={photo} />
            </main>
        </div>
    );
};

export default PhotoView;
