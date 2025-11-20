import { ShoppingCart, Menu } from 'lucide-react'

function Navbar({ onCartClick, cartCount }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/80">
            <Menu size={20} />
          </button>
          <div className="text-white font-extrabold tracking-wider text-lg">
            <span className="text-red-500">My</span>AutoKit
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#products" className="hover:text-white transition">Products</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <button onClick={onCartClick} className="relative inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition">
          <ShoppingCart size={18} />
          <span className="text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar
