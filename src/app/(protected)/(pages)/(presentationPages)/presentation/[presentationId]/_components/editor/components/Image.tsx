import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
}
const Image = ({
  alt,
  contentId,
  onContentChange,
  src,
  className,
  isEditable,
  isPreview,
}: ImageProps) => {
  return <div>Image</div>;
};

export default Image;
