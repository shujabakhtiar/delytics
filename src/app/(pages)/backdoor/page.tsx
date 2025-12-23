'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress,
  Stack
} from '@mui/material';
import { authResource } from '@/app/ui/resources/auth/authResource';
import { useTheme } from '@mui/material/styles';

export default function BackdoorPage() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await authResource.resetPassword(email, password);
      if (response.success) {
        setMessage({ type: 'success', text: `Success! Password for ${email} has been updated.` });
        setPassword('');
      } else {
        setMessage({ type: 'error', text: response.error || 'Failed to update password.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme.palette.mode === 'light' ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' : 'inherit',
        p: 3
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} color="primary" gutterBottom>
                Backdoor Access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Demo Tool: Update any user's password directly.
              </Typography>
            </Box>

            {message && (
              <Alert severity={message.type} sx={{ width: '100%' }}>
                {message.text}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="User Email"
                  type="email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={loading}
                />

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    py: 1.5, 
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: theme.shadows[4]
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Override Password'}
                </Button>
              </Stack>
            </form>
            
            <Typography variant="caption" color="text.disabled" textAlign="center">
              Note: This is a diagnostic tool for development environments only.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
