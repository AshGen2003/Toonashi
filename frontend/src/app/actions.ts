'use server';

import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/sync-user";

export async function syncUserAction() {
  const user = await currentUser();
  if (user) await syncUser(user);
}