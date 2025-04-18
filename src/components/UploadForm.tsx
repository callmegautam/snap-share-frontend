
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { photos } from '@/data/photosData';

const UploadForm = () => {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload process
    setIsUploading(true);
    
    setTimeout(() => {
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const newPhoto = {
        id: (photos.length + 1).toString(),
        imageUrl: imagePreview,
        caption,
        creator: "Current User",
        tags: tagArray,
        createdAt: new Date().toISOString()
      };
      
      // In a real app, we would save to a database here
      // Instead we're just adding to our mock data
      photos.unshift(newPhoto);
      
      setIsUploading(false);
      toast({
        title: "Success!",
        description: "Your photo has been uploaded successfully.",
      });
      
      navigate('/');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>
        {!imagePreview ? (
          <div className="border-2 border-dashed rounded-lg p-12 text-center border-gray-300 hover:border-primary transition-colors">
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Label htmlFor="photo" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-12 w-12 mb-4 text-gray-400" />
              <span className="text-lg font-medium">Click to upload a photo</span>
              <span className="text-sm text-muted-foreground mt-1">
                PNG, JPG, GIF up to 10MB
              </span>
            </Label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto max-h-[400px] object-contain rounded-lg"
            />
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="caption">Caption</Label>
        <Textarea
          id="caption"
          placeholder="Write a caption for your photo..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="resize-none"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="Add tags separated by commas (e.g. nature, travel, food)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Tags make your photos easier to find
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isUploading || !imagePreview}
      >
        {isUploading ? "Uploading..." : "Upload Photo"}
      </Button>
    </form>
  );
};

export default UploadForm;
