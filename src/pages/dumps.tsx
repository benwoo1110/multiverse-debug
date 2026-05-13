import { useState, useEffect } from 'react';
import { DumpsDetails } from '../components/dumps-details';
import type { Dump } from '../data/data';
import { Spinner } from '@/components/ui/spinner';
import { useParams, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';

export default function Dumps() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || "pastesdev";
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dump, setDump] = useState<Dump | null>(null);

  const isKnownService = service === "pastesdev" || service === "mclogs";
  const pasteUrl = isKnownService
    ? service === "pastesdev"
      ? `https://api.pastes.dev/${id}`
      : `https://api.mclo.gs/1/raw/${id}`
    : null;

  useEffect(() => {
    if (!isKnownService) {
      setLoading(false);
      setError("Unknown paste service specified! Only 'pastesdev' (default) and 'mclogs' are supported.");
      return;
    }

    if (!pasteUrl) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(pasteUrl)
      .then(res => {
        if (res.status === 404) {
          throw new Error("Paste data id is invalid or expired!");
        }
        return res.json();
      })
      .then((data: Dump) => {
        setDump(data);
      })
      .catch(fetchError => {
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isKnownService, pasteUrl]);

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
          {pasteUrl === null || dump === null ? (
            <div className="text-center">
              <p className="text-red-500">An error occurred while fetching debug data!</p>
              <p className="text-red-500">{error}</p>
              <p>Run <Button variant="outline" className="text-green-500 font-mono">/mv dumps</Button> command on your server to generate a new link.</p>
            </div>
          ) : (
            <DumpsDetails url={pasteUrl} dump={dump} />
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
