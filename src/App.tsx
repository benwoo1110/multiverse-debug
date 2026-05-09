import { useState, useEffect } from 'react';
import { Dumps } from './components/dumps';
import type { Dump } from './data/data';
import { RoundedCell } from './components/rounded-cell';
import { Spinner } from '@/components/ui/spinner';

const pasteUrl = "https://api.pastes.dev/"

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id'); 

  const [dump, setDump] = useState<Dump | null>(null);

  useEffect(() => {
    fetch(`${pasteUrl}${id}`)
      .then(res => res.json())
      .then((data: Dump) => {
        setDump(data);
      });
  }, [id]);

  return (
    <div className="container mx-auto space-y-4 p-4">
      <RoundedCell className="dark:!bg-blue-700 !bg-blue-600">
        <h1 className="text-2xl font-bold text-center text-white">Multiverse Dumps</h1>
      </RoundedCell>
      {dump === null ? (
        <div className="flex justify-center space-x-2">
          <Spinner className="size-6" />
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <Dumps dump={dump} />
      )}
    </div>
  )
}
