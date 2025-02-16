"use client";
import usePromptStore from "@/store/usePromptStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import CreatePage from "./CreatePage/CreatePage";
import CreateAI from "./GenerateAI/CreativeAI";
import ScratchPage from "./Scratch/ScratchPage";


const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const handleSelectedOption = (option:string) =>{
    if (option==='template'){
      router.push('/templates')
    }else if (option === 'create-scratch'){
      setPage('create-scratch')
    }else if (option ==='creative-ai'){
      setPage('creative-ai')
    }
  }
  const handleBack = ()=>{
    setPage('create')
  }

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage onSelectionOptions={handleSelectedOption}/>;
      case "create-scratch":
        return <ScratchPage onBack={handleBack}/>;
      case "creative-ai":
        return <CreateAI onBack={handleBack}/>;
      default:
        return null
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
