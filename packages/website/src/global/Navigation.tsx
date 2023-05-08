import Link from "next/link";

const LINKS = [
  { slug: "/photos", display: "Photos" },
  { slug: "/keyboard", display: "Keyboards" },
  { slug: "/playlist", display: "Playlists" },
  { slug: "/entertainment", display: "Entertainment" },
  { slug: "/activity", display: "Activity" },
  { slug: "/code", display: "Code" },
  { slug: "/year", display: "Years" },
];

export default function Navigation() {
  return (
    <nav className="p-4 border-t-4 bg-light-1 border-accent-light dark:border-accent-dark dark:bg-dark-1 space-y-4 md:space-y-0 md:divide-x divide-light-2 dark:divide-gray-700">
      {LINKS.map((entry) => (
        <Link href={entry.slug} key={entry.slug}>
          <a className="block w-full cursor-pointer text-lg text-center font-normal md:text-left md:w-auto md:inline-block md:pr-4 md:pl-4 first:pl-0 last:pr-0">
            {entry.display}
          </a>
        </Link>
      ))}
    </nav>
  );
}
