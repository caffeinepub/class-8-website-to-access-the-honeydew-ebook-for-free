import { useParams, useNavigate } from '@tanstack/react-router';
import { useBooks } from '../hooks/useBooks';
import { ArrowLeft, Download, Loader2, Search, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HONEYDEW_CHAPTERS, type Chapter } from '../constants/honeydewChapters';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type IframeLoadState = 'loading' | 'loaded' | 'error';

export default function ReaderPage() {
  const { bookTitle } = useParams({ from: '/read/$bookTitle' });
  const navigate = useNavigate();
  const { data: books, isLoading, error, refetch } = useBooks();
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>(HONEYDEW_CHAPTERS);
  const [iframeLoadState, setIframeLoadState] = useState<IframeLoadState>('loading');
  const [iframeKey, setIframeKey] = useState<number>(0);

  const book = books?.find(b => b.title.toLowerCase() === bookTitle.toLowerCase());

  // Normalize asset path to browser-usable URL
  const normalizeAssetPath = (path: string): string => {
    if (!path) return '';
    
    // If path is a full URL (http:// or https://), use it directly
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // If path is just a filename like "/Honeydew.pdf", prepend /assets/
    if (path.startsWith('/') && !path.startsWith('/assets/')) {
      return `/assets${path}`;
    }
    
    // Ensure path starts with /
    return path.startsWith('/') ? path : `/${path}`;
  };

  useEffect(() => {
    if (book) {
      // Normalize the asset path for browser usage
      const normalizedPath = normalizeAssetPath(book.assetPath);
      setPdfUrl(normalizedPath);
      setIframeLoadState('loading');
    }
  }, [book]);

  // Filter chapters based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredChapters(HONEYDEW_CHAPTERS);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = HONEYDEW_CHAPTERS.filter(chapter =>
        chapter.title.toLowerCase().includes(query)
      );
      setFilteredChapters(filtered);
    }
  }, [searchQuery]);

  const handleChapterClick = (page: number) => {
    if (book) {
      // Update iframe URL with page anchor using normalized path
      const normalizedPath = normalizeAssetPath(book.assetPath);
      setPdfUrl(`${normalizedPath}#page=${page}`);
      setIframeLoadState('loading');
    }
  };

  const handleIframeLoad = () => {
    setIframeLoadState('loaded');
  };

  const handleIframeError = () => {
    setIframeLoadState('error');
  };

  const handleRetryPdf = () => {
    setIframeKey(prev => prev + 1);
    setIframeLoadState('loading');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-4">Failed to Load Books</h2>
          <p className="text-muted-foreground mb-6">
            There was an error loading the book catalog. Please try again.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => refetch()}
              variant="default"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </Button>
          </div>
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
          <Button
            onClick={() => navigate({ to: '/' })}
            variant="default"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  // Get normalized path for all PDF links
  const normalizedPdfPath = normalizeAssetPath(book.assetPath);

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
            <div className="flex items-center gap-2">
              <a
                href={normalizedPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Open PDF</span>
              </a>
              <a
                href={normalizedPdfPath}
                download={`${book.title}.pdf`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 h-full py-4">
          <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-full">
            {/* Chapter Search Sidebar */}
            <div className="bg-card rounded-lg shadow-medium border overflow-hidden flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold mb-3">Chapters</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search chapters"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredChapters.length > 0 ? (
                    <div className="space-y-1">
                      {filteredChapters.map((chapter, index) => (
                        <button
                          key={index}
                          onClick={() => handleChapterClick(chapter.page)}
                          className="w-full text-left px-3 py-2.5 rounded-md hover:bg-accent transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {chapter.title}
                            </span>
                            <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                              p.{chapter.page}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4">
                      <p className="text-sm text-muted-foreground">No chapters found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* PDF Viewer */}
            <div className="bg-card rounded-lg shadow-medium overflow-hidden relative">
              {pdfUrl && (
                <>
                  <iframe
                    key={iframeKey}
                    src={pdfUrl}
                    className="w-full h-full"
                    title={`${book.title} PDF Viewer`}
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                  />
                  {iframeLoadState === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading PDF...</p>
                      </div>
                    </div>
                  )}
                  {iframeLoadState === 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card">
                      <div className="text-center max-w-md px-4">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                        <h3 className="text-lg font-semibold mb-2">Cannot Display PDF</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Some PDFs cannot be embedded in this viewer due to security restrictions. Please use the "Open PDF" button below to view it in a new tab.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            asChild
                            variant="default"
                            className="gap-2"
                          >
                            <a
                              href={normalizedPdfPath}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open PDF
                            </a>
                          </Button>
                          <Button
                            onClick={handleRetryPdf}
                            variant="outline"
                            className="gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Retry
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {!pdfUrl && (
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
    </div>
  );
}
