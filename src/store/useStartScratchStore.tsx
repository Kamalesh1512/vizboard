import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ScratchStore = {
  resetOutlines: () => void;
  addOutline: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  outlines: OutlineCard[];
};
const useScratchStore = create<ScratchStore>()(
  devtools(
    persist(
        (set) => ({
            outlines:[],
            resetOutlines:() =>{
                set({outlines:[]})
            },
            addOutline:(outline:OutlineCard)=>{
                set((state) =>({
                    outlines:[...state.outlines,outline]
                }))
            },
            addMultipleOutlines:(outlines:OutlineCard[]) =>{
                set(() => ({
                    outlines:[...outlines],
                }))
            },
        }), 
        { name: "scratch" }))
);

export default useScratchStore;
