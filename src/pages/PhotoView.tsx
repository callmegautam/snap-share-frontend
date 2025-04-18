
import { useParams, Navigate } from 'react-router-dom';
import { photos } from '@/data/photosData';
import Navbar from '@/components/Navbar';
import PhotoDetail from '@/components/PhotoDetail';

const PhotoView = () => {
  const { id } = useParams<{ id: string }>();
  
  const photo = photos.find(p => p.id === id);
  
  if (!photo) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <PhotoDetail photo={photo} />
      </main>
    </div>
  );
};

export default PhotoView;
