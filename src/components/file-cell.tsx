import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ChevronDown, Download, Files, FileText, FolderTree } from "lucide-react";
import type { File } from "@/data/data";
import YAML from "yaml";
import { useState, type WheelEvent } from "react";
import { ObjectTree } from "./object-tree";

type Props = {
    file: File;
}

const findScrollableParent = (element: HTMLElement | null) => {
  let current = element?.parentElement ?? null;
  while (current) {
    if (current.scrollHeight > current.clientHeight) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
};

const handleYamlWheel = (event: WheelEvent<HTMLDivElement>) => {
  if (event.deltaY === 0) {
    return;
  }

  const target = event.currentTarget;
  if (target.scrollHeight > target.clientHeight) {
    return;
  }

  const parent = findScrollableParent(target);
  if (parent) {
    parent.scrollTop += event.deltaY;
    event.preventDefault();
  } else if (typeof window !== "undefined") {
    window.scrollBy({ top: event.deltaY });
    event.preventDefault();
  }
};

const downloadFile = (name: string, data: string) => {
  const blob = new Blob([data], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export const FileCell = ({ file }: Props) => {
  const [treeView, setTreeView] = useState(true);
  let yamlData = null;
  if (file.type === "yaml" || file.type === "yml") {
    yamlData = YAML.parse(file.data);
    console.log(yamlData);
  }

  return (
    <div key={file.name} className="rounded-xl border bg-card px-2 py-2 space-y-2">
      <Collapsible>
      <CollapsibleTrigger className="w-full" asChild>
          <Button variant="ghost" className="group w-full px-2 py-2 justify-between">
          <p className="text-md overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</p>
          <ChevronDown className="group-data-[state=open]:rotate-180" />
          </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2">
          <div className="flex items-center mb-2 justify-between">
            <div>
              {yamlData != null && (
              <div className="flex items-center">
                <Button size="sm" variant="outline" onClick={() => setTreeView(!treeView)}>
                  {treeView ? (
                    <>
                    <FileText />
                    View Raw
                    </>
                  ) : (
                    <>
                    <FolderTree />
                    View Tree
                    </>
                  )}
                </Button>
                {/* {treeView && (
                  <Button size="sm" variant="outline" className="ml-2">
                    Expand All
                  </Button>
                )} */}
              </div>
            )}
            </div>
            <div className="space-x-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(file.data)}>
              <Files />
              <span className="hidden sm:inline">Copy</span>
            </Button>

            <Button size="sm" variant="outline" onClick={() => downloadFile(file.name, file.data)}>
              <Download />
              <span className="hidden sm:inline">Download</span>
            </Button>
            </div>
          </div>
          
          <div
            className="overflow-x-auto rounded-md text-sm bg-muted"
            onWheel={handleYamlWheel}
          >
              {treeView && yamlData ? (
                <ObjectTree fileItem={yamlData} />
              ) : (
                <SyntaxHighlighter language={file.type} style={a11yDark} showLineNumbers>
                  {file.data}
                </SyntaxHighlighter>
              )}
          </div>
        </div>
      </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
