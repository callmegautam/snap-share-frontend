
export interface Photo {
  id: string;
  imageUrl: string;
  caption: string;
  creator: string;
  tags: string[];
  createdAt: string;
}

export const photos: Photo[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    caption: "Working from home on my new project",
    creator: "Emma Johnson",
    tags: ["work", "laptop", "home"],
    createdAt: "2024-04-12T14:22:00Z"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    caption: "Coding session today was productive",
    creator: "Alex Smith",
    tags: ["coding", "programming", "laptop"],
    createdAt: "2024-04-10T09:45:00Z"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    caption: "Planning my next big project",
    creator: "Sophia Williams",
    tags: ["planning", "laptop", "work"],
    createdAt: "2024-04-08T16:30:00Z"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    caption: "Deep in the matrix today",
    creator: "Noah Brown",
    tags: ["code", "matrix", "programming"],
    createdAt: "2024-04-05T11:15:00Z"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    caption: "Colorful code is the best code",
    creator: "Olivia Davis",
    tags: ["colorful", "code", "programming"],
    createdAt: "2024-04-03T13:50:00Z"
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    caption: "Taking a break by the lake",
    creator: "William Miller",
    tags: ["nature", "lake", "relax"],
    createdAt: "2024-04-01T10:20:00Z"
  }
];
