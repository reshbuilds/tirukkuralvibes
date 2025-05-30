import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import HighlightedText from '../common/HighlightedText';
import { styled } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { Kural } from '../../hooks/useKurals';

interface KuralCardProps {
  kural: Kural;
  onNext: () => void;
  onPrevious: () => void;
  onGoToKural: (id: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
  totalKurals: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  padding: theme.spacing(3),
  borderRadius: 16,
  background: 'linear-gradient(145deg, #ffffff, #e6f7ed)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'visible',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const KuralNumber = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -20,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const KuralText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Tamil Sangam MN", "Latha", "Nirmala UI", sans-serif',
  fontSize: '1.8rem',
  fontWeight: 500,
  lineHeight: 1.4,
  color: theme.palette.primary.dark,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const TransliterationText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Nunito", "Roboto", sans-serif',
  fontSize: '1.1rem',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  lineHeight: 1.6,
}));

const MeaningText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Nunito", "Roboto", sans-serif',
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginTop: theme.spacing(3),
  padding: theme.spacing(2, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  lineHeight: 1.6,
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  width: 48,
  height: 48,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
}));

const KuralCard: React.FC<KuralCardProps> = ({
  kural,
  onNext,
  onPrevious,
  onGoToKural,
  hasNext,
  hasPrevious,
  totalKurals,
}) => {
  const currentKuralNumber = kural.KuralID + 1; // Display as 1-based index
  const [kuralInput, setKuralInput] = useState(currentKuralNumber);
  
  const handleKuralInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setKuralInput(1);
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 1330) {
      setKuralInput(num);
    }
  };
  
  const handleGoToKuralClick = () => {
    onGoToKural(kuralInput - 1); // Convert back to 0-based for internal use
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoToKuralClick();
    }
  };
  
  return (
    <Box position="relative" width="100%" maxWidth={900} mx="auto" px={2}>
      <NavigationButton
        onClick={onPrevious}
        disabled={!hasPrevious}
        style={{ left: 0 }}
        aria-label="Previous kural"
      >
        <ChevronLeft fontSize="large" />
      </NavigationButton>

      <StyledCard elevation={3}>
        <Box display="flex" justifyContent="center" mb={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" mr={1}>
            Kural:
          </Typography>
          <input
            type="number"
            value={kuralInput}
            onChange={handleKuralInput}
            onKeyDown={handleKeyDown}
            min={1}
            max={1330}
            style={{
              width: '60px',
              padding: '4px 8px',
              margin: '0 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              textAlign: 'center'
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoToKuralClick}
            disabled={kuralInput < 1 || kuralInput > totalKurals}
          >
            Go
          </Button>
        </Box>
        <KuralNumber>{currentKuralNumber}</KuralNumber>
        <CardContent>
          <KuralText variant="h2">
            {kural.VerseTamil.map((line, index) => (
              <Box key={`tamil-${index}`}>
                <HighlightedText 
                  text={line} 
                  highlight={kural.highlight} 
                />
              </Box>
            ))}
          </KuralText>
          
          {/* Transliteration */}
          <TransliterationText variant="body1">
            {kural.VerseTranslit.map((line: string, index: number) => (
              <Box key={`transliteration-${index}`}>
                {line}
              </Box>
            ))}
          </TransliterationText>
          
          {/* English Meaning */}
          <MeaningText variant="body1">
            {kural.VerseEnglish.map((line, index) => (
              <Box key={`english-${index}`}>
                <HighlightedText 
                  text={line} 
                  highlight={kural.highlight} 
                />
              </Box>
            ))}
          </MeaningText>
          
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {currentKuralNumber} / {totalKurals}
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>

      <NavigationButton
        onClick={onNext}
        disabled={!hasNext}
        style={{ right: 0 }}
        aria-label="Next kural"
      >
        <ChevronRight />
      </NavigationButton>
    </Box>
  );
};

export default KuralCard;
