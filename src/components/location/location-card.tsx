type LocationCardProps = {
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  notes?: string;
};

export function LocationCard({
  name,
  address,
  coordinates,
  notes,
}: LocationCardProps) {
  return (
    <article className="space-y-1 rounded-2xl border border-border-subtle/70 bg-black/55 p-4 text-xs text-zinc-200">
      <h3 className="font-serif text-sm text-foreground">{name}</h3>
      <p className="text-[11px] text-zinc-400 whitespace-pre-line">
        {address}
      </p>
      {coordinates && (
        <p className="text-[11px] text-zinc-500">
          {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
        </p>
      )}
      {notes && (
        <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
          {notes}
        </p>
      )}
    </article>
  );
}

