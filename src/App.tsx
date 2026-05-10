import { useState, useEffect } from 'react';
import { Dumps } from './components/dumps';
import type { Dump } from './data/data';
import { RoundedCell } from './components/rounded-cell';
import { Spinner } from '@/components/ui/spinner';

const pasteUrl = "https://api.pastes.dev/"

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id'); 
  const [loading, setLoading] = useState(true);
  const [dump, setDump] = useState<Dump | null>(null);

  useEffect(() => {
    fetch(`${pasteUrl}${id}`)
      .then(res => res.json())
      .then((data: Dump) => {
        setDump(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, loading]);

  return (
    <div className="container mx-auto space-y-4 p-4">
      <RoundedCell className="dark:!bg-blue-700 !bg-blue-600 mb-6">
        <div className="flex items-center justify-center gap-2">
          <img className="h-8 w-8" src="/multiverse.png" alt="Multiverse Logo" />
          <h1 className="text-lg sm:text-2xl font-bold text-left text-white my-1">MULTIVERSE DUMPS</h1>
        </div>
      </RoundedCell>
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
            <Dumps dump={dump} />
          )}
        </>
      )}

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
