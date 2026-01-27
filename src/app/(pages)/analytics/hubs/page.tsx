"use client";

import { Suspense } from "react";
import Hubs from "@/app/ui/components/features/analytics/hubs/Hubs";

export default function HubsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Hubs/>
        </Suspense>
    );
}