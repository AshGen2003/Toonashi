import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { syncUser } from "@/lib/sync-user";

interface ClerkUserEvent {
  type: string;
  data: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    email_addresses: { email_address: string }[];
  };
}

export async function POST(request: NextRequest) {
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const payload = await request.text();
  const wh = new Webhook(secret);

  let event: ClerkUserEvent;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const { data } = event;
    const email = data.email_addresses[0]?.email_address;

    if (!email) {
      return NextResponse.json({ error: "No email on user event" }, { status: 400 });
    }

    try {
      await syncUser({
        clerkId: data.id,
        email,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      });
    } catch (error) {
      console.error("Error syncing user from Clerk webhook:", error);
      return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Webhook received" });
}
