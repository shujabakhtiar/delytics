import SpeedIcon from '@mui/icons-material/Speed';
import { KpiCard } from "@/app/ui/components/common/cards/KpiCard";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_AVG_DELIVERY_TIME = DashboardWidgetId.AVG_DELIVERY_TIME;

export const AvgDeliveryTimeCard = () => {
    return (
        <KpiCard 
            title="Avg. Delivery Time" 
            value="24.5 min" 
            trend="-1.5 min" 
            trendType="up" // Lower is better for time
            icon={<SpeedIcon />} 
        />
    );
};
