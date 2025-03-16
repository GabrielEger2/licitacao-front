
import React from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import Button from "../ui/Button";

export function DefaultPagination() {
  const [active, setActive] = React.useState(1);
 
  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    } as any);
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-4">
      <Button
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <BiArrowFromRight strokeWidth={2} className="h-5 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <Button {...getItemProps(1)}>1</Button>
        <Button {...getItemProps(2)}>2</Button>
        <Button {...getItemProps(3)}>3</Button>
        <Button {...getItemProps(4)}>4</Button>
        <Button {...getItemProps(5)}>5</Button>
      </div>
      <Button
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        <BiArrowFromLeft strokeWidth={2} className="h-5 w-4" />
      </Button>
    </div>
  );
}