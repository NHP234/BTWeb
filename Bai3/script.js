document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const products = document.querySelectorAll('.product-item');

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach(product => {
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

    addProductButton.addEventListener('click', function() {
        addProductForm.classList.toggle('hidden');
    });
});