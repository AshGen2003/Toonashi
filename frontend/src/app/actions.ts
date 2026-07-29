'use server';

import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/sync-user";

export async function syncUserAction() {
  const user = await currentUser();
  if (!user) return;

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return;

  await syncUser({
    clerkId: user.id,
    email,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
  });
}