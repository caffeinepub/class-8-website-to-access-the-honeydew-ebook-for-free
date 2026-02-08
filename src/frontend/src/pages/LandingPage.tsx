import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import { BookOpen, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { data: books, isLoading, error, refetch } = useBooks();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-12 md:mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              <span>Free for Class 8 Students</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Access Your <span className="text-primary">Honeydew</span> eBook
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Read your NCERT English textbook online anytime, anywhere. Download for offline reading or view directly in your browser.
            </p>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img 
              src="/assets/generated/honeydew-hero.dim_1600x900.png" 
              alt="Students reading books" 
              className="w-full h-auto rounded-2xl shadow-medium"
            />
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Available eBooks</h2>
          <p className="text-muted-foreground">Start reading your textbook now</p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive font-medium mb-2">Failed to load books</p>
            <p className="text-sm text-muted-foreground mb-4">
              There was an error loading the book catalog. Please try again.
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        )}

        {books && books.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
        )}

        {books && books.length === 0 && !isLoading && (
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No books available at the moment</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mt-16 md:mt-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-xl p-6 shadow-soft">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Read Online</h3>
            <p className="text-muted-foreground">Access your textbook directly in your browser without any downloads</p>
          </div>
          <div className="bg-card border rounded-xl p-6 shadow-soft">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Download PDF</h3>
            <p className="text-muted-foreground">Save the book to your device for offline reading anytime</p>
          </div>
          <div className="bg-card border rounded-xl p-6 shadow-soft">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Always Free</h3>
            <p className="text-muted-foreground">No registration, no fees. Just free access to your textbooks</p>
          </div>
        </div>
      </section>
    </div>
  );
}
