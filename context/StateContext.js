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
        //check if product in cart
        const productExistsInCart = cartItems.find((item)=> item._id === productToAdd._id);
            setTotalPrice((prevPrice) => {
                return prevPrice + productToAdd.price * qty;
            })
            setTotalQuantities((prevTotalQty) => {
                return prevTotalQty + qty;
            })
        if(productExistsInCart){
            const updatedCartItems = cartItems.map((item) =>
            {
                //find matching product and adjust number in the cart
                if(item._id === productToAdd._id){
                    return {...item, qty: item.qty + qty}
                }else {
                    return item
                }
            });
            setCartItems(updatedCartItems);
        }else {
            productToAdd.qty = qty;
            setCartItems((prevCartItems) => [...prevCartItems, productToAdd])
        }
        toast.success(`${qty} ${productToAdd.name} added to the cart.`)
        setQty(1)
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
        if(value === 'inc'){
            foundProduct.qty +=1;
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + 1);
        }else if (value === 'dec'){
            if(foundProduct.qty > 1){
                foundProduct.qty -=1;
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - 1); 
            }
            
        }
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

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cartItems") || '[]')
        console.log(cart)
        setCartItems(cart)
        const getQty = cart.reduce((prevNum, item) => {
            return prevNum + item.qty
        },0)
        const getPrice = cart.reduce((prevNum, item) => {
            return prevNum + item.price
        },0)
        setTotalQuantities(getQty)
        setTotalPrice(getPrice)
    },[])    
    
    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));        
    },[cartItems, toggleCartItemQty, totalPrice, onRemove])

    const value = {
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
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