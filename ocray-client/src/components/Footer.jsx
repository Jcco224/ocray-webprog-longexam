const Footer = () => {
  return (
    <div className="border-t-4 border-yellow-500 bg-zinc-950 px-3 py-12 sm:px-4 lg:px-6">
      <div className="flex w-full flex-col gap-4 text-zinc-50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-bold text-yellow-400 sm:text-3xl">BulldogEx Shop</p>
          <p className="mt-2 max-w-md text-base text-zinc-300">
            Campus essentials, simple ordering, and official school merchandise in one place.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Products | Cart | Pickup
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            BulldogEx Shop 2026
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
