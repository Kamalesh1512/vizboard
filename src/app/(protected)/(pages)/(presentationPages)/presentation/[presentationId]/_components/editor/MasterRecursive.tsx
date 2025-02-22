"use client";
import { ContentItem } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useCallback, useMemo } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "./components/Headings";
import { cn } from "@/lib/utils";
import DropZone from "./DropZone";
import Paragraph from "./components/Paragraph";
import Table from "./components/Table";
import Column from "./components/Column";

interface MasterRecursiveProps {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newcontent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
}

const ContentRenderer: React.FC<MasterRecursiveProps> = React.memo(
  ({ content, onContentChange, slideId, index, isEditable, isPreview }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commmonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading1 {...commmonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading2 {...commmonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading3 {...commmonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading4 {...commmonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Title {...commmonProps} />
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Paragraph {...commmonProps} />
          </motion.div>
        );
      case "table":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Table
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialColSize={content.initialColumns}
              initialRowSize={content.intialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps} className="w-full h-full">
              <Column
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null

        case 'image':
          return ( 
            <motion.div {...animationProps}
            className="w-full h-full">
              
            </motion.div>
          )
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("w-full h-full flex flex-col", content.className)}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex == 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={slideId}
                          />
                        )}
                      <MasterRecursive
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        slideId={slideId}
                        index={subIndex}
                        isEditable={isEditable}
                      />
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIndex + 1}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }
        return null;

      default:
        return null;
    }
  }
);

export default ContentRenderer;

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursive: React.FC<MasterRecursiveProps> = React.memo(
  ({
    content,
    onContentChange,
    slideId,
    index,
    isPreview = false,
    isEditable = true,
  }) => {
    if (isPreview) {
      return (
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          isPreview={isPreview}
          isEditable={isEditable}
          slideId={slideId}
          index={index}
        />
      );
    }
    <React.Fragment>
      <ContentRenderer
        content={content}
        onContentChange={onContentChange}
        isPreview={isPreview}
        isEditable={isEditable}
        slideId={slideId}
        index={index}
      />
    </React.Fragment>;
  }
);

MasterRecursive.displayName = "MasterRecursive";
