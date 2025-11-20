function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 text-white/60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-white font-extrabold tracking-wider text-lg"><span className="text-red-500">My</span>AutoKit</div>
          <p className="mt-3 text-sm">Premium LED posters and ambient car decor for enthusiasts. Built for the night.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#products" className="hover:text-white">LED Posters</a></li>
            <li><a href="#products" className="hover:text-white">Ambient Kits</a></li>
            <li><a href="#products" className="hover:text-white">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Newsletter</h4>
          <form className="flex gap-2">
            <input placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            <button className="px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold">Join</button>
          </form>
          <p className="mt-2 text-xs">By subscribing you agree to receive emails from MyAutoKit.</p>
        </div>
      </div>
      <div className="mt-8 text-center text-xs">© {new Date().getFullYear()} MyAutoKit. All rights reserved.</div>
    </footer>
  )
}

export default Footer
