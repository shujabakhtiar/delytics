import HubIcon from '@mui/icons-material/Hub';
import { KpiCard } from "@/app/ui/components/common/cards/KpiCard";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_ACTIVE_HUBS = DashboardWidgetId.ACTIVE_HUBS;

export const ActiveHubsCard = () => {
    return (
        <KpiCard 
            title="Active Hubs" 
            value="12" 
            trend="Stable" 
            icon={<HubIcon />} 
        />
    );
};
