import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ProductGrid({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <section id="products" className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Featured Products</h2>
          <p className="text-white/70">Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
