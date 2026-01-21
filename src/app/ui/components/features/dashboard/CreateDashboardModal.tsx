import React, { useState } from 'react';
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField,
    Alert
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '@/app/ui/providers/AuthProvider';

interface CreateDashboardModalProps {
    trigger?: React.ReactElement;
    onDashboardCreated?: () => void;
}

import { useRouter } from 'next/navigation';

export const CreateDashboardModal = ({ trigger, onDashboardCreated }: CreateDashboardModalProps) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, token } = useAuth();
    const router = useRouter();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setName('');
        setError(null);
    };

    const handleSubmit = async () => {
        if (!name.trim()) return;
        if (!user || !token) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    tenantId: user.tenantId,
                    createdBy: user.id,
                    // Sending regionId if available, otherwise it will be undefined/null
                    regionId: (user as any).regionId || null 
                })
            });

            if (!res.ok) throw new Error('Failed to create dashboard');

            const response = await res.json();
            
            handleClose();
            if (onDashboardCreated) onDashboardCreated();
            
            if (response.success && response.data?.id) {
                // Redirect to the new dashboard page
                router.push(`/dashboard/${response.data.id}`);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create dashboard. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {trigger ? (
                React.cloneElement(trigger as any, { onClick: handleOpen })
            ) : (

                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    onClick={handleOpen}
                >
                    Create Dashboard
                </Button>
            )}


            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Create New Dashboard</DialogTitle>
                <DialogContent>
                   {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Dashboard Name"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={loading || !name.trim()}>
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
