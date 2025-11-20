function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg line-clamp-1">{product.title}</h3>
        <p className="text-white/60 text-sm line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-white font-bold">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
