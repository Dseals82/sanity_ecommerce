import React , { createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

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
                    return {...cartProduct, qty: cartProduct.qty + qty};
                }
            })
            setCartItems(updatedCartItems);
            
        }else {
            productToAdd.qty = qty;
            setCartItems([...cartItems, {...productToAdd}])
        }
        toast.success(`${qty} ${productToAdd.name} added to the cart.`)
    }
    
    const onRemove = (productToRemove) => {
        foundProduct = cartItems.find((item)=> item._id === productToRemove._id);
        const newCartItems = cartItems.filter((item, i) => item._id !== productToRemove._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.qty);
        setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.qty);
        setCartItems(newCartItems);
    }

    const toggleCartItemQty = (id, value) =>{
    
        foundProduct = cartItems.find((item)=> item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item, i) => item._id !== id);
        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, qty: foundProduct.qty + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + 1);
        }else if (value === 'dec'){
            if(foundProduct.qty > 1){
                setCartItems([...newCartItems, {...foundProduct, qty: foundProduct.qty - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - 1); 
            }
            
        }
        console.log(newCartItems)
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
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQty,

    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);