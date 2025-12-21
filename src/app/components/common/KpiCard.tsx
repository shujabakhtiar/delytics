import { Box, Typography } from "@mui/material";

export const KpiCard = (props: { title: string, value: string }) => {
    return (
        <Box sx={{ p: 2, minWidth: 170, borderRadius: 2, border: '1px solid #E5E7EB' }}>
            <Typography variant="h6">
                {props.title}
            </Typography>
            <Typography variant="h4">
                {props.value}
            </Typography>
        </Box>
    );
}