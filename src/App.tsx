import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Home as HomeIcon, Info as InfoIcon } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { useSwipeable } from 'react-swipeable';
import theme from './styles/themes/theme';
import Button from './components/common/Button';
import Loading from './components/common/Loading';
import KuralCard from './components/KuralCard/KuralCard';
import SearchBar from './components/SearchBar/SearchBar';
import { useKurals } from './hooks/useKurals';
import { searchKurals } from './utils/searchUtils';
import type { SearchResult } from './utils/searchUtils';

// Main App content
function AppContent() {
  const { kurals, loading, error } = useKurals();
  const [currentKuralIndex, setCurrentKuralIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const location = useLocation();

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    trackMouse: true
  });

  // Navigation functions
  const handleGoToKural = useCallback((index: number) => {
    console.log('handleGoToKural called with index:', index);
    console.log('Current kurals length:', kurals.length);
    if (index >= 0 && index < kurals.length) {
      console.log('Setting currentKuralIndex to:', index);
      setCurrentKuralIndex(index);
    } else {
      console.error('Invalid index provided to handleGoToKural:', index);
    }
  }, [kurals.length]);
  
  // Debug effect
  useEffect(() => {
    console.log('Current kural index changed to:', currentKuralIndex);
    console.log('Current kural data:', kurals[currentKuralIndex]);
  }, [currentKuralIndex, kurals]);

  const handleNext = useCallback(() => {
    handleGoToKural(currentKuralIndex + 1);
  }, [currentKuralIndex, handleGoToKural]);

  const handlePrevious = useCallback(() => {
    handleGoToKural(currentKuralIndex - 1);
  }, [currentKuralIndex, handleGoToKural]);

  // Handle search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      const results = searchKurals(query, kurals);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('An error occurred while searching. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  }, [kurals]);

  // Handle search result selection
  const handleSelectResult = useCallback((id: number) => {
    const selectedIndex = kurals.findIndex(k => k.KuralID === id);
    if (selectedIndex !== -1) {
      setCurrentKuralIndex(selectedIndex);
      // Scroll to top when a new kural is selected
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [kurals]);

  // Get current kural
  const currentKural = kurals[currentKuralIndex];

  // Show loading state
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loading message="Loading Tirukkural..." />
      </ThemeProvider>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Content
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" mb={3}>
            {error}
          </Typography>
          <Button 
            onClick={() => window.location.reload()}
            variant="contained"
            color="primary"
          >
            Try Again
          </Button>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Content
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" mb={3}>
            {error}
          </Typography>
          <Button 
            onClick={() => window.location.reload()}
            variant="contained"
            color="primary"
          >
            Try Again
          </Button>
        </Box>
      </ThemeProvider>
    );
  }
  // Render the app
  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
        <Typography variant="h5" color="error" gutterBottom>
          Error Loading Content
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" mb={3}>
          {error}
        </Typography>
        <Button 
          onClick={() => window.location.reload()}
          variant="contained"
          color="primary"
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component={Link}
              to="/"
            >
              <HomeIcon />
            </IconButton>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Tirukkural Vibes
            </Typography>
            
            <IconButton
              size="large"
              color="inherit"
              aria-label="about"
              component={Link}
              to="/about"
            >
              <InfoIcon />
            </IconButton>
          </Toolbar>
          
          {/* Search Bar */}
          {location.pathname === '/' && (
            <Box sx={{ px: 2, pb: 2, maxWidth: 800, mx: 'auto', width: '100%' }}>
              <SearchBar
                onSearch={handleSearch}
                onSelectResult={handleSelectResult}
                results={searchResults}
                loading={searchLoading}
                error={searchError}
                placeholder="Search by Tamil or English..."
              />
            </Box>
          )}
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, py: 4, px: 2 }} {...handlers}>
          <Container maxWidth="lg">
            <Routes>
              <Route
                path="/"
                element={
                  currentKural ? (
                    <KuralCard
                      kural={currentKural}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      onGoToKural={handleGoToKural}
                      hasNext={currentKuralIndex < kurals.length - 1}
                      hasPrevious={currentKuralIndex > 0}
                      totalKurals={kurals.length}
                    />
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Typography variant="h6" color="textSecondary">
                        No kurals found. Please try again later.
                      </Typography>
                    </Box>
                  )
                }
              />
              <Route
                path="/about"
                element={
                  <Box maxWidth={800} mx="auto" p={4}>
                    <Typography variant="h4" gutterBottom>
                      About Tirukkural Vibes
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Tirukkural Vibes is a kid-friendly app designed to help Tamil-speaking children and teens 
                      explore the timeless wisdom of the Tirukkural in an engaging and accessible way.
                    </Typography>
                    <Typography variant="h6" gutterBottom mt={4}>
                      Features:
                    </Typography>
                    <ul>
                      <li>Beautifully presented Tirukkural couplets in Tamil script</li>
                      <li>English transliteration for pronunciation help</li>
                      <li>Simple English translations for better understanding</li>
                      <li>Easy navigation between verses</li>
                      <li>Search functionality to find specific kurals</li>
                      <li>Kid-friendly, colorful interface</li>
                    </ul>
                    <Typography variant="body1" mt={4}>
                      The Tirukkural is a classic Tamil text consisting of 1,330 couplets dealing with the everyday 
                      virtues of an individual. It is one of the most important works in Tamil literature.
                    </Typography>
                  </Box>
                }
              />
            </Routes>
          </Container>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Tirukkural Vibes - Made with ❤️ for Tamil learners
            </Typography>
          </Container>
        </Box>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Main App component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
