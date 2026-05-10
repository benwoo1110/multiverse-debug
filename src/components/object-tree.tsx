import { ChevronRightIcon, Layers, LineDotRightHorizontal, SquareMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type Props = {
  fileItem: object;
  depth?: number;
}

const isEmpty = (obj: object) => Object.keys(obj).length === 0;

const TreeValue = ({ value }: { value: unknown }) => {
  if (value == null) {
    return <span className="text-muted-foreground italic">null</span>;
  } else if (typeof value === "number") {
    return <span className="text-blue-300">{String(value)}</span>;
  } else if (typeof value === "boolean") {
    return <span className="text-orange-300">{String(value)}</span>;
  } else {
    return <span className="text-green-300">{String(value)}</span>;
  }
};

export const ObjectTree = ({ fileItem, depth = 1 }: Props) => {
  if (fileItem == null || isEmpty(fileItem)) {
    return (
      <p className="font-mono text-muted-foreground text-sm whitespace-nowrap min-w-max ml-10 italic">empty</p>
    );
  }

  if (Array.isArray(fileItem)) {
    return (
      <div className="flex flex-col ml-2">
        {fileItem.map((item, index) => (
          <div className="font-mono flex w-full justify-start items-center ml-8 whitespace-nowrap min-w-max my-1" key={index}>
            <LineDotRightHorizontal size={16} className="mr-2" />
            <TreeValue value={item} />
          </div>
        ))}
      </div>
    );
  }

  return Object.entries(fileItem).map(([key, value]) => {
    if (value == null || typeof value !== "object") {
      return (
        <div className="font-mono flex w-full justify-start items-center ml-8 whitespace-nowrap min-w-max my-1" key={key}>
          <SquareMinus size={16} className="mr-2" />
          <span className="mr-1">{key}:</span>
          <TreeValue value={value} />
        </div>
      );
    }

    return (
      <div className="font-mono text-sm whitespace-nowrap min-w-max" key={key}>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="group w-full justify-start"
            >
              <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
              <Layers />
              {key}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4">
            <div className="flex flex-col">
              <ObjectTree fileItem={value} depth={depth + 1} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  });
}
