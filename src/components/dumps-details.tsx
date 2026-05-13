import type { Dump, Plugin } from "@/data/data";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import type { ColumnDef } from "@tanstack/react-table";
import { IconHeader } from "./icon-header";
import { KeyValueCell } from "./key-value-cell";
import { FileCell } from "./file-cell";

type Props = {
  url: string;
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

export const DumpsDetails = ({ url, dump }: Props) => {
  return (
    <>
      <IconHeader icon="server" header="Server" />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 text-sm">
        <KeyValueCell title="Name" value={dump.server.name} />
        <KeyValueCell title="Version" value={dump.server.version} />
        <KeyValueCell title="Bukkit Version" value={dump.server.bukkitVersion} />
        <KeyValueCell title="Online Mode" value={dump.server.onlineMode ? "True" : "False"} />
        <KeyValueCell title="Java Version" value={dump.server.javaVersion} />
        <KeyValueCell title="Operating System" value={dump.server.operatingSystem} />
        <KeyValueCell title="Uptime" value={dump.server.uptime} />
        <KeyValueCell title="Memory" value={dump.server.memory} />
      </div>
    
      <Separator className="my-4" />

      <IconHeader icon="blocks" header="Plugins" />
      <DataTable columns={columns} data={dump.plugins} />

      <Separator className="my-4" />

      <IconHeader icon="file-cog" header="Files" />
      {dump.files.map((file) => (
        <FileCell key={file.name} file={file} />
      ))}

      <div className="flex justify-center">
        <p className="text-sm text-muted-foreground text-center mt-4">
          <span>This dump was created on {new Date(dump?.createdAt).toLocaleString()}. </span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Click here
          </a>
          <span> to view the raw json data.</span>
        </p>
      </div>
    </>
  );
};
