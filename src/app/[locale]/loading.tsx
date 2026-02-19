export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-linear-to-br from-violet-600 via-fuchsia-600 to-purple-700 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-white/20" />
          <div className="w-20 h-20 rounded-full border-4 border-white border-t-transparent animate-spin absolute top-0" />
        </div>
        <h1 className="text-3xl font-black bg-linear-to-r 
from-neutral-600 via-slate-800 to-stone-900
bg-clip-text text-transparent animate-pulse">
          Cartivo
        </h1>
        <p className="text-white text-lg font-medium tracking-wide animate-pulse">
          Loading amazing things...
        </p>
      </div>
    </div>
  )
}
