import React, { useEffect, useRef, useState } from "react";
import { Subheader } from ".";

interface Props {
  subheader: Subheader;
  openSubheader?: Subheader;
  marginTopDiff?: number;
  children: React.ReactNode;
}

/** Slide down accordion for Navbar */
export const NavAccordion = ({ subheader, openSubheader, marginTopDiff, children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(subheader === openSubheader);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    getContentHeight();

    window.addEventListener("resize", getContentHeight);

    return () => window.removeEventListener("resize", getContentHeight);
  }, [children]);

  useEffect(() => {
    setIsOpen(subheader === openSubheader);
  }, [openSubheader]);

  /**
   * Slide up and down by getting height and setting margin-top.
   *
   * Must hide initially with a big value otherwise has pop-in
   */
  const getContentHeight = () => {
    setHeight((contentRef.current?.offsetHeight ?? 0) + (marginTopDiff ?? 0));
  };

  const style = {
    marginTop: height ? (!isOpen ? `-${height}px` : "0") : "-1000vh"
  };

  return (
    <div className="nav-accordion">
      <div
        className="nav-accordion-content"
        ref={contentRef}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};
