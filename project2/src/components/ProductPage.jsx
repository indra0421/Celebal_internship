import React, { useState, useEffect } from 'react';
import './ProductPage.css'

const ProductCard = ({ product, addToCart, isAdded }) => {
    const { id, title, image, price, rating } = product;

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={title} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{title}</h3>
                <p className="product-price">${price}</p>
                <p className="product-rating">
                    Rating: {rating.rate} (Count: {rating.count})
                </p>
            </div>
            {!isAdded ? (
                <button className="add-to-cart" onClick={() => addToCart(id)}>
                    Add to Cart
                </button>
            ) : (
                <button className="added-to-cart">Item added to Cart</button>
            )}
        </div>
    );
};

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
    const { id, title, price, quantity } = item;

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        updateQuantity(id, newQuantity);
    };

    return (
        <div className="cart-item">
            <h3 className="item-name">{title}</h3>
            <p className="item-price">${price}</p>
            <label>Quantity: </label>
            <input
                className="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
            />

            <button className="remove" onClick={() => removeFromCart(id)}>
                Remove
            </button>
        </div>
    );
};

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                ))
            )}
            <h3 className="total">Total: ${total.toFixed(2)}</h3>
            <button className="add-to-cart">
                Pay Now
            </button>
        </div>
    );
};

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        // Fetch products from the API
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    const addToCart = (productId) => {
        const productToAdd = products.find((product) => product.id === productId);
        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
            const updatedCart = cart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
        } else {
            const newItem = { ...productToAdd, quantity: 1 };
            setCart([...cart, newItem]);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="App">
            <header>
                <button className="cart-button" onClick={toggleCart}>
                    Cart ({cartItemCount})
                </button>
            </header>

            <div className="product-page">
                <h1 className="title">Product Catalog</h1>
                <div className="product-list">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            isAdded={cart.some((item) => item.id === product.id)}
                        />
                    ))}
                </div>
            </div>

            {showCart && (
                <div className="cart-page">
                    <Cart
                        cart={cart}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductPage;
