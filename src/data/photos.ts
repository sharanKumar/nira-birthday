export interface Photo {
  id: number;
  src: string;
  caption: string;
  age: string;
  gradient: string;
  emoji: string;
}

// Photos array — replace `src` with real image paths in /public/photos/
// The gradient + emoji serve as elegant placeholders until real photos are added
export const photos: Photo[] = [
  {
    id: 1,
    src: "/photos/nira-1.jpeg",
    caption: "Welcome to the World",
    age: "1 Month",
    gradient: "from-amber-200 via-yellow-100 to-orange-200",
    emoji: "👶",
  },
  {
    id: 2,
    src: "/photos/nira-2.jpeg",
    caption: "First Smile",
    age: "3 Months",
    gradient: "from-yellow-200 via-amber-100 to-yellow-300",
    emoji: "😊",
  },
  {
    id: 3,
    src: "/photos/nira-3.jpeg",
    caption: "Curious Eyes",
    age: "6 Months",
    gradient: "from-orange-200 via-yellow-100 to-amber-200",
    emoji: "👀",
  },
  {
    id: 4,
    src: "/photos/nira-4.jpeg",
    caption: "Sitting Up Tall",
    age: "8 Months",
    gradient: "from-yellow-100 via-amber-200 to-yellow-200",
    emoji: "🌟",
  },
  {
    id: 5,
    src: "/photos/nira-5.jpeg",
    caption: "First Steps",
    age: "11 Months",
    gradient: "from-amber-100 via-yellow-200 to-orange-100",
    emoji: "🚶",
  },
  {
    id: 6,
    src: "/photos/nira-6.jpeg",
    caption: "First Birthday",
    age: "1 Year",
    gradient: "from-yellow-200 via-orange-100 to-amber-200",
    emoji: "🎂",
  },
  {
    id: 7,
    src: "/photos/nira-7.jpeg",
    caption: "Little Explorer",
    age: "18 Months",
    gradient: "from-orange-100 via-yellow-200 to-amber-100",
    emoji: "🌻",
  },
  {
    id: 8,
    src: "/photos/nira-8.jpeg",
    caption: "Almost Two!",
    age: "22 Months",
    gradient: "from-yellow-300 via-amber-200 to-yellow-100",
    emoji: "🐝",
  },
];

export const milestones = [
  {
    age: "1 Month",
    title: "Hello World!",
    description: "A tiny bundle of joy arrived and stole everyone's hearts",
    emoji: "👶",
    photoIndex: 0,
  },
  {
    age: "3 Months",
    title: "First Smile",
    description: "That first gummy grin that melted us completely",
    emoji: "😊",
    photoIndex: 1,
  },
  {
    age: "6 Months",
    title: "Curious Explorer",
    description: "Discovering the world with those big, beautiful eyes",
    emoji: "👀",
    photoIndex: 2,
  },
  {
    age: "11 Months",
    title: "First Steps",
    description: "Wobbly, brave, and unstoppable little legs",
    emoji: "🚶",
    photoIndex: 4,
  },
  {
    age: "1 Year",
    title: "First Birthday!",
    description: "Cake smash champion and the sweetest celebration",
    emoji: "🎂",
    photoIndex: 5,
  },
  {
    age: "2 Years",
    title: "Turning Two!",
    description: "Our little bee is ready for a big birthday buzz!",
    emoji: "🎉",
    photoIndex: 7,
  },
];
