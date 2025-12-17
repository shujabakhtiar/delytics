'use client';
import { ThemeOptions } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const getTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: mode === 'light' ? '#111827' : '#F9FAFB',
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: mode === 'light' ? '#1F2937' : '#F3F4F6',
    },
    h6: {
        fontWeight: 600,
        letterSpacing: '0.01em',
    },
    button: {
        fontWeight: 600,
        textTransform: 'none',
    },
    body1: {
        color: mode === 'light' ? '#374151' : '#D1D5DB',
    },
  },
  palette: {
    mode,
    primary: {
      main: '#2563EB', // Enterprise Blue (Tailwind blue-600 ish)
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10B981', // Success Green
    },
    background: {
      default: mode === 'light' ? '#F3F4F6' : '#111827', // Soft gray for light mode
      paper: mode === 'light' ? '#ffffff' : '#1F2937',
    },
    text: {
        primary: mode === 'light' ? '#111827' : '#F9FAFB',
        secondary: mode === 'light' ? '#6B7280' : '#9CA3AF',
    },
    divider: mode === 'light' ? '#E5E7EB' : '#374151',
  },
  shape: {
      borderRadius: 8, // Slightly tighter radius for enterprise feel
  },
  components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  borderRadius: 8,
                  padding: '8px 16px',
                  boxShadow: 'none',
                  '&:hover': {
                      boxShadow: 'none',
                  }
              },
              containedPrimary: {
                  background: '#2563EB',
                  '&:hover': {
                      background: '#1D4ED8',
                  }
              },
              outlined: {
                  borderColor: mode === 'light' ? '#D1D5DB' : '#4B5563',
                  color: mode === 'light' ? '#374151' : '#D1D5DB',
              }
          }
      },
      MuiPaper: {
          styleOverrides: {
              root: {
                  backgroundImage: 'none',
                  boxShadow: mode === 'light' 
                    ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)' 
                    : 'none', // Very subtle shadow for cards
                  border: mode === 'light' ? '1px solid #E5E7EB' : '1px solid #374151',
              }
          }
      },
      MuiAppBar: {
          styleOverrides: {
              root: {
                  background: mode === 'light' ? '#ffffff' : '#1F2937',
                  boxShadow: 'none',
                  borderBottom: `1px solid ${mode === 'light' ? '#E5E7EB' : '#374151'}`,
                  color: mode === 'light' ? '#111827' : '#F9FAFB',
              }
          }
      }
  }
});
