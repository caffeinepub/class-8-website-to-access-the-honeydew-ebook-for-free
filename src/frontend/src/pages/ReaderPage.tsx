import { useParams, useNavigate } from '@tanstack/react-router';
import { useBooks } from '../hooks/useBooks';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ReaderPage() {
  const { bookTitle } = useParams({ from: '/read/$bookTitle' });
  const navigate = useNavigate();
  const { data: books, isLoading } = useBooks();
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const book = books?.find(b => b.title.toLowerCase() === bookTitle.toLowerCase());

  useEffect(() => {
    if (book) {
      // Use the asset path from the backend
      setPdfUrl(book.assetPath);
    }
  }, [book]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
          <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Reader Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate({ to: '/' })}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div>
                <h2 className="font-semibold text-lg">{book.title}</h2>
                <p className="text-sm text-muted-foreground">NCERT Class 8 English</p>
              </div>
            </div>
            <a
              href={pdfUrl}
              download={`${book.title}.pdf`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 h-full py-4">
          <div className="h-full bg-card rounded-lg shadow-medium overflow-hidden">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title={`${book.title} PDF Viewer`}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading PDF...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

