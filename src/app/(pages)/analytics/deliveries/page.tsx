"use client";

import { Suspense } from "react";
import Deliveries from "@/app/ui/components/features/analytics/deliveries/Deliveries";

export default function DeliveriesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Deliveries/>
        </Suspense>
    );
}