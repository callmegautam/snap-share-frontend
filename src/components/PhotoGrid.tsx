
import PhotoCard from './PhotoCard';
import { Photo } from '@/data/photosData';

interface PhotoGridProps {
  photos: Photo[];
  emptyMessage?: string;
}

const PhotoGrid = ({ photos, emptyMessage = "No photos found" }: PhotoGridProps) => {
  if (photos.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default PhotoGrid;
