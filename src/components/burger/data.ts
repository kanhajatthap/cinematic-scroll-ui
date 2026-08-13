export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export const BURGER_FRAME_URL = (i: number) =>
  `/burger/frames/frame_${String(i + 1).padStart(4, "0")}.webp`;

export const MARQUEE = [
  "100% Angus Beef",
  "Fire-Grilled",
  "Brioche Buns",
  "House Amber Sauce",
  "Grilled Onions",
  "Smashed To Order",
];

export const SCENES = [
  {
    name: "The Sear",
    desc: "Double-pressed on a 300° griddle — caramel crust",
  },
  {
    name: "The Melt",
    desc: "Aged cheddar, molten and pulling",
  },
  {
    name: "The Sauce",
    desc: "House amber — 11 ingredients, 0 shortcuts",
  },
  {
    name: "The Bun",
    desc: "48-hour brioche, butter-seared shine",
  },
];

export const NOTE_POS = [
  "left-6 top-[22%] md:left-14 md:top-[23%]",
  "right-6 top-[18%] md:right-14 md:top-[19%]",
  "left-6 bottom-[22%] md:left-14 md:bottom-[25%]",
  "right-6 bottom-[19%] md:right-14 md:bottom-[22%]",
];

export const PROCESS = [
  {
    n: "01",
    name: "Smashed",
    desc: "A ball of house-ground chuck & brisket drops on the griddle and is slammed flat — the edges lace up with caramel crust.",
    img: "/burger/art_01.svg",
  },
  {
    n: "02",
    name: "Seared",
    desc: "Ninety seconds on a screaming 300° griddle. One sear, one flip, zero reheats.",
    img: "/burger/art_03.svg",
  },
  {
    n: "03",
    name: "Melted",
    desc: "Aged cheddar drapes over the patty, molten and pulling before it leaves the griddle.",
    img: "/burger/art_02.svg",
  },
  {
    n: "04",
    name: "Sauced",
    desc: "House amber sauce — 11 ingredients, 0 shortcuts — brushed over a butter-toasted brioche.",
    img: "/burger/art_04.svg",
  },
  {
    n: "05",
    name: "Served",
    desc: "Stacked, wrapped, handed over hot. Built to be eaten in the first ten minutes.",
    img: "/burger/art_05.svg",
  },
];

export const STATS = [
  { value: 400000, suffix: "+", decimals: 0, label: "burgers smashed" },
  { value: 4.9, suffix: "★", decimals: 1, label: "average rating" },
  { value: 11, suffix: "", decimals: 0, label: "sauce ingredients" },
  { value: 300, suffix: "°", decimals: 0, label: "griddle heat, always" },
];

export const GALLERY = [
  "/burger/art_01.svg",
  "/burger/art_03.svg",
  "/burger/art_02.svg",
  "/burger/art_05.svg",
  "/burger/art_04.svg",
];

export const TESTIMONIALS = [
  {
    q: "The caramel crust on that patty is ridiculous. Best smash burger I've had without a three-hour queue.",
    name: "Marcus T.",
    role: "Local food critic",
  },
  {
    q: "Burnt butter bacon. That's it. That's the whole review.",
    name: "Priya S.",
    role: "Regular since 2019",
  },
  {
    q: "You can taste the 48-hour brioche. It's stupidly good.",
    name: "Dev K.",
    role: "Google review",
  },
  {
    q: "I asked for 'as loud as possible'. They understood the assignment.",
    name: "Jonah R.",
    role: "First-timer, won't be last",
  },
];

export const MENU = [
  {
    name: "The Classic Smash",
    price: "$9.50",
    desc: "Double smashed patty, American cheese, pickles, amber sauce on toasted brioche.",
    img: "/burger/art_01.svg",
  },
  {
    name: "Burnt Butter Bacon",
    price: "$11.00",
    desc: "Smoked bacon, burnt-butter mayo, caramelised onion, aged cheddar.",
    img: "/burger/art_02.svg",
  },
  {
    name: "The Firebird",
    price: "$12.50",
    desc: "Charred jalapeño, chipotle mayo, pepper jack, crispy shallots.",
    img: "/burger/art_03.svg",
  },
  {
    name: "Truffle Melt",
    price: "$13.00",
    desc: "Wild mushroom, truffle aioli, gruyère, rocket on a butter-seared bun.",
    img: "/burger/art_04.svg",
  },
  {
    name: "The Smash Stack",
    price: "$14.00",
    desc: "Triple stack, double cheddar, house slaw, honey-butter glaze.",
    img: "/burger/art_05.svg",
  },
  {
    name: "Crispy Chicken Smash",
    price: "$10.50",
    desc: "Buttermilk-fried chicken, hot honey, slaw, brioche roll.",
    img: "/burger/art_06.svg",
  },
];

export const CRAFT = [
  "Open-flame sear, 300° seasoned griddle",
  "48-hour butter brioche, baked in-house",
  "House-ground chuck & brisket blend",
  "Amber sauce — 11 ingredients, 0 shortcuts",
];

export const HOURS = [
  { d: "Mon — Thu", h: "11:00 — 22:00" },
  { d: "Fri — Sat", h: "11:00 — 00:00" },
  { d: "Sunday", h: "12:00 — 21:00" },
];

export const NAV = [
  { href: "#menu", label: "Menu" },
  { href: "#craft", label: "The Craft" },
  { href: "#process", label: "Process" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];