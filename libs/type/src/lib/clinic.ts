export interface Clinic {
    id: string;
    name: string;
    country: string;
    provinceState: string;
    city: string;
    logos: string[];
    primaryColour: string;
    secondaryColour: string;
    createdAt?: Date;
    updatedAt?: Date;
}