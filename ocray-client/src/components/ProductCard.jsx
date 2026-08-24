import Button from './Button';

const ProductCard = ({ product, index }) => {
  return (
    <article className="gold-glass-card group rounded-[1.75rem] border p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_24px_54px_rgba(180,120,25,0.18)]">
      <div className="overflow-hidden rounded-[1.25rem] border border-amber-900/10 bg-amber-50">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
        {product.category} {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-zinc-900 transition group-hover:text-amber-800">
        {product.title}
      </h3>
      <p className="mt-2 text-base font-bold text-amber-800">{product.price}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {product.content[0].substring(0, 120)}...
      </p>

      <Button
        to={`/products/${product.name}`}
        className="mt-5 rounded-xl border-amber-600/40 bg-zinc-900 px-5 py-3 text-xs tracking-[0.2em] text-white hover:border-amber-600 hover:bg-zinc-800"
      >
        View Product
      </Button>
    </article>
  );
};

export default ProductCard;
