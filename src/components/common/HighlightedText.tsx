import React from 'react';
import { Box } from '@mui/material';
import { getHighlightedTextParts } from '../../utils/searchUtils';

interface HighlightedTextProps {
  text: string;
  highlight?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight = '' }) => {
  if (!highlight) {
    return <>{text}</>;
  }

  const parts = getHighlightedTextParts(text, highlight);

  return (
    <Box component="span">
      {parts.map((part, index) => {
        const shouldHighlight = part.toLowerCase() === highlight.toLowerCase();
        return shouldHighlight ? (
          <Box
            key={index}
            component="span"
            sx={{
              backgroundColor: 'rgba(255, 235, 59, 0.4)',
              padding: '0 2px',
              borderRadius: 1,
            }}
          >
            {part}
          </Box>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </Box>
  );
};

export default HighlightedText;
