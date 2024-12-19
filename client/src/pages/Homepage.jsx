import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product._id, name: product.name, price: product.price }));
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6">Produse Disponibile</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-2">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Adaugă în Coș
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
