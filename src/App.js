import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [cartItem, setCartItem] = useState([]);
  bakeryData = bakeryData.map((item) => {
    return {...item, count: 1};
  });

  const addToCart = (item) => {
      const name = item.name
      const contains = cartItem.some (obj => {
        if (obj.name == item.name) {
          return true;
        }
        return false;
      })
      if (contains) {
        setCartItem(curr => curr.map(obj => {
          if (obj.name === name) {
            return {...obj, count: obj.count + 1};
          }
          return obj;
        }))
      }else {
        setCartItem([...cartItem, item]);
      }
  };

  function calculateTotalCost() {
    let curr = 0;
    cartItem.forEach((item) => {
      curr += item.count * item.price;
    });
    return curr.toFixed(2);
  }

  return (
    <div className="App">
      <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}

      {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
        // replace with BakeryItem component
        <div>
          <h1>{item.name} (${item.price})</h1>
          <p>{item.description}</p>
          <img src={item.image}/>
          <br></br>
          <button onClick={() => addToCart(item)}>Add to cart</button>
        </div>
      ))}

      <div>
        <h2>Cart</h2>
        {/* TODO: render a list of items in the cart */
          cartItem.map((item) => {
            return <p key={item}>{item.count}x {item.name}</p>
          })
        }
        <p>Total Price: {calculateTotalCost()}</p>
      </div>
    </div>
  );
}

export default App;
