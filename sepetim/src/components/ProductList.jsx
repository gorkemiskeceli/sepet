export default function ProductList({ products, loading, onAddToCart }) {
  return (
    <div className="max-w-lg mx-auto mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ürünler</h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3">

              <div>
                <h3 className="font-semibold text-gray-800">{product.ad}</h3>
                <p className="text-lg font-bold text-orange-500 font-mono mt-1">{product.fiyat.toFixed(2)} TL</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Stok: {product.stok}
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stok === 0}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  {product.stok === 0 ? "Tükendi" : "Sepete Ekle"}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
