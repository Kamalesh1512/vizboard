import {create} from "zustand";

interface useModalProps{
    isOpen:boolean;
    onOpen: () => void;
    onClose: () => void;
 };

 export const useModal = create<useModalProps>((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false}) 
 }))


export const alertModel = create<useModalProps>((set)=>({
   isOpen:false,
   onOpen:()=>set({isOpen:true}),
   onClose:()=>set({isOpen:false})
}))