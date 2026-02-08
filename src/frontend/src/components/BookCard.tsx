import { useNavigate } from '@tanstack/react-router';
import { BookOpen, ArrowRight } from 'lucide-react';
import type { Book } from '../backend';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  const handleReadClick = () => {
    navigate({ to: '/read/$bookTitle', params: { bookTitle: book.title } });
  };

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">NCERT Class 8 English Textbook</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>PDF Format</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Read anytime, anywhere</span>
          </div>
        </div>

        <button
          onClick={handleReadClick}
          className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium group-hover:gap-3"
        >
          <span>Read Now</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

