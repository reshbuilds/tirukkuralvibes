import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
  component?: React.ElementType;
  to?: string;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 24px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton variant="contained" color="primary" {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
