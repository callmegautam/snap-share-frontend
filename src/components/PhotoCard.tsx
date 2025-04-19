import { Link } from 'react-router-dom';
import { Photo } from '@/data/photosData';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface PhotoCardProps {
    photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
    return (
        <Link to={`/photo/${photo.id}`} className='photo-card block'>
            <Card className='overflow-hidden h-full'>
                <CardContent className='p-0'>
                    <div className='aspect-square-custom'>
                        <img src={photo.photoUrl} alt={photo.caption} className='object-cover rounded-t-md' />
                    </div>
                </CardContent>
                <CardFooter className='p-3'>
                    <div>
                        <p className='font-medium line-clamp-1'>{photo.caption}</p>
                        <p className='text-sm text-muted-foreground'>By {photo.creator}</p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default PhotoCard;
