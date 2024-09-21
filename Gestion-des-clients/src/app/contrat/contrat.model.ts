export interface Contrat {
    _id?: string;
    contraType: string;
    service: string;
    beginDate: string;
    finDate: string;
    status: string;
    clientId?: string | null; // Add clientId here
}

