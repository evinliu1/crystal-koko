import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import axios from 'axios'
import { use } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 0;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();
    const [products,setProducts] = useState([])
    const [token,setToken] = useState('')

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

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }

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

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    }

    useEffect(() => {

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

    const getProductsData = async () => {

        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)
        }

    }

    const getUserCart = async (token) => {

        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
            if (response.data.success) {
                
                
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }

    }

    useEffect(()=>{

        getProductsData()

    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

    },[])

    const value = {
        products, currency, delivery_fee,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate , backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;