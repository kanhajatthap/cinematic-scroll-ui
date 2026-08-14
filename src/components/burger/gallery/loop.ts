export const loop = (dir: 1 | -1, duration: number) => ({
  x: [dir === 1 ? "0%" : "-50%", dir === 1 ? "-50%" : "0%"],
  transition: { duration, repeat: Infinity, ease: "linear" as const },
});