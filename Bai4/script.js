document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productList = document.getElementById('product-list');

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.product-item').forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);

    // Toggle Add Product form
    const addProductButton = document.getElementById('add-product-button');
    const addProductForm = document.getElementById('addProductForm');
    const errorMessage = document.getElementById('errorMessage');

    addProductButton.addEventListener('click', function() {
        addProductForm.classList.toggle('hidden');
        errorMessage.classList.add('hidden');
    });

    // Handle form submission
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('productName').value;
        const desc = document.getElementById('productDesc').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const image = document.getElementById('productImage').value;

        // Validation
        if (!name.trim()) {
            errorMessage.textContent = 'Product name cannot be empty';
            errorMessage.classList.remove('hidden');
            return;
        }
        
        if (price <= 0) {
            errorMessage.textContent = 'Price must be greater than 0';
            errorMessage.classList.remove('hidden');
            return;
        }

        // Create new product
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item';
        newProduct.innerHTML = `
            <img src="${image || 'https://via.placeholder.com/200'}" alt="${name}">
            <h3>${name}</h3>
            <p>${desc}</p>
            <p class="price">$${price}</p>
        `;

        // Add to product list
        productList.appendChild(newProduct);

        // Reset form and hide it
        addProductForm.reset();
        addProductForm.classList.add('hidden');
        errorMessage.classList.add('hidden');
    });
});