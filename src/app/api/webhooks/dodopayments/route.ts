"use server";
import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { error } from "console";
import { NextResponse } from "next/server";
import { WebhookPayload } from "@/lib/types";
import { onAuthenticateUser } from "@/actions/user";
import { updateUserSubscription } from "@/db/queries";

const webhook = new Webhook(process.env.NEXT_DODO_WEBHOOK_KEY!);

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const rawBody = await request.text();

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody) as WebhookPayload;

    const email = payload.data.customer.email

    if (!email) {
      return NextResponse.json({
        error:"Missing Email ID",
        status:500
      })
    }


    if (payload.data?.payload_type === "Subscription") {
      switch (payload.data.status) {
        case "active":
          console.log("Subscription updating");
          await updateUserSubscription(email, { subscription: true });

          return NextResponse.json(
            { message: "Webhook processed successfully" },
            { status: 200 }
          );

        case "cancelled":
          console.log("Cancelling the subscriptions");
          await updateUserSubscription(email, {
            subscription: false,
          });

          return NextResponse.json(
            { message: "Webhook processed successfully" },
            { status: 200 }
          );
        case "on_hold":
          console.log("subscriptions is On hold");
          await updateUserSubscription(email, {
            subscription: false,
          });
          return NextResponse.json(
            { message: "Webhook processed successfully" },
            { status: 200 }
          );
        case "failed":
          return NextResponse.json(
            { message: "Webhook processed Failed" },
            { status: 500 }
          );
      }
    } else {
      console.log("Inside else webhook");
      return NextResponse.json(
        { message: "Webhook processed successfully [Payment]" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error_Wehbhook_Event_Handler", error);
    return NextResponse.json(
      { messsage: "Internal Server Error" },
      { status: 500 }
    );
  }
}
