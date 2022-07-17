import React , { createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (productToAdd, qty)=>{
        const productInCart = cartItems.find((item) => {item._id === productToAdd._id});
            setTotalPrice((prevPrice) => {
                return prevPrice + productToAdd.price * qty;
            })
            setTotalQuantities((prevTotalQty) => {
                return prevTotalQty + qty;
            })
        if(productInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === productToAdd._id){
                    return {...cartProduct, quantity: cartProduct.qty + qty};
                }
            })
            setCartItems(updatedCartItems);
            
        }else {
            productToAdd.qty = qty;
            setCartItems([...cartItems, {...productToAdd}])
        }
        toast.success(`${qty} ${productToAdd.name} added to the cart.`)
    }

    const incQty = () =>{
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () =>{
        setQty((prevQty) => {
            if(prevQty - 1 < 1 ){
                return 1
            };
            return prevQty - 1;
        });
    }

    const value = {
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);