"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { isDragging } from "motion-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 } from "uuid";
import { MasterRecursive } from "./MasterRecursive";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2 } from "lucide-react";

interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  isEditable,
  onDrop,
}) => {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ["SLIDE", "layout"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  if (!isEditable) {
    return null;
  }
  return (
    <div
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop here
        </div>
      )}
    </div>
  );
};

interface DraggableSlidesProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}
const DraggableSlides: React.FC<DraggableSlidesProps> = ({
  handleDelete,
  index,
  isEditable,
  moveSlide,
  slide,
}) => {
  const ref = useRef(null);
  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useSlideStore();

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: {
      index,
      type: "SLIDE",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => {
    console.log("Content Changed", slide, contentId, newContent);
    if (isEditable) {
      updateContentItem(slide.id, contentId, newContent);
    }
  };
  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index == currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{ backgroundImage: currentTheme.gradientBackground }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full flex-grow overflow-hidden">
        <MasterRecursive
          content={slide.content}
          isEditable={isEditable}
          isPreview={false}
          slideId={slide.id}
          onContentChange={handleContentChange}
        />
      </div>
      {isEditable && (
        <Popover>
          <PopoverTrigger asChild className="absolute top-2 left-2">
            <Button variant={"outline"} size={"sm"}>
              <EllipsisVertical className="w-5 h-5" />
              <span className="sr-only">Slide options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p=-0"> 
            <div className="flex space-x-2">
              <Button variant={'ghost'}
              onClick={()=> handleDelete(slide.id)}>
                <Trash2 className="w-5 h-5 text-red-500"/>
                <span className="sr-only">Delete slide</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

interface EditorProps {
  isEditable: boolean;
}

const Editor = ({ isEditable }: EditorProps) => {
  const {
    getOrderedSlides,
    currentSlide,
    removeSlide,
    reorderSlides,
    project,
    addSlideAtIndex,
  } = useSlideStore();

  const orderedSlides = getOrderedSlides();
  const [Loading, setIsLoading] = useState(true);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return;
    if (item.type === "layout") {
      addSlideAtIndex(
        {
          ...item.component,
          id: v4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };



  const handleDelete = (id: string) => {
    if (isEditable) {
      console.log("Deleting", id);
      removeSlide(id);
    }
  };

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  useEffect(()=>{
    if(typeof window!== 'undefined') setIsLoading(false)
  },[])
  return (
    <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {Loading ? (
        <div className=" w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="'px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}
            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlides
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}
                />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
