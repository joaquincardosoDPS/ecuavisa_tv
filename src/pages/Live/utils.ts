import type { EPGChannel } from "@/interfaces/catalog.interface";

export function getCurrentEvent(signal: { key_live: string } | null, epg: EPGChannel[]) {
  if (!signal) return null;
  const channel = epg.find((ch) => ch.key_live === signal.key_live);
  if (!channel) return null;
  const now = new Date();
  return (
    channel.events.find((ev) => {
      const begin = new Date(ev.beginTime);
      const end = new Date(ev.endTime);
      return begin <= now && end > now;
    }) ?? null
  );
}
