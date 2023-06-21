import React, { useState, useEffect } from "react";

const ProductDisplay = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const response = await fetch('https://adstreamserver-d962608709d6.herokuapp.com/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ price: 9999, name: "PUBLICIDAD" }),
        });
      
        if (response.ok) {
          console.log("response", response);
          const { url } = await response.json();
          console.log("url", url);
          window.location = url;
        } else {
          const { message } = await response.json();
          console.error(message);
        }
      };      
  
    return (
      <section>
        <div className="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            Checkout
          </button>
        </form>
        </div>
      </section>
    )
  };


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Pago() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

