import { pool } from "./db";

export interface SyncUserParams {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

export async function syncUser({ clerkId, email, firstName, lastName, imageUrl }: SyncUserParams) {
  const query = `
    INSERT INTO users (clerk_id, email, first_name, last_name, image_url)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    email = VALUES(email),
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    image_url = VALUES(image_url),
    last_login = NOW()
  `;

  await pool.execute(query, [clerkId, email, firstName ?? null, lastName ?? null, imageUrl ?? null]);
}
