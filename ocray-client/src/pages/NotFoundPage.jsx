import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex w-full justify-center bg-[#cfe4ef] px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#f2f2f2] shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <div className="h-12 w-full bg-blue-600 sm:h-14">
          <div className="flex h-full items-center gap-3 px-6">
            <span className="h-3.5 w-3.5 rounded-full bg-white/95"></span>
            <span className="h-3.5 w-3.5 rounded-full bg-white/95"></span>
            <span className="h-3.5 w-3.5 rounded-full bg-white/95"></span>
          </div>
        </div>
        <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
          <div className="absolute -bottom-10 -left-10 rotate-[-28deg]">
            <div className="relative h-64 w-56 rounded-sm border-[4px] border-slate-700 bg-[#d9dde3]">
              <div className="absolute -top-[4px] left-0 h-14 w-20 -skew-y-[24deg] border-l-[4px] border-t-[4px] border-slate-700 bg-[#eef1f4]"></div>
              <div className="absolute left-7 top-20 h-3 w-8 rounded-full bg-slate-700"></div>
              <div className="absolute right-10 top-20 h-3 w-3 rounded-full bg-slate-700"></div>
              <div className="absolute left-16 top-32 h-3 w-3 rounded-full bg-slate-700"></div>
              <div className="absolute right-12 top-[7.5rem] h-10 w-3 rotate-[45deg] rounded-full bg-slate-700"></div>
              <div className="absolute left-10 top-[10.5rem] h-3 w-16 rotate-[18deg] rounded-full bg-slate-700"></div>
            </div>
          </div>
          <h1 className="text-[110px] font-black leading-none tracking-tight text-[#132b57] sm:text-[160px] md:text-[200px]">
            404
          </h1>
          <p className="-mt-2 text-2xl font-semibold text-[#132b57] sm:text-4xl">
            Page Not Found
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Sorry, the page you are trying to visit does not exist or may have been moved.
          </p>
          <div className="mt-8">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
