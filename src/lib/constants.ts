import {
  BookTemplate,
  Home,
  LayoutTemplate,
  Settings,
  Settings2,
  Trash2,
} from "lucide-react";

export const data = {
  user: {
    name: "shandcn",
    email: "me@hamil.com",
    avatar: "/avatar/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash2,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};
