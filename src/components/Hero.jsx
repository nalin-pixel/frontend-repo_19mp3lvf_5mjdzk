import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-white/70 text-xs mb-6 pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Futuristic LED Posters & Car Decor
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.2)]">
            Illuminate Your Drive
          </h1>
          <p className="mt-5 text-white/80 text-base sm:text-lg max-w-xl">
            Premium LED posters and ambient kits designed for performance enthusiasts. Sleek. Modern. Built to glow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition">Shop Featured</a>
            <a href="#about" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">Learn More</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
    </section>
  )
}

export default Hero
