"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { containerVariants, itemVariants } from "@/lib/constants";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, RotateCcw, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { useToast } from "@/hooks/use-toast";
import { generateCreativePrompt } from "@/actions/genai";
import { OutlineCard } from "@/lib/types";
import { v4 } from "uuid";
import { generateProject } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";

interface CreateAIProps {
  onBack: () => void;
}

const CreateAI = ({ onBack }: CreateAIProps) => {
  const router = useRouter();
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();

  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [noOfCards, setNoOfCards] = useState(0);
  const { toast } = useToast();

  const { prompts, addPrompt } = usePromptStore();
  const {setProject} = useSlideStore()

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
    setCurrentAiPrompt("");
    resetOutlines();
  };

  const generateOutline = async () => {
    if (currentAiPrompt === "") {
      toast({
        variant: "destructive",
        description: "Please enter prompt to generate an outline",
      });
    }
    setIsGenerating(true);
    //openAI
    const response = await generateCreativePrompt(currentAiPrompt);
    if (response.status === 200 && response?.data?.outlines) {
      const cardsData: OutlineCard[] = [];

      response?.data?.outlines.map((outline: string, index: number) => {
        const newCard = {
          id: v4(),
          title: outline,
          order: index + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);

      toast({
        variant: "default",
        description: "Outlines generated sucessfully",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Failed to generate outline. Please try again later.",
      });
    }
    setIsGenerating(false)
  };

  const handleGenerate =  async () =>{
    setIsGenerating(true)
    if (outlines.length===0) {
      toast({
        variant: "destructive",
        description: "Please add atleast one card to generate slides",
      });

    }
    try {
      const response = await  generateProject(currentAiPrompt,outlines.slice(0,noOfCards))

      if (response.status!==200 || !response.data) {
        throw new Error('Unable to create project')
      }
      router.push(`/presentation/${response.data.id}/select-theme`)
      setProject(response.data)

      addPrompt({
        id:v4(),
        title: currentAiPrompt || outlines?.[0]?.title,
        outlines:outlines,
        createdAt:new Date(),
      })
      toast({
        variant: "default",
        description: "Project created successfully",
      });
      setCurrentAiPrompt('')
      resetOutlines()
    } catch (error) {
    console.log(error)
    toast({
      variant: "destructive",
      description: "Failed to create project",
    });
    }finally{
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  return (
    <motion.div
      variants={containerVariants}
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
    >
      <Button
        onClick={() => {
          onBack();
        }}
        variant={"outline"}
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-muted-foreground">
          {" "}
          What would you like to create today?
        </p>
      </motion.div>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={currentAiPrompt || ""}
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
            placeholder="Enter Prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No Cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, idx) => idx + 1
                  ).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-semibold"
                    >
                      {num} {num === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant={"destructive"}
              onClick={resetCards}
              size={"icon"}
              aria-label="Reset cards"
            >
              <RotateCcw className="h-4 w-" />
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          className="font-semibold text-lg flex gap-2 items-center bg-vivid-gradient"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-sping mr-2" />
              Generating...
            </>
          ) : (
            <>
              Generate
              <Wand2 />
            </>
          )}
        </Button>
      </div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditchange={setEditText}
        onCardSelect={setSelectedCard}
        setEditingCard={setEditingCard}
        setEditText={setEditText}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      {outlines.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      )}
      {prompts.length > 0 ? <RecentPrompts /> : ""}
    </motion.div>
  );
};

export default CreateAI;
