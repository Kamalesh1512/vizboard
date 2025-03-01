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
import CustomImage from "./components/ImageComponent";
import BlockQuote from "./components/BlockQuote";
import { NumberedList, BulletList, TodoList } from "./components/ListComponent";
import CalloutBox from "./components/CalloutBox";
import CodeBlock from "./components/CodeBlock";
import TableOfContent from "./components/TableOfContent";
import Divider from "./components/Divider";

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
        return null;

      case "image":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CustomImage
              alt={content.alt || "image"}
              src={content.content as string}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case "blockquote":
        return (
          <motion.div
            {...animationProps}
            className={cn("w-full h-full flex flex-col", content.className)}
          >
            <BlockQuote>
              <Paragraph {...commmonProps} />
            </BlockQuote>
          </motion.div>
        );

      case "numberedList":
        return (
          <motion.div
            {...animationProps}
            className={cn("w-full h-full", content.className)}
          >
            <NumberedList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );

      case "bulletList":
        return (
          <motion.div
            {...animationProps}
            className={cn("w-full h-full", content.className)}
          >
            <BulletList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "todoList":
        return (
          <motion.div
            {...animationProps}
            className={cn("w-full h-full", content.className)}
          >
            <TodoList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );

      case "calloutBox":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CalloutBox
              type={content.callOutTypes || "info"}
              className={content.className}
            >
              <Paragraph {...commmonProps} />
            </CalloutBox>
          </motion.div>
        );

      case "codeBlock":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CodeBlock
              code={content.code}
              language={content.langauge}
              onChange={() => {}}
              className={content.className}
            ></CodeBlock>
          </motion.div>
        );

      case "tableOfContents":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableOfContent
              items={content.content as string[]}
              onItemClick={(id: string) => {
                console.log(`Navigate to section: ${id}`);
              }}
              className={content.className}
            />
          </motion.div>
        );
      case "divider":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Divider className={content.className} />
          </motion.div>
        );

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn(
                "w-full h-full flex flex-col text-lg",
                content.className
              )}
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
