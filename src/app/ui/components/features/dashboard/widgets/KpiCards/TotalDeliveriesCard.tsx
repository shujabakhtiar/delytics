import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { KpiCard } from "@/app/ui/components/common/cards/KpiCard";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_TOTAL_DELIVERIES = DashboardWidgetId.TOTAL_DELIVERIES;

export const TotalDeliveriesCard = () => {
    return (
        <KpiCard 
            title="Total Deliveries" 
            value="1,284" 
            trend="+12.5%" 
            trendType="up" 
            icon={<LocalShippingIcon />} 
        />
    );
};
