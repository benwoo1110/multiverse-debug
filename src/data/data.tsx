export type Server = {
  name: string;
  version: string;
  bukkitVersion: string;
  onlineMode: boolean;
}

export type Plugin = {
  name: string;
  version?: string;
  description?: string;
  authors: string[];
  website?: string;
  enabled: boolean;
}

export type File = {
  name: string;
  data: string;
  type: string;
}

export type Dump = {
  server: Server;
  plugins: Plugin[];
  files: File[];
}
