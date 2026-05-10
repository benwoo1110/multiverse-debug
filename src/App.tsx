import { useState, useEffect } from 'react';
import { Dumps } from './components/dumps';
import type { Dump } from './data/data';
import { Spinner } from '@/components/ui/spinner';

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id') || ''; 
  const service = queryParams.get('service') || "pastesdev";
  
  const [loading, setLoading] = useState(true);
  const [dump, setDump] = useState<Dump | null>(null);

  const pasteUrl = service === "pastesdev" ? `https://api.pastes.dev/${id}` : `https://api.mclo.gs/1/raw/${id}`;

  useEffect(() => {
    fetch(pasteUrl)
      .then(res => res.json())
      .then((data: Dump) => {
        setDump(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, pasteUrl]);

  return (
    <div className="container mx-auto space-y-2 p-4">

      {/* Header */}
      <div className="flex items-center justify-center gap-2 py-2">
        <img className="h-9 w-9" src="/multiverse.png" alt="Multiverse Logo" />
        <h1 className="text-lg sm:text-3xl font-bold text-left text-white my-1">MULTIVERSE DUMPS</h1>
      </div>

      {loading ? (
        <div className="flex justify-center space-x-2">
          <Spinner className="size-6" />
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <>
          {dump === null ? (
            <p className="text-center text-red-500">Error! Dump not found!</p>
          ) : (
            <Dumps url={pasteUrl} dump={dump} />
          )}
        </>
      )}

      {/* Footer */}
      <div className="pt-2 pb-8 space-y-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8">
          <a href="https://github.com/sponsors/Multiverse" target="_blank" rel="noopener noreferrer">
            <img className="rounded-md" alt="GitHub Repo stars" src="https://img.shields.io/badge/Github%20Sponsor-Donate-pink?style=for-the-badge&logo=githubsponsors" />
          </a>
          <a href="https://github.com/Multiverse" target="_blank" rel="noopener noreferrer">
            <img className="rounded-md" alt="GitHub Org's stars" src="https://img.shields.io/github/stars/Multiverse?style=for-the-badge&logo=GitHub&label=GitHub%20Stars&color=yellow" />
          </a>
          <a href="https://discord.gg/NZtfKky" target="_blank" rel="noopener noreferrer">
            <img className="rounded-md" alt="GitHub Repo stars" src="https://img.shields.io/discord/325459248047980545?style=for-the-badge&logo=Discord&label=Discord&color=blue" />
          </a>
        </div>
        <p className="text-center text-muted-foreground">
          Built with ❤️ by the Multiverse team
        </p>
      </div>
    </div>
  )
}
