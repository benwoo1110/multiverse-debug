import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="text-center p-4">
      <p>Run <Button variant="outline" className="text-green-500 font-mono">/mv dumps</Button> command on your server to generate a new link.</p>
    </div>
  );
}
