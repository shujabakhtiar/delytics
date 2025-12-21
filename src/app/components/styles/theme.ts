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
      color: mode === 'light' ? '#111827' : '#F8FAFC',
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: mode === 'light' ? '#1F2937' : '#F1F5F9',
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: mode === 'light' ? '#111827' : '#F8FAFC',
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: mode === 'light' ? '#111827' : '#F8FAFC',
    },
    h6: {
        fontWeight: 600,
        letterSpacing: '0.01em',
        color: mode === 'light' ? '#111827' : '#F8FAFC',
    },
    button: {
        fontWeight: 600,
        textTransform: 'none',
    },
    body1: {
        color: mode === 'light' ? '#374151' : '#94A3B8',
    },
    body2: {
        color: mode === 'light' ? '#6B7280' : '#64748B',
    },
  },
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2563EB' : '#3B82F6', 
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10B981', // Success Green
    },
    error: {
      main: '#EF4444', 
    },
    background: {
      default: mode === 'light' ? '#F3F4F6' : '#020617', 
      paper: mode === 'light' ? '#ffffff' : '#0F172A', 
    },
    text: {
        primary: mode === 'light' ? '#111827' : '#F8FAFC',
        secondary: mode === 'light' ? '#6B7280' : '#94A3B8',
    },
    divider: mode === 'light' ? '#E5E7EB' : '#1E293B',
  },
  shape: {
      borderRadius: 12, 
  },
  components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  borderRadius: 8,
                  padding: '8px 160',
                  boxShadow: 'none',
                  '&:hover': {
                      boxShadow: 'none',
                  }
              },
              containedPrimary: {
                  background: mode === 'light' ? '#2563EB' : '#3B82F6',
                  '&:hover': {
                      background: mode === 'light' ? '#1D4ED8' : '#2563EB',
                  }
              }
          }
      },
      MuiPaper: {
          styleOverrides: {
              root: {
                  backgroundImage: 'none',
                  boxShadow: 'none',
                  border: mode === 'light' ? '1px solid #E5E7EB' : '1px solid #1E293B',
                  background: mode === 'light' ? '#ffffff' : '#0F172A',
              }
          }
      },
      MuiAppBar: {
          styleOverrides: {
              root: {
                  background: mode === 'light' ? '#ffffff' : '#020617',
                  boxShadow: 'none',
                  borderBottom: `1px solid ${mode === 'light' ? '#E5E7EB' : '#1E293B'}`,
                  color: mode === 'light' ? '#111827' : '#F8FAFC',
                  zIndex: 1300, 
              }
          }
      },
      MuiDrawer: {
          styleOverrides: {
              paper: {
                  background: mode === 'light' ? '#ffffff' : '#020617',
                  borderRight: `1px solid ${mode === 'light' ? '#E5E7EB' : '#1E293B'}`,
              }
          }
      },
      MuiListItemButton: {
          styleOverrides: {
              root: {
                  borderRadius: 8,
                  margin: '4px 8px',
                  '&.Mui-selected': {
                      backgroundColor: mode === 'light' ? '#F3F4F6' : '#1E293B',
                      '&:hover': {
                          backgroundColor: mode === 'light' ? '#E5E7EB' : '#334155',
                      },
                  },
              }
          }
      }
  }
});
