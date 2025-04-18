import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { photos } from '@/data/photosData';
import axios from 'axios';

const UploadForm = () => {
    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImagePreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagePreview) {
            toast({
                title: 'No image selected',
                description: 'Please select an image to upload',
                variant: 'destructive',
            });
            return;
        }

        try {
            // Simulate upload process
            setIsUploading(true);

            // GET PRE-SIGNED URL
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/photo/generate-upload-url`);

            if (response.status !== 200) {
                toast({
                    title: 'Error',
                    description: 'Failed to generate pre-signed URL',
                    variant: 'destructive',
                });
                return;
            }

            const url = response.data.data;

            // UPLOAD TO AZURE STORAGE
            const formData = new FormData();
            formData.append('file', image);

            const uploadResponse = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (uploadResponse.status !== 200) {
                toast({
                    title: 'Error',
                    description: 'Failed to upload image',
                    variant: 'destructive',
                });
                return;
            }

            const uploadedImageUrl = url.split('?')[0];

            const newPhoto = {
                photoUrl: uploadedImageUrl,
                caption,
                tags,
            };

            const finalResponse = await axios.post(`${import.meta.env.VITE_API_URL}/photo/upload`, newPhoto);

            if (finalResponse.status !== 200) {
                toast({
                    title: 'Error',
                    description: 'Failed to save photo in db',
                    variant: 'destructive',
                });
                return;
            }

            setIsUploading(false);
            toast({
                title: 'Success!',
                description: 'Your photo has been uploaded successfully.',
            });

            navigate('/');
        } catch (error) {
            setIsUploading(false);
            toast({
                title: 'Error',
                description: 'Failed to upload photo',
                variant: 'destructive',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6 max-w-xl mx-auto'>
            <div className='space-y-2'>
                <Label htmlFor='photo'>Photo</Label>
                {!imagePreview ? (
                    <div className='border-2 border-dashed rounded-lg p-12 text-center border-gray-300 hover:border-primary transition-colors'>
                        <Input
                            name='file'
                            id='photo'
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageChange}
                        />
                        <Label htmlFor='photo' className='cursor-pointer flex flex-col items-center'>
                            <Upload className='h-12 w-12 mb-4 text-gray-400' />
                            <span className='text-lg font-medium'>Click to upload a photo</span>
                            <span className='text-sm text-muted-foreground mt-1'>
                                PNG, JPG, GIF up to 10MB
                            </span>
                        </Label>
                    </div>
                ) : (
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt='Preview'
                            className='w-full h-auto max-h-[400px] object-contain rounded-lg'
                        />
                        <Button
                            type='button'
                            size='icon'
                            variant='secondary'
                            className='absolute top-2 right-2'
                            onClick={clearImage}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                )}
            </div>

            <div className='space-y-2'>
                <Label htmlFor='caption'>Caption</Label>
                <Textarea
                    id='caption'
                    placeholder='Write a caption for your photo...'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='resize-none'
                    required
                />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='tags'>Tags</Label>
                <Input
                    id='tags'
                    placeholder='Add tags separated by commas (e.g. nature, travel, food)'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <p className='text-xs text-muted-foreground'>Tags make your photos easier to find</p>
            </div>

            <Button type='submit' className='w-full' disabled={isUploading || !imagePreview}>
                {isUploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
        </form>
    );
};

export default UploadForm;
