window.addEventListener("DOMContentLoaded", () => {
    const userSection = document.getElementById("user-section");
    const loggedInUser = localStorage.getItem("loggedInUser");
  
    if (userSection) {
      if (loggedInUser) {
        userSection.innerHTML = `
          <span style="margin-right: 10px; font-weight: bold;">Hi, ${loggedInUser}</span>
          <button onclick="goToCart()" class="cart-btn">🛒 Cart</button>
          <button onclick="logout()" class="logout-btn">Logout</button>
        `;
      } else {
        userSection.innerHTML = `
          <button class="login" onclick="window.location.href='login.html'">Login</button>
        `;
      }
    }
  });
  
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  }
  
  function goToCart() {
    window.location.href = "cart.html";
  }
  