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
  CircularProgress,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
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

  const handleQuickLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await authResource.login('aaron.smith@delytics.com', 'password');
      if (response.success) {
        login(response.data.user, response.data.token);
        onClose();
      } else {
        setError(response.error || 'Quick login failed. Ensure the demo user exists.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during quick login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, borderBottom: '1px solid', borderColor: 'divider' }}>
        Welcome to Delytics
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ minHeight: 350 }}>
          {/* Left: Standard Login */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5} sx={{ mt: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
                
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  size="small"
                />
                
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  size="small"
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  disabled={loading}
                  sx={{ py: 1, fontWeight: 700 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                </Button>
                
                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Don't have an account? Contact your administrator.
                </Typography>
              </Stack>
            </form>
          </Box>

          {/* Right: Quick Login options */}
          <Box sx={{ width: 300, bgcolor: 'action.hover', p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Demo Access
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Use the button below to instantly explore the dashboard with Super Admin privileges.
            </Typography>
            
            <Button 
              fullWidth
              variant="outlined"
              onClick={handleQuickLogin}
              disabled={loading}
              startIcon={<AdminPanelSettingsIcon />}
              sx={{ 
                py: 2, 
                borderRadius: 2, 
                fontWeight: 700,
                bgcolor: 'background.paper',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              Super Admin View
            </Button>
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
