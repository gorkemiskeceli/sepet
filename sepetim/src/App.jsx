import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
//ürünler burada fetch ile çekiliyor
  useEffect(() => {
    fetch("/urunler.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
//bu fonksiyonda ürünler sepete ekleniyor ürün var mı diye kontrol ediyor 
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const isPresent = prev.find((p) => p.id === product.id);
      if (isPresent) {
        if (isPresent.total >= product.stok) {  //eğer sepetteki ürün  stok sayısından büyük veya eşitse daha fazla eklemesini engelliyor
          alert("Stok Kalmadı!");
          return prev;
        }
        return prev.map((p) =>
          p.id === product.id ? { ...p, total: p.total + 1 } : p //aradığım ürün ile eklemeye çalıştığım ürün id si tutuyor mu diye kontrol ediyor eğer eşitse ürünün tüm bilgilerini tutarak eklendikçe totali 1'er olarak arttırıyor
        );
      }
      if (product.stok <= 0) { //eğer ürün stokta yoksa ürünü eklemiyor
        alert("Stok Kalmadı!");
        return prev;
      }
      return [ //ürün ilk eklendiğinde ürünü koruyorak iç formdaki halinde döndürüyor
        ...prev,
        {
          id: product.id,
          ad: product.ad,
          price: product.fiyat,
          total: 1,
          stok: product.stok,
        },
      ];
    });
  };

  const handleCartUpdate = (id, newTotal) => {  //eğer toplam 0 ve 0 dan küçük ise sepetten siliyor değilse map ile total verisini güncelliyor
    if (newTotal <= 0) {    
      setCart((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, total: newTotal } : p))
    );
  };

  const handleReduce = (id) => {  //filter ile id eşlenen ürünü koruyor eşlenmiyorsa sepetten kaldırıyor
    setCart((prev) => prev.filter((p) => p.id !== id));
  };
  return (
    <>
     <ProductList
        products={products}
        loading={loading}
        onAddToCart={handleAddToCart}
      />
      <Cart 
      sepet = {cart}
      onCartUpdate = {handleCartUpdate}
      onCartReduce = {handleReduce}
      />
    </>
  );
}

export default App;
