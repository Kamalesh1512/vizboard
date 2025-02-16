import { Project } from '@/db/schema'
import { Slide } from '@/lib/types'
import { InferSelectModel } from 'drizzle-orm'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type ProjectType = InferSelectModel<typeof Project>

interface SlideState{
    slides :Slide[],
    project:ProjectType | null
    setProject: (id:ProjectType) => void
    setSlides:(slides:Slide[])=>void,
}
export const useSlideStore = create(
    persist<SlideState>(
        (set,get)=>({
        slides:[],
        project:null,
        setProject:(project) => set({project}),
        setSlides:(slides:Slide[])=>set({slides}),
    }),
    {
        name:'slides-storage',
    })
)