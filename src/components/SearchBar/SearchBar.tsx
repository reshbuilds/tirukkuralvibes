import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Fade,
  ClickAwayListener,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SearchContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 30,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(1.5),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  maxHeight: 400,
  overflowY: 'auto',
  borderRadius: 12,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  zIndex: 1300,
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
    borderRadius: '0 12px 12px 0',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    borderRadius: 3,
    '&:hover': {
      background: theme.palette.grey[500],
    },
  },
}));

const ResultItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: `${theme.palette.primary.light}20`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.light}30`,
    },
  },
}));

const KuralNumberBadge = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
  height: 24,
  padding: theme.spacing(0, 1),
  borderRadius: 12,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
  fontWeight: 600,
  marginRight: theme.spacing(1.5),
}));

interface SearchResult {
  id: number;
  tamil: string[];
  english: string[];
  highlight: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelectResult: (id: number) => void;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSelectResult,
  results,
  loading,
  error,
  placeholder = 'Search by Tamil or English...',
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleResultClick = (id: number) => {
    onSelectResult(id);
    setShowResults(false);
    setQuery('');
  };

  const handleFocus = () => {
    if (query.trim() && results.length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    // Use setTimeout to allow click events to fire on the results before hiding them
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
      <span key={i} style={{ backgroundColor: 'rgba(255, 235, 59, 0.4)', padding: '0 2px', borderRadius: 3 }}>{part}</span> : 
      part
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setShowResults(false)}>
      <SearchContainer>
        <StyledTextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  aria-label="clear search"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Fade in={showResults && (results.length > 0 || loading || !!error)}>
          <SearchResults elevation={3}>
            {loading ? (
              <Box p={2} textAlign="center">
                <Typography color="textSecondary">Searching...</Typography>
              </Box>
            ) : error ? (
              <Box p={2}>
                <Typography color="error">{error}</Typography>
              </Box>
            ) : results.length > 0 ? (
              <List disablePadding>
                {results.map((result) => (
                  <ResultItem
                    key={result.id}
                    onClick={() => handleResultClick(result.id)}
                  >
                    <KuralNumberBadge>{result.id + 1}</KuralNumberBadge>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body2" color="textPrimary" noWrap>
                            {result.tamil[0]} {result.tamil[1]}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" noWrap>
                            {result.english[0]} {result.english[1]}
                          </Typography>
                        </>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary" noWrap>
                          {highlightMatch(
                            `${result.english[0]} ${result.english[1]}`,
                            result.highlight
                          )}
                        </Typography>
                      }
                      secondaryTypographyProps={{
                        component: 'div',
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" size="small">
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ResultItem>
                ))}
              </List>
            ) : null}
          </SearchResults>
        </Fade>
      </SearchContainer>
    </ClickAwayListener>
  );
};

export default SearchBar;
