import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem } from "../redux/slices/cartSlice";
import Checkout from "./Checkout";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addItem({ id: item.id, name: item.name, price: item.price }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Calculăm totalul general al coșului
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6">Coșul Meu</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Coșul este gol</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b p-2"
              >
                <div>
                  <span className="font-semibold">
                    {item.name} - ${item.price} x {item.quantity}
                  </span>
                  <span className="ml-4 font-bold">
                    Total: ${item.price * item.quantity}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleAdd(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mx-1"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Afișăm totalul general */}
          <div className="text-right mt-4">
            <h2 className="text-2xl font-bold">
              Total de plată: ${totalAmount.toFixed(2)}
              <Checkout cartItems={cartItems} />
            </h2>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default Cart;
