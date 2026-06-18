export default function Cart({ sepet, onCartUpdate, onCartReduce }) { //stateler ekleniyor burada

  const totalPrice = sepet.reduce((t, product) => t + product.price * product.total, 0); // reduce ile dizideki elemanlar dolaşılıyor 0' ı başlangıç olarak alıp eklenen ürünlerin fiyatlarını topluyor
  const totalQuantity = sepet.reduce((t, product) => t + product.total, 0); //burası da reduce ile dizideki elemanları geziyor ancak burada fiyat toplamak yerine 0 dan başlayarak kaç ürün ekleniyorsa onları ekliyor

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800"> 
          Sepetim
          <span className="text-orange-500 text-lg ml-2">({totalQuantity})</span> 
        </h1>
      </div>

      <div className="space-y-3 min-h-40">
        {sepet.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-800 text-sm">Sepetiniz boş</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sepet.map((product) => (
              <div key={product.id} className="flex items-center justify-between bg-gray-100 rounded-xl p-3">

                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800">{product.ad}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{product.price.toFixed(2)} TL</p>
                </div>

                <div className="flex items-center gap-2 mx-4">
                  <button onClick={() => onCartUpdate(product.id, product.total - 1)}
                    className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-bold cursor-pointer">-</button>
                  <span className="w-5 text-center font-semibold text-sm">{product.total}</span>
                  <button onClick={() => onCartUpdate(product.id, product.total + 1)}
                    className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-bold cursor-pointer">+</button>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-orange-500 font-mono">
                    {(product.price * product.total).toFixed(2)} TL
                  </p>
                  <button onClick={() => onCartReduce(product.id)}
                    className="text-xs text-red-400 hover:text-red-600 mt-1 cursor-pointer">Sil</button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {sepet.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Toplam:</span>
            <span className="text-xl font-black text-orange-500 font-mono">{totalPrice.toFixed(2)} TL</span>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer">
            Alışverişi Bitir
          </button>
        </div>
      )}

    </div>
  );
}
