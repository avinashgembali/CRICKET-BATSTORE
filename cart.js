window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cart-container"); // Use existing div
    
    const userEmail = localStorage.getItem("loggedInUserEmail");
    if (!userEmail) {
      container.innerHTML = "<p>Please login to view your cart.</p>";
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    let userCart = cart[userEmail] || [];
  
    if (userCart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    userCart.forEach((item, index) => {
      const itemCard = document.createElement("div");
      itemCard.className = "cart-card";
      itemCard.innerHTML = `
        <img src="./images/shop/${item.img}" alt="${item.name}" style="width:150px; height:150px; object-fit:cover;">
        <div class="cart-info">
          <p><strong>Name:</strong> ${item.name}</p>
          <p><strong>Type:</strong> ${item.type}</p>
          <p><strong>Rating:</strong> ${item.rating}⭐</p>
          <p><strong>Price:</strong> ₹${item.price.toLocaleString()}</p>
          <button class="remove-from-cart" data-index="${index}">🗑️ Remove</button>
        </div>
      `;
      container.appendChild(itemCard);
    });
  
    // Remove from cart
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-from-cart")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        userCart.splice(index, 1); // remove item from cart
        cart[userEmail] = userCart;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // refresh to show updated cart
      }
    });
  });
  