import React, { ForwardedRef, forwardRef } from "react";
import { GridItem, GridItemProps } from "@chakra-ui/react";

const Editable = forwardRef(
  (
    { sanitizedHtml, isOpen, ...props }: EditableProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <GridItem
      ref={ref}
      overflow={isOpen ? "auto" : "hidden"}
      sx={{ scrollbarWidth: "thin" }}
      noOfLines={isOpen ? undefined : 6}
      whiteSpace="break-spaces"
      rowSpan={isOpen ? 8 : 7}
      cursor={isOpen ? undefined : "pointer"}
      p="1.5"
      _focusVisible={{
        outline: "2px solid rgba(128, 128, 128, 0.34)",
        borderRadius: "4px",
      }}
      contentEditable={isOpen}
      spellCheck="false"
      maxW="100ch"
      fontFamily="Open Sans"
      fontWeight="normal"
      fontSize="0.8rem"
      lineHeight="1.7"
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
      {...props}
    >
      {props.children}
    </GridItem>
  )
);

export default Editable;

interface EditableProps extends GridItemProps {
  sanitizedHtml: string;
  isOpen: boolean;
}
