import type { Dump, Plugin } from "@/data/data";
import { ChevronDownIcon } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DataTable } from "./data-table";
import { RoundedCell } from "./rounded-cell";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ColumnDef } from "@tanstack/react-table";

type Props = {
  dump: Dump;
};

const columns: ColumnDef<Plugin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "enabled",
    header: "Enabled",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "authors",
    header: "Authors",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
]

export const Dumps = ({ dump }: Props) => {
  return (
    <>
      <p className="text-xl font-medium mt-6 ml-2">Server</p>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <RoundedCell>
          <p className="font-medium">Name</p>
          <p className="text-muted-foreground">{dump.server.name}</p>
        </RoundedCell>

        <RoundedCell>
          <p className="font-medium">Version</p>
          <p className="text-muted-foreground">{dump.server.version}</p>
        </RoundedCell>

        <RoundedCell>
          <p className="font-medium">Bukkit Version</p>
          <p className="text-muted-foreground">{dump.server.bukkitVersion}</p>
        </RoundedCell>

        <RoundedCell>
          <p className="font-medium">Online Mode</p>
          <p className="text-muted-foreground">{dump.server.onlineMode ? "True" : "False"}</p>
        </RoundedCell>
      </div>

      <Separator className="my-6" />

      <p className="text-xl font-medium mt-6 ml-2">Plugins</p>
      <DataTable columns={columns} data={dump.plugins} />

      <Separator className="my-6" />

      <p className="text-xl font-medium mt-6 ml-2">Files</p>

      {dump.files.map((file) => (
        <div key={file.name} className="rounded-xl border bg-card px-2 py-2">
          <Collapsible>
            <CollapsibleTrigger className="w-full" asChild>
              <Button variant="ghost" className="group w-full px-2 py-2 justify-between">
                <p className="text-md overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</p>
                <ChevronDownIcon className="group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div>
                <SyntaxHighlighter language={file.type} style={a11yDark} className="overflow-x-auto rounded-md bg-muted p-2 mt-2 text-sm">
                  {file.data}
                </SyntaxHighlighter>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </>
  );
};
