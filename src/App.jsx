import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('myautokit_cart')
      if (saved) setCart(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('myautokit_cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  const count = useMemo(() => cart.reduce((s, it) => s + it.quantity, 0), [cart])

  const addToCart = (p) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 }
        return next
      }
      return [...prev, { id: p.id, title: p.title, price: p.price, image: p.image, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)))
  }

  const beginCheckout = () => {
    setCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onCartClick={() => setCartOpen(true)} cartCount={count} />
      <main>
        <Hero />
        <ProductGrid onAdd={addToCart} />
        <section id="about" className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold">Built for the Night</h2>
              <p className="text-white/70 mt-3">Every piece is crafted with high-grade LEDs and premium materials to deliver deep blacks and vivid glow that elevates any space or ride.</p>
              <ul className="mt-6 space-y-2 text-white/80 list-disc list-inside">
                <li>Adjustable brightness and ambient modes</li>
                <li>Energy-efficient and cool to the touch</li>
                <li>Mount-ready with included hardware</li>
              </ul>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop" className="rounded-2xl border border-white/10" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-red-500/30 pointer-events-none" />
            </div>
          </div>
        </section>
        <section id="contact" className="bg-gradient-to-b from-black to-zinc-900 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
              <h3 className="text-2xl font-bold">Have a custom design in mind?</h3>
              <p className="text-white/70 mt-2">We create bespoke LED posters for clubs, garages and showrooms.</p>
              <a href="#products" className="inline-block mt-5 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition">Start a Project</a>
            </div>
          </div>
        </section>
      </main>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onCheckout={beginCheckout} />
      <CheckoutModal open={checkoutOpen} items={cart} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}

export default App
