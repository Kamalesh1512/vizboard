"use client";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

interface NumberedListProps {
  items: string[];
  onChange: (newItems: string[]) => void;
  className?: string;
  isEditable?: boolean;
}

const NumberedList: React.FC<NumberedListProps> = ({
  items,
  onChange,
  className,
  isEditable=true,
}) => {
    const {currentTheme} = useSlideStore()

  return <ol
  className={cn('list-decimal list-inside space-y-1', className)}
  style={{color:currentTheme.fontColor}}>

    {items.map((item,index)=>(
        <li key={item}>
            <ListItem 
            item={item} 
            index= {index} 
            onChange = {handleChange} 
            onKeyDown = {handleKeyDown}
            isEditable={isEditable}
            fontColor = {currentTheme.fontColor}/>
        </li>
    ))}
    
  </ol>;
};

export default NumberedList;
