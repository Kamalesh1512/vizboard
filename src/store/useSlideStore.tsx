import { Project } from "@/db/schema";
import { Slide, Theme } from "@/lib/types";
import { InferSelectModel } from "drizzle-orm";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProjectType = InferSelectModel<typeof Project>;

const defaultTheme:Theme = {
  name: "Default",
  fontFamily: ' "Inter", sans-serif',
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

interface SlideState {
  slides: Slide[];
  project: ProjectType | null;
  currentTheme: Theme
  setProject: (id: ProjectType) => void;
  setSlides: (slides: Slide[]) => void;
  setCurrentTheme: (theme: Theme) => void;
}
export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      slides: [],
      project: null,
      setProject: (project) => set({ project }),
      setSlides: (slides: Slide[]) => set({ slides }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme:theme }),
    }),
    {
      name: "slides-storage",
    }
  )
);
