import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text(); // raw body
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  // Connect to MongoDB once
  await connectDB();

  try {
    switch (eventType) {
      case "user.created":
        {
          const { id, email_addresses, first_name, last_name, image_url } = evt.data;
          await User.create({
            clerkId: id,
            email: email_addresses[0]?.email_address,
            firstName: first_name,
            lastName: last_name,
            username: email_addresses[0]?.email_address.split("@")[0],
            profileImage: image_url,
          });
          // console.dir(evt.data);
          console.log("New user created in MongoDB");
        }
        break;

      case "user.updated":
        {
          const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
          await User.findOneAndUpdate(
            { clerkId: id },
            {
              email: email_addresses[0]?.email_address,
              firstName: first_name,
              lastName: last_name,
              username: username || email_addresses[0]?.email_address.split("@")[0],
              profileImage: image_url,
            },
            { new: true }
          );
          console.log("User updated in MongoDB");
        }
        break;

      case "user.deleted":
        {
          await User.deleteOne({ clerkId: evt.data.id });
          console.log("🗑️ User deleted from MongoDB");
        }
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error processing ${eventType}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return NextResponse.json({ success: true });
}