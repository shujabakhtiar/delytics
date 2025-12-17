'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; // Note: Grid version 2 is often default in newer MUI but standard Grid is fine. Using Box/Stack is safer.
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          
          <Box sx={{ 
              backgroundColor: theme.palette.primary.light + '20', 
              color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
              px: 2, 
              py: 0.5, 
              borderRadius: 10, 
              typography: 'caption', 
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
          }}>
              Enterprise Ready
          </Box>

          <Typography 
            variant="h1" 
            component="h1"
            sx={{ fontWeight: 800 }}
          >
            Smarter Delivery Management. <br />
            Faster Decisions.
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
                maxWidth: '600px', 
                lineHeight: 1.6,
                fontWeight: 400
            }}
          >
            Delytics helps businesses track, optimize, and analyze deliveries in real-time — saving time, reducing costs, and improving customer satisfaction.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2, width: '100%', justifyContent: 'center' }}>
            <Button 
                variant="contained" 
                size="large" 
                endIcon={<ArrowForwardIcon />}
                href="#"
                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
            >
              Get Started
            </Button>
            <Button 
                variant="outlined" 
                size="large"
                href="#features"
                sx={{ px: 4, py: 1.5, fontSize: '1rem', backgroundColor: theme.palette.background.paper }}
            >
              Learn More
            </Button>
          </Stack>
          
          {/* Dashboard Preview / Trust Section */}
          <Box sx={{ mt: 10, width: '100%' }}>
             <Paper 
                elevation={0}
                sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper,
                }}
             >
                <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight={600}>Overview</Typography>
                    <Stack direction="row" spacing={1}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EF4444' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10B981' }} />
                    </Stack>
                </Box>
                
                 {/* Mock Content */}
                 <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                     {/* Card 1 */}
                     <Box sx={{ flex: 1, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                         <Typography variant="caption" color="text.secondary" fontWeight={600}>TOTAL DELIVERIES</Typography>
                         <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>14,245</Typography>
                         <Typography variant="body2" color="success.main" sx={{ mt: 0.5 }}>+12% from last month</Typography>
                     </Box>
                     {/* Card 2 */}
                     <Box sx={{ flex: 1, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                         <Typography variant="caption" color="text.secondary" fontWeight={600}>AVG TIME</Typography>
                         <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>24m</Typography>
                         <Typography variant="body2" color="success.main" sx={{ mt: 0.5 }}>-5% improvement</Typography>
                     </Box>
                     {/* Card 3 */}
                    <Box sx={{ flex: 1, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                         <Typography variant="caption" color="text.secondary" fontWeight={600}>ACTIVE DRIVERS</Typography>
                         <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>328</Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Currently online</Typography>
                     </Box>
                 </Stack>
             </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
