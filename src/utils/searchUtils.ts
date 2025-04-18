
import { Photo } from "../data/photosData";

export const searchPhotos = (photos: Photo[], query: string): Photo[] => {
  if (!query.trim()) {
    return photos;
  }
  
  const lowerCaseQuery = query.toLowerCase().trim();
  
  return photos.filter((photo) => {
    const matchesCaption = photo.caption.toLowerCase().includes(lowerCaseQuery);
    const matchesCreator = photo.creator.toLowerCase().includes(lowerCaseQuery);
    const matchesTags = photo.tags.some(tag => 
      tag.toLowerCase().includes(lowerCaseQuery)
    );
    
    return matchesCaption || matchesCreator || matchesTags;
  });
};
