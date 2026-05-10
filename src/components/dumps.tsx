import type { Dump, Plugin } from "@/data/data";
import { ChevronDown } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ColumnDef } from "@tanstack/react-table";
import { IconHeader } from "./icon-header";
import { KeyValueCell } from "./key-value-cell";

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
      <IconHeader icon="server" header="Server" />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <KeyValueCell title="Name" value={dump.server.name} />
        <KeyValueCell title="Version" value={dump.server.version} />
        <KeyValueCell title="Bukkit Version" value={dump.server.bukkitVersion} />
        <KeyValueCell title="Online Mode" value={dump.server.onlineMode ? "True" : "False"} />
        <KeyValueCell title="Java Version" value={dump.server.javaVersion} />
        <KeyValueCell title="Operating System" value={dump.server.operatingSystem} />
        <KeyValueCell title="Uptime" value={dump.server.uptime} />
        <KeyValueCell title="Memory" value={dump.server.memory} />
      </div>
    
      <Separator />

      <IconHeader icon="blocks" header="Plugins" />
      <DataTable columns={columns} data={dump.plugins} />

      <Separator />

      <IconHeader icon="file-cog" header="Files" />
      {dump.files.map((file) => (
        <div key={file.name} className="rounded-xl border bg-card px-2 py-2">
          <Collapsible>
            <CollapsibleTrigger className="w-full" asChild>
              <Button variant="ghost" className="group w-full px-2 py-2 justify-between">
                <p className="text-md overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</p>
                <ChevronDown className="group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div>
                <SyntaxHighlighter language={file.type} style={a11yDark} showLineNumbers className="overflow-x-auto rounded-md bg-muted p-2 mt-2 text-sm">
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
