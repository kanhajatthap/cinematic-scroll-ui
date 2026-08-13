export function ChapterNo({ n, label }: { n: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
      <span className="text-gold">{n}</span>
      <span className="h-px w-6 bg-gold/40" />
      <span>{label}</span>
    </p>
  );
}