import DashboardDetailContainer from "@/app/ui/components/features/dashboard/DashboardDetailContainer";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    return <DashboardDetailContainer dashboardId={Number(id)} />;
}
