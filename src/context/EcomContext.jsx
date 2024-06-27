import { createContext, useContext, useEffect, useState } from "react";
import { carousel, products, inventory } from "../data/EcomData";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";

const EcomContext = createContext();

export const EcomProvider = ({ children }) => {
  const [state, dispatch] = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [slide, setSlide] = useState([]);
  const [cartCount, setCartCount] = useState(0)
  const [order, setOrder ] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { showAndHide, alertInfo } = useAlert();
  
  const isAuthenticated = state.accessToken !== null;

  useEffect(() => {
    fetchProduct();
    fetchCarousel();
    fetchShowroom();
    fetchCart();
  }, []);

  useEffect(()=>{
    const count = cartItems.products?.reduce(
      (total, item) => total + item.quantity,
    0)

    setCartCount(count)
  }, [cartItems])

  // const getCartCount = () => {
  //   if (!cartItems || !cartItems.products) {
  //     return 0;
  //   } else {
  //     return cartItems.products.reduce(
  //       (total, item) => total + item.quantity,
  //       0
  //     );
  //   }
  // };

  const featured = product.filter((item) => item.featured === true);
  const topSelling = product.filter((item) => item.topSelling === true);
  const showRoom = inventory.filter((item) => item.inventory === true);

  const fetchProduct = async () => {
    const response = await fetch("https://technotronix-api-vh62.onrender.com/api/product");
    const data = await response.json();
    setProduct(data);
  };

  const addToCart = async (productId) => {
    try {
      const res = await fetch("https://technotronix-api-vh62.onrender.com/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setCartItems(data);
      showAndHide("success", "items added to cart");
    } catch (error) {
      console.log(error.message);
      showAndHide("error", "Failed to add item to cart");
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch("https://technotronix-api-vh62.onrender.com/cart", {
        method: "GET",
        headers: {
          "Content-Type": "appliction/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error getting cart", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    // console.log(quantity);
    if (!quantity > 0) {
      showAndHide("error", "quantity cannot be less than 1");
      return;
    }
    try {
      const res = await fetch("https://technotronix-api-vh62.onrender.com/update-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (res.ok) {
        const existingItemIndex = cartItems.products?.findIndex((item) => item.product._id === productId 
        );
        const updatedCartItem = [...cartItems.products];
        const itemToUpdate = updatedCartItem[existingItemIndex];
        itemToUpdate.quantity = quantity;
        itemToUpdate.amount = itemToUpdate.product.price * itemToUpdate.quantity;
        setCartItems({...cartItems, products: updatedCartItem });
        console.log(data);
      } else {
        console.log(data.msg || "Failed to update quantity");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await fetch("https://technotronix-api-vh62.onrender.com/delete-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({productId})
      })

      const data = await res.json()
      if (res.ok) {
        showAndHide("success", "item removed from cart")
        setCartItems(data)
      }else{
        console.error(data.msg || "Failed to removed item");
      }
    } catch (error) {
      console.error(error);  
    }

  };

  const totalAmount = () => {
    return cartItems.products?.reduce((total, item) => total + item.amount, 0);
  };

  const fetchCarousel = async () => {
    const response = await fetch("https://technotronix-api-vh62.onrender.com/carousel");
    const data = await response.json();
    setSlide(data);
  };

  const fetchShowroom = async () => {
    const response = await fetch("https://technotronix-api-vh62.onrender.com/inventory");
    const data = await response.json();
    setCars(data);
  };

  // const handleCheckout = async(amount, currency)=>{
  //   // const amount = totalAmount()
  //   // const currency = "NGN"

  //   try {
  //     const res = await fetch("http://localhost:3000/api/payment/initate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //       },
  //       body: JSON.stringify({amount, currency})
  //     })

  //     const data = await res.json()
  //     if (res.ok) {
  //       window.location.href = data.link
  //     }else{
  //       console.error(data.msg || "Failed to Initiate Payment");
  //     }
  //   } catch (error) {
  //     console.error(error);
      
  //   }
  // }
const createOrder = async(transaction_id, orderId)=>{
  try {
    const createOrder = await fetch("https://technotronix-api-vh62.onrender.com/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`
      },
      body: JSON.stringify({transaction_id, orderId}),
      credentials: "include"
    })

    const data = await response.json()
    if (res.ok) {
      setOrder(data.order)
      setCartItems([])
    }else{
      console.error(data.msg)
    }
  } catch (error) {
    console.error(error);
    
  }

}


  return (
    <EcomContext.Provider
      value={{
        featured,
        topSelling,
        product,
        slide,
        showRoom,
        addToCart,
        cartItems,
        updateQuantity,
        removeItem,
        totalAmount,
        showAndHide,
        alertInfo,
        cartCount,
        createOrder,
        isAuthenticated
      }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export default EcomContext;
