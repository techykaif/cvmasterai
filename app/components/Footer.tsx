import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-xl font-bold text-blue-600">
            CV Master AI
          </Link>
          <p className="text-sm text-gray-600 mt-2">© {new Date().getFullYear()} CV Master AI. All rights reserved.</p>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center space-x-6">
            <li>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

