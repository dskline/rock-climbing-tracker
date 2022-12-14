import { StartSessionButton } from "@/features/exercise-recording/ui/RecordSession/StartSessionButton";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/exercises", label: "Exercises" },
];

export function NavBar() {
  return (
    <div className="p-4 flex items-center justify-between bg-white shadow-md">
      <nav className="flex gap-4 text-sm">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-semibold text-gray-500 hover:text-gray-800"
          >
            {label}
          </Link>
        ))}
      </nav>
      <StartSessionButton>Start a new session</StartSessionButton>
    </div>
  );
}
