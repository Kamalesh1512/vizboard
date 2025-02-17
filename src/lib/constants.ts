import {
  BookTemplate,
  Home,
  LayoutTemplate,
  Settings,
  Settings2,
  Trash2,
} from "lucide-react";
import { Theme } from "./types";

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

// animation used
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


export const itemVariants = {
  hidden: { y:20, opacity: 0 },
  visible: {
    y:0,
    opacity: 1,
    transition: {
      type:'spring',
      stiffness: 100,
    },
  },
};


export const themes : Theme[] =[
  {
    name:'Default',
    fontFamily:' "Inter", sans-serif',
    fontColor:'#333333',
    backgroundColor:'#f0f0f0',
    slideBackgroundColor:'#ffffff',
    accentColor:'#3b82f6',
    type:'light',
  },
  {
    name: 'Tech Vibrant',
    fontFamily: '"Roboto", sans-serif',
    fontColor: '#ffffff',
    backgroundColor: '#2c3e50',
    slideBackgroundColor: '#34495e',
    accentColor: '#e74c3c',
    gradientBackground: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
    navbarColor: '#34495e',
    sidebarColor: '#2c3e50',
    type: 'dark',
  },
  {
    name: 'Pastel Dream',
    fontFamily: '"Lato", sans-serif',
    fontColor: '#4a4e69',
    backgroundColor: '#f7e8e8',
    slideBackgroundColor: '#ffffff',
    accentColor: '#b5838d',
    gradientBackground: 'linear-gradient(135deg, #f7e8e8 0%, #e5cece 100%)',
    navbarColor: '#e5cece',
    sidebarColor: '#f7e8e8',
    type: 'light',
  },
  {
    name: 'Cyber Neon',
    fontFamily: '"Orbitron", sans-serif',
    fontColor: '#0ff',
    backgroundColor: '#0a0a0a',
    slideBackgroundColor: '#131313',
    accentColor: '#ff00ff',
    gradientBackground: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
    navbarColor: '#131313',
    sidebarColor: '#1a1a1a',
    type: 'dark',
  },
  {
    name: 'Sunset Glow',
    fontFamily: '"Poppins", sans-serif',
    fontColor: '#fffbf1',
    backgroundColor: '#ff9a8b',
    slideBackgroundColor: '#ff6a88',
    accentColor: '#ff2e63',
    gradientBackground: 'linear-gradient(135deg, #ff9a8b 0%, #ff6a88 100%)',
    navbarColor: '#ff6a88',
    sidebarColor: '#ff9a8b',
    type: 'light',
  },
  {
    name: 'Ocean Breeze',
    fontFamily: '"Quicksand", sans-serif',
    fontColor: '#ffffff',
    backgroundColor: '#1c92d2',
    slideBackgroundColor: '#4682b4',
    accentColor: '#2a9df4',
    gradientBackground: 'linear-gradient(135deg, #1c92d2 0%, #4682b4 100%)',
    navbarColor: '#2a9df4',
    sidebarColor: '#1c92d2',
    type: 'light',
  },
  {
    name: 'Midnight Elegance',
    fontFamily: '"Merriweather", serif',
    fontColor: '#c0c0c0',
    backgroundColor: '#121212',
    slideBackgroundColor: '#1e1e1e',
    accentColor: '#f39c12',
    gradientBackground: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
    navbarColor: '#1e1e1e',
    sidebarColor: '#151515',
    type: 'dark',
  },
  {
    name: 'Forest Whisper',
    fontFamily: '"Raleway", sans-serif',
    fontColor: '#ffffff',
    backgroundColor: '#556b2f',
    slideBackgroundColor: '#6b8e23',
    accentColor: '#a4c639',
    gradientBackground: 'linear-gradient(135deg, #556b2f 0%, #6b8e23 100%)',
    navbarColor: '#6b8e23',
    sidebarColor: '#556b2f',
    type: 'dark',
  },
  {
    name: 'Minimal White',
    fontFamily: '"Montserrat", sans-serif',
    fontColor: '#000000',
    backgroundColor: '#ffffff',
    slideBackgroundColor: '#f8f9fa',
    accentColor: '#f1c40f',
    gradientBackground: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    navbarColor: '#f8f9fa',
    sidebarColor: '#ffffff',
    type: 'light',
  },
  {
    name: 'Lava Flow',
    fontFamily: '"Titillium Web", sans-serif',
    fontColor: '#f9f9f9',
    backgroundColor: '#800000',
    slideBackgroundColor: '#900C3F',
    accentColor: '#ff4500',
    gradientBackground: 'linear-gradient(135deg, #800000 0%, #900C3F 100%)',
    navbarColor: '#900C3F',
    sidebarColor: '#800000',
    type: 'dark',
  },
  {
    name: 'Arctic Ice',
    fontFamily: '"Nunito", sans-serif',
    fontColor: '#ffffff',
    backgroundColor: '#6dd5ed',
    slideBackgroundColor: '#2193b0',
    accentColor: '#bde0fe',
    gradientBackground: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
    navbarColor: '#2193b0',
    sidebarColor: '#6dd5ed',
    type: 'light',
  },
  {
    name: 'Rose Gold',
    fontFamily: '"Playfair Display", serif',
    fontColor: '#4a4a4a',
    backgroundColor: '#f5b7b1',
    slideBackgroundColor: '#f1948a',
    accentColor: '#c0392b',
    gradientBackground: 'linear-gradient(135deg, #f5b7b1 0%, #f1948a 100%)',
    navbarColor: '#f1948a',
    sidebarColor: '#f5b7b1',
    type: 'light',
  },
  {
    name: 'Earthy Tones',
    fontFamily: '"Oswald", sans-serif',
    fontColor: '#ffffff',
    backgroundColor: '#5d4037',
    slideBackgroundColor: '#795548',
    accentColor: '#a1887f',
    gradientBackground: 'linear-gradient(135deg, #5d4037 0%, #795548 100%)',
    navbarColor: '#795548',
    sidebarColor: '#5d4037',
    type: 'dark',
 }
]

export const CreatePageCard = [
  {
    title : 'Use a',
    highlightedText: 'Template',
    description : 'Write a prompt and leave everything else for us to handle',
    type: 'template',
    buttonText:'Continue',
  },
  {
    title : 'Generate with',
    highlightedText: 'Creative AI',
    description : 'Write a prompt and leave everything else for us to handle',
    type: 'creative-ai',
    highlight:true,
    buttonText:'Generate',

  },
  {
    title : 'Start from',
    highlightedText: 'Scratch',
    description : 'Write a prompt and leave everything else for us to handle',
    type: 'create-scratch',
    buttonText:'Create',
  },

]