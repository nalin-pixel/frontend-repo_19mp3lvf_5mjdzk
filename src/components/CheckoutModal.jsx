import { X } from 'lucide-react'
import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function CheckoutModal({ open, items, onClose }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])
  const shipping = subtotal > 150 ? 0 : 12
  const total = subtotal + shipping

  const submitOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const form = new FormData(e.currentTarget)
    const customer = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      address_line1: form.get('address1'),
      address_line2: form.get('address2') || undefined,
      city: form.get('city'),
      state: form.get('state'),
      postal_code: form.get('postal'),
      country: form.get('country'),
    }

    const payload = {
      items: items.map((it) => ({ product_id: it.id, title: it.title, price: it.price, quantity: it.quantity, image: it.image })),
      customer,
      shipping,
    }

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setResult({ ok: res.ok, data })
    } catch (e) {
      setResult({ ok: false, data: { detail: e.message } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 transition ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden transform transition-transform ${open ? 'scale-100' : 'scale-95'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Checkout</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <h4 className="text-white font-medium mb-3">Order Summary</h4>
            <div className="space-y-3 max-h-64 overflow-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 text-white/80">
                  <img src={it.image} className="w-14 h-14 rounded border border-white/10 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm line-clamp-1">{it.title}</p>
                    <p className="text-xs text-white/50">Qty: {it.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-white/10 pt-3 space-y-1 text-white/80 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <p className="text-xs text-white/50">No real payment is processed.</p>
            </div>
          </div>
          <form onSubmit={submitOrder} className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="name" required placeholder="Full name" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
              <input type="email" name="email" required placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            </div>
            <input name="phone" placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            <input name="address1" required placeholder="Address line 1" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            <input name="address2" placeholder="Address line 2" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input name="city" required placeholder="City" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
              <input name="state" required placeholder="State" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
              <input name="postal" required placeholder="Postal code" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            </div>
            <input name="country" required placeholder="Country" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40" />
            <button disabled={loading} className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition disabled:opacity-50">
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
            {result && (
              <div className={`text-sm p-3 rounded-lg border ${result.ok ? 'border-green-500/40 text-green-300' : 'border-red-500/40 text-red-300'}`}>
                {result.ok ? (
                  <div>
                    <p>Order created successfully.</p>
                    <p className="mt-1">Order ID: <span className="font-mono">{result.data.order_id}</span></p>
                    <p>Total: ${result.data.total?.toFixed ? result.data.total.toFixed(2) : result.data.total}</p>
                  </div>
                ) : (
                  <p>Error: {result.data.detail || 'Failed to place order'}</p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
