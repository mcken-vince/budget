import Link from 'next/link';

export function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-gray-500 hover:text-gray-300">
      {label}
    </Link>
  );
}
