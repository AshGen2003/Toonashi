"use server";

export interface User {
    // Define the User properties, e.g.:
    id: number;
    name: string;
    // Add other properties as needed
}

export const get = async (): Promise<User[]> => {
    const res = await fetch(`${process.env.APP_URL}/users`);
    if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.statusText}`);
    }
    const json = await res.json();
    console.log(json);
    return json as User[];
};