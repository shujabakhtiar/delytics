export interface Region {
    id?: number;
    name: string;
    tenantId: number;
    timezone: string;
}

export interface RegionCreateInput {
    name: string;
    tenantId: number;
    timezone: string;
}