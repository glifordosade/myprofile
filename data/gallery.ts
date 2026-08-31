import { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxjb2RlJTIwZWRpdG9yfGVufDB8fHx8MTc4NzkwMzcwNXww&ixlib=rb-4.1.0&q=85', title: 'Late-night refactor', category: 'Code', span: 'tall' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yfGVufDB8fHx8MTc4NzkwMzcwNXww&ixlib=rb-4.1.0&q=85', title: 'Terminal aesthetics', category: 'Code' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwzfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzg3OTAzNzA1fDA&ixlib=rb-4.1.0&q=85', title: 'Desk setup', category: 'Workspace', span: 'wide' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzg3OTAzNzA0fDA&ixlib=rb-4.1.0&q=85', title: 'Abstract systems', category: 'Abstract', span: 'tall' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxjb2RlJTIwZWRpdG9yfGVufDB8fHx8MTc4NzkwMzcwNXww&ixlib=rb-4.1.0&q=85', title: 'Building in public', category: 'Code' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHw0fHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzg3OTAzNzA1fDA&ixlib=rb-4.1.0&q=85', title: 'Focus mode', category: 'Workspace' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxjb2RlJTIwZWRpdG9yfGVufDB8fHx8MTc4NzkwMzcwNXww&ixlib=rb-4.1.0&q=85', title: 'Syntax & structure', category: 'Code', span: 'wide' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1669295384050-a1d4357bd1d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzg3OTAzNzA0fDA&ixlib=rb-4.1.0&q=85', title: 'Neon geometry', category: 'Abstract' },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzg3OTAzNzA0fDA&ixlib=rb-4.1.0&q=85', title: 'Data streams', category: 'Abstract', span: 'tall' },
  { id: 'g10', src: 'https://images.unsplash.com/photo-1707528041466-83a325f01a3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzg3OTAzNzA1fDA&ixlib=rb-4.1.0&q=85', title: 'Command center', category: 'Workspace' },
  { id: 'g11', src: 'https://images.pexels.com/photos/12939552/pexels-photo-12939552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Circuit close-up', category: 'Abstract', span: 'wide' },
  { id: 'g12', src: 'https://images.pexels.com/photos/12696432/pexels-photo-12696432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Hardware detail', category: 'Abstract' },
];

export const galleryCategories = ['All', ...Array.from(new Set(galleryItems.map((g) => g.category)))];
