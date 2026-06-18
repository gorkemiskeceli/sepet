import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/urunler.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const isPresent = prev.find((p) => p.id === product.id);
      if (isPresent) {
        if (isPresent.total >= product.stok) {
          alert("Stok Kalmadı!");
          return prev;
        }
        return prev.map((p) =>
          p.id === product.id ? { ...p, total: p.total + 1 } : p
        );
      }
      if (product.stok <= 0) {
        alert("Stok Kalmadı!");
        return prev;
      }
      return [
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

  const handleCartUpdate = (id, newTotal) => {
    if (newTotal <= 0) {
      setCart((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, total: newTotal } : p))
    );
  };

  const handleReduce = (id) => {
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
