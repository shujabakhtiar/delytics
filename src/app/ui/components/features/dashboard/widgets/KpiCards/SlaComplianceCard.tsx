import AssessmentIcon from '@mui/icons-material/Assessment';
import { KpiCard } from "@/app/ui/components/common/cards/KpiCard";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_SLA_COMPLIANCE = DashboardWidgetId.SLA_COMPLIANCE;

export const SlaComplianceCard = () => {
    return (
        <KpiCard 
            title="SLA Compliance" 
            value="94.2%" 
            trend="-2.1%" 
            trendType="down" 
            icon={<AssessmentIcon />} 
        />
    );
};
