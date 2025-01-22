import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        let cartData = {...cartItems};
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = {};
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    totalCount += cartItems[item];
                }
            } catch (error) {
                console.log(error)
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);
    }

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product)=> product._id === items);
            try {
                if (cartItems[items] > 0) {
                    totalAmount += itemInfo.price * cartItems[items];
                }
            } catch (error) {

            }
        }
        return totalAmount;
    }

    const value = {
        products, currency, delivery_fee,
        cartItems,addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;