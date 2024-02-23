import { NavLink } from './NavLink';

export function TopNav() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-xl">
              Budget
            </a>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <NavLink href="/" label="Home" />
              </li>
              <li>
                <NavLink href="/budget" label="My Budget" />
              </li>
              <li>
                <NavLink href="/login" label="Login" />
              </li>
            </ul>
          </div>
          {/* Hamburger Menu (for mobile) */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
