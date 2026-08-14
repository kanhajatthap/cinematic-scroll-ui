export function GlowBg({
  at = "50% 50%",
  size = "45%",
  opacity = 0.08,
}: {
  at?: string;
  size?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at ${at}, rgba(251,191,36,${opacity}), transparent ${size})`,
        filter: "blur(80px)",
      }}
    />
  );
}
