function BrandStrip() {
  const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/3/3a/Logo_Varta.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4a/Bosch-logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Continental_AG_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/ad/Philips_logo_new.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1a/Osram_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/40/Goodyear_logo.svg',
  ]

  return (
    <section className="relative bg-black py-10 border-y border-white/10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-16 items-center whitespace-nowrap will-change-transform" style={{ animation: 'marquee 25s linear infinite' }}>
          {[...logos, ...logos].map((src, i) => (
            <img key={i} src={src} className="h-8 opacity-60 hover:opacity-90 transition" alt="brand" />
          ))}
        </div>
      </div>
      <style>
        {`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}
      </style>
    </section>
  )
}

export default BrandStrip
