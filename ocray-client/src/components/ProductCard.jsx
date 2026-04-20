import Button from './Button';

const ProductCard = ({ product, index }) => {
  return (
    <article className="group rounded-[1.75rem] border border-yellow-500/18 bg-[linear-gradient(180deg,#101010_0%,#151515_100%)] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-yellow-500/35 hover:shadow-[0_24px_54px_rgba(212,175,55,0.14)]">
      <div className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#1b1b1b]">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-yellow-400/75">
        {product.category} {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white transition group-hover:text-yellow-300">
        {product.title}
      </h3>
      <p className="mt-2 text-base font-bold text-yellow-400">{product.price}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {product.content[0].substring(0, 120)}...
      </p>

      <Button
        to={`/products/${product.name}`}
        className="mt-5 rounded-xl border-yellow-500/30 bg-transparent px-5 py-3 text-xs tracking-[0.2em] text-yellow-300 hover:border-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-200"
      >
        View Product
      </Button>
    </article>
  );
};

export default ProductCard;
