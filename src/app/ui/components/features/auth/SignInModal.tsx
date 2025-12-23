'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '@/app/ui/providers/AuthProvider';
import { authResource } from '@/app/ui/resources/auth/authResource';

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ open, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authResource.login(email, password);
      if (response.success) {
        login(response.data.user, response.data.token);
        onClose();
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        Sign In to Delytics
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoFocus
            />
            
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Don't have an account? Contact your administrator.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} disabled={loading} fullWidth variant="outlined">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={loading}
            sx={{ fontWeight: 600 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
