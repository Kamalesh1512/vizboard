"use server";
import { getUserById } from "@/db/queries";
import { dodoPaymentsClient } from "@/lib/dodoPayments";
import { ProductPartProps, WebhookPayload } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { CountryCode } from "dodopayments/resources/misc/supported-countries.mjs";
import { z } from "zod";
import { onAuthenticateUser } from "./user";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  addressLine: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  phoneNumber: z.string().optional(),
  state: z.string().min(2, "State must be at least 2 characters"),
});

export async function buySubscription(
  formData: z.infer<typeof formSchema>,
  product_id: string
) {
  try {
    if (!formData || !product_id) {
      return { error: "Missing required fields", status: 400 };
    }

    const response = await dodoPaymentsClient.subscriptions.create({
      billing: {
        city: formData.city,
        country: formData.country as CountryCode,
        state: formData.state,
        street: formData.addressLine,
        zipcode: formData.zipCode,
      },
      customer: {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phoneNumber || undefined,
        create_new_customer: true,
      },
      payment_link: true,
      product_id: product_id,
      quantity: 1,
      return_url: process.env.NEXT_PUBLIC_RETURN_URL,
    });

    return { paymentLink: response.payment_link, status: 200 };
  } catch (error) {
    console.error("[Error_CREATE_SUBSCRIPTION]", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
