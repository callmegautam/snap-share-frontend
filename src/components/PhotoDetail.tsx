import { ArrowLeft, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Photo } from '@/data/photosData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoDetailProps {
    photo: Photo;
}

const PhotoDetail = ({ photo }: PhotoDetailProps) => {
    const formattedDate = new Date(photo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='mb-6'>
                <Button variant='ghost' asChild>
                    <Link to='/' className='flex items-center gap-1'>
                        <ArrowLeft className='h-4 w-4' />
                        Back to all photos
                    </Link>
                </Button>
            </div>

            <Card className='overflow-hidden mb-8'>
                <CardContent className='p-0'>
                    <img
                        src={photo.imageUrl}
                        alt={photo.caption}
                        className='w-full h-auto object-contain max-h-[600px]'
                    />
                </CardContent>
            </Card>

            <div className='space-y-6'>
                <div>
                    <h1 className='text-2xl font-bold'>{photo.caption}</h1>
                    <p className='text-muted-foreground mt-1'>
                        By {photo.creator} · {formattedDate}
                    </p>
                </div>

                {photo.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 items-center'>
                        <Tag className='h-4 w-4 text-muted-foreground' />
                        {photo.tags.map((tag) => (
                            <Badge key={tag} variant='secondary'>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoDetail;
