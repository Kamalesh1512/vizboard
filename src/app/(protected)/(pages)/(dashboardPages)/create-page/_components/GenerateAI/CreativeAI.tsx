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
import { ChevronLeft, RotateCcw, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface CreateAIProps {
  onBack: () => void;
}

const CreateAI = ({ onBack }: CreateAIProps) => {
  const router = useRouter();
  const { currentAiPrompt, setCurrentAiPrompt, outlines, resetOutlines } =
    useCreativeAIStore();
  const [editingCard, setEditingCard] = useState<string | null>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>();
  const [editText, setEditText] = useState("");
  const [noOfCards, setNoOfCards] = useState(0);

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
    setCurrentAiPrompt("");
    resetOutlines();
  };

  const generateOutline = () => {

  }

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
        disabled={isGenerating}>
            Generate<Wand2/>
        </Button>
      </div>
    </motion.div>
  );
};

export default CreateAI;
