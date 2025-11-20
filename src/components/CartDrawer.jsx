import { X } from 'lucide-react'
import { useMemo } from 'react'

function CartDrawer({ open, items, onClose, onUpdateQty, onCheckout }) {
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])

  return (
    <div className={`fixed inset-0 z-50 transition ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X /></button>
        </div>
        <div className="p-4 space-y-4 max-h-[calc(100%-160px)] overflow-y-auto">
          {items.length === 0 && <p className="text-white/60">Your cart is empty.</p>}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3">
              <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded-lg border border-white/10" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium line-clamp-1">{it.title}</h4>
                  <span className="text-white/80 font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onUpdateQty(it.id, Math.max(1, it.quantity - 1))} className="px-2 py-1 rounded bg-white/10 text-white/80">-</button>
                  <span className="text-white/80 w-8 text-center">{it.quantity}</span>
                  <button onClick={() => onUpdateQty(it.id, it.quantity + 1)} className="px-2 py-1 rounded bg-white/10 text-white/80">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-white/80">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition disabled:opacity-50" disabled={items.length === 0}>
            Checkout
          </button>
          <p className="text-xs text-white/50">Secure checkout. No payment collected in this demo.</p>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
