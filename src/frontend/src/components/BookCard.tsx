import { useNavigate } from '@tanstack/react-router';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { Book } from '../backend';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleReadClick = () => {
    navigate({ to: '/read/$bookTitle', params: { bookTitle: book.title } });
  };

  // Normalize the cover image path to map backend paths to actual asset locations
  const normalizeCoverImagePath = (path: string): string => {
    if (!path) return '';
    
    // Map backend paths to actual generated asset paths
    if (path === '/honeydew_cover.png') {
      return '/assets/generated/honeydew-cover-original.dim_600x900.png';
    }
    
    // If path already starts with /assets/, use as-is
    if (path.startsWith('/assets/')) {
      return path;
    }
    
    // Otherwise ensure it starts with /
    return path.startsWith('/') ? path : `/${path}`;
  };

  const coverImageSrc = normalizeCoverImagePath(book.coverImagePath);
  const showImage = book.coverImagePath && !imageError;

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group">
      {/* Cover Image Section */}
      {showImage ? (
        <div className="relative w-full aspect-[2/3] bg-muted overflow-hidden">
          <img
            src={coverImageSrc}
            alt={`${book.title} book cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="relative w-full aspect-[2/3] bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <BookOpen className="h-16 w-16 text-primary/40" />
        </div>
      )}

      {/* Book Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          NCERT Class 8 English Textbook
        </p>
        
        <button
          onClick={handleReadClick}
          className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group/btn"
        >
          <span>Read Now</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
