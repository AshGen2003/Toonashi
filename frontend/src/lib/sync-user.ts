import type { User } from "@clerk/nextjs/server";
import { pool } from "./db";

export async function syncUser(user: User) {
  try {
    const userData = {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };

    // Example MySQL UPSERT query (Insert or Update if exists)
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

    await pool.execute(query, [
      userData.clerkId, userData.email, userData.firstName, userData.lastName, userData.imageUrl
    ]);
  } catch (error) {
    console.error("Error syncing user to database:", error);
  }
}
