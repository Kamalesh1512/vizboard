"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSlideStore } from "@/store/useSlideStore";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcwIcon } from "lucide-react";
import useScratchStore from "@/store/useStartScratchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardList from "../Common/CardList";
import { OutlineCard } from "@/lib/types";
import { v4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { generateProject } from "@/actions/project";

interface ScratchPageProps {
  onBack: () => void;
}

const ScratchPage = ({ onBack }: ScratchPageProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { setProject } = useSlideStore();
  const { addMultipleOutlines, addOutline, outlines, resetOutlines } =
    useScratchStore();

  const [editText, setEditText] = useState("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const resetCards = () => {
    setEditText("");
    resetOutlines();
  };
  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: v4(),
      title: editText || "New Section",
      order: outlines.length + 1,
    };
    setEditText("");
    addOutline(newCard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast({
        variant: "destructive",
        description: "Please add at least one card to generate PPT",
      });
    }
    const response = await generateProject(outlines?.[0]?.title, outlines);

    if (response.status !== 200) {
      toast({
        variant: "destructive",
        description: "Failed to generate project",
      });
    }
    if (response.data) {
      setProject(response.data);
      resetOutlines();
      toast({
        variant: "default",
        description: "Projected created successfully",
      });
      router.push(`/presentation/${response.data.id}/select-theme`);
    }else{
        toast({
            variant:'destructive',
            description:'Failed to generate a project'
        })
    }
  };
  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button
        onClick={() => {
          resetOutlines();
          onBack();
        }}
        variant={"outline"}
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter Prompt and add to the cards"
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
          />
          <div className="flex items-center gap-3">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className=" w-fit gap-2 font-semibold shadow-xl">
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
                    (_, index) => index + 1
                  ).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-semibold"
                    >
                      {num} {num === 1 ? "card" : "Cards"}
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
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
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
      <Button
        variant={"secondary"}
        onClick={handleAddCard}
        className="w-full bg-primary-10"
      >
        Add Card
      </Button>
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
    </motion.div>
  );
};

export default ScratchPage;
