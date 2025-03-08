import { CountryCode } from "dodopayments/resources/misc/supported-countries.mjs";
import { Payment as BasePayment } from "dodopayments/resources/payments.mjs";
import { Subscription as BaseSubscription } from "dodopayments/resources/subscriptions.mjs";

export type Payment = BasePayment & {
  payload_type: string;
  product_id: string;
};
export type Subscription = BaseSubscription & {
  payload_type: string;
  product_id: string;
};

export type OneTimeProduct = {
  product_id: string;
  quantity: number;
};

export type SubscriptionDetails = {
  activated_at: string;
  subscription_id: string;
  payment_frequency_interval: "Day" | "Week" | "Month" | "Year";
  product_id: string;
};

export type WebhookPayload = {
  type: string;
  data: Payment | Subscription;
};

export interface UpdateSubscriptionResult {
  success: boolean;
  error?: {
    message: string;
    status: number;
  };
}
export interface ProductPartProps {
  ProductDetails: {
    business_id?: string;
    created_at?: string;
    description?: string | null | undefined | "";
    image?: string | null | undefined | "";
    is_recurring: boolean;
    license_key_activation_message?: string | null | undefined | "";
    license_key_activations_limit?: number | null | undefined | "";
    license_key_duration?: any;
    license_key_enabled: boolean;
    name?: string | null | undefined | "";
    price: {
      currency: string;
      discount: number;
      price: number;
      purchasing_power_parity: boolean;
      type: string;
    };
    product_id: string;
    tax_category: string;
    updated_at: string;
  };
}
export interface existingUser {
  id: string;
  clerkId: string;
  email: string;
  purchasedProjects: string | null;
  subscription: boolean | null;
}

export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem;
  slideOrder: number;
  className?: string;
}
export type ContentType =
  | "column"
  | "resizable-column"
  | "text"
  | "paragraph"
  | "image"
  | "table"
  | "multiColumn"
  | "blank"
  | "imageAndText"
  | "heading1"
  | "heading2"
  | "heading3"
  | "title"
  | "heading4"
  | "table"
  | "blockquote"
  | "numberedList"
  | "bulletedList"
  | "code"
  | "link"
  | "quote"
  | "divider"
  | "calloutBox"
  | "todoList"
  | "bulletList"
  | "codeBlock"
  | "customButton"
  | "table"
  | "tableOfContents";

export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string | string[] | string[][];
  initialRows?: number;
  initialColumns?: number;
  restrictToDrop?: boolean;
  columns?: number;
  placeholder?: string;
  className?: string;
  alt?: string;
  callOutTypes?: "success" | "warning" | "info" | "question" | "caution";
  link?: string;
  code?: string;
  langauge?: string;
  bgColor?: string;
  isTransparent?: boolean;
}

export interface Theme {
  name: string;
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  slideBackgroundColor: string;
  accentColor: string;
  gradientBackground?: string;
  sidebarColor?: string;
  navbarColor?: string;
  type: "light" | "dark";
}

export interface OutlineCard {
  title: string;
  id: string;
  order: number;
}

export interface LayoutSlides {
  slideName: string;
  content: ContentItem;
  className?: string;
  type: string;
}

export interface Layout {
  name: string;
  icon: React.FC;
  type: string;
  component: LayoutSlides;
  layoutType: string;
}

export interface LayoutGroup {
  name: string;
  layouts: Layout[];
}

export interface ComponentGroup {
  name: string;
  components: Component[];
}

interface Component {
  name: string;
  icon: string;
  type: string;
  component: ContentItem;
  componentType: string;
}




export type SubscriptionRequest = {
    billing: {
        city: string;
        country: CountryCode;
        state: string;
        street: string;
        zipcode: number;
    };
    customer: {
        email: string;
        name: string;
        phone_number?: string;
        create_new_customer: boolean;
    };
};
