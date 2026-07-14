// Shared header + cart behaviour used across every page of the demo storefront.
(function () {
  const CART_KEY = 'demo_amazon_cart';

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function addToCart(productId, qty) {
    const cart = readCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty });
    }
    writeCart(cart);
    updateCartCount();
  }

  function removeFromCart(productId) {
    const cart = readCart().filter((item) => item.id !== productId);
    writeCart(cart);
    updateCartCount();
  }

  function clearCart() {
    writeCart([]);
    updateCartCount();
  }

  function cartCount() {
    return readCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function updateCartCount() {
    const badge = document.getElementById('nav-cart-count');
    if (badge) badge.textContent = String(cartCount());
  }

  function goToSearch() {
    const input = document.getElementById('twotabsearchtextbox');
    const query = encodeURIComponent(input.value.trim());
    window.location.href = `search.html?q=${query}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const searchButton = document.getElementById('nav-search-submit-button');
    if (searchButton) {
      searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        goToSearch();
      });
    }

    const searchInput = document.getElementById('twotabsearchtextbox');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          goToSearch();
        }
      });

      const params = new URLSearchParams(window.location.search);
      if (params.get('q')) searchInput.value = params.get('q');
    }

    const cartLink = document.getElementById('nav-cart');
    if (cartLink) {
      cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'cart.html';
      });
    }

    const logo = document.getElementById('nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
  });

  window.DemoCart = { readCart, writeCart, addToCart, removeFromCart, clearCart, cartCount, updateCartCount };
})();
