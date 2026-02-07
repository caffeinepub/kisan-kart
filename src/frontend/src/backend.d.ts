import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ListingInput {
    title: string;
    contactInfo: string;
    unit: string;
    description: string;
    category: string;
    price: number;
    location: string;
    images: Array<string>;
}
export type ListingId = bigint;
export interface Listing {
    id: ListingId;
    title: string;
    contactInfo: string;
    owner: Principal;
    createdAt: bigint;
    unit: string;
    description: string;
    isActive: boolean;
    category: string;
    price: number;
    location: string;
    images: Array<string>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createListing(input: ListingInput): Promise<Listing>;
    deactivateListing(id: ListingId): Promise<void>;
    deleteListing(id: ListingId): Promise<void>;
    getActiveListings(): Promise<Array<Listing>>;
    getAllListings(): Promise<Array<Listing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getListing(id: ListingId): Promise<Listing>;
    getListingsByOwner(owner: Principal): Promise<Array<Listing>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateListing(id: ListingId, input: ListingInput): Promise<Listing>;
}
