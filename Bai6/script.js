const defaultProducts = [
    {
        name: 'Ja 3 "Spooky Season"',
        description: 'Every time Ja steps on the court, it\'s showtime. To help him elevate his game, we worked with him to make the bounciest Ja signature shoe so far. The Ja 3 is light, tough and a game-changer with full-length Hybrid ZoomX foam. "ZoomX is crazy responsive," Ja says. "I call it that jet fuel." We call it bad news for his defenders.',
        price: 140,
        image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/6eea5331-2e44-485e-bc94-1257375f4839/JA+3+HALLOWEEN.png'
    },
    {
        name: 'Air Jordan 4 Retro "Cave Stone and Black"',
        description: 'Step into a classic. This AJ4 throws it back with full-grain leather and premium textiles. Iconic design elements from the original, like floating eyestays and mesh-inspired accents, feel just as fresh as they did in \'89.',
        price: 220,
        image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9a4cf0c3-a571-45c8-8630-d171fcc0417d/AIR+JORDAN+4+RETRO.png'
    },
    {
        name: 'KD18 "Slim Reaper"',
        description: 'It\'s always spooky SZN when the Slim Reaper is on the prowl, dishing out 30-point performances to defenders who never see it coming. Featuring a glow-in-the-dark outsole and a mysterious, slender skeleton hand design across the midfoot cage, this special KD18 pays tribute to one of the most intimidating scorers to ever haunt the perimeter, always lurking for his next bucket.',
        price: 170,
        image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/e8e98f54-d7a3-4762-abdc-6d3149a9cad9/KD18+SE.png'
    }
];

let products = [];

function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    } else {
        products = [...defaultProducts];
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const article = document.createElement('article');
        article.className = 'product-item';
        article.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/200'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
        `;
        productList.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Load and display products
    loadProducts();
    displayProducts();

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
        const isExpanded = addProductForm.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse the form
            addProductForm.style.maxHeight = '0';
            addProductForm.classList.remove('expanded');
        } else {
            // Expand the form
            addProductForm.classList.add('expanded');
            addProductForm.style.maxHeight = addProductForm.scrollHeight + "px";
        }
        
        errorMessage.classList.add('hidden');
    });

    // Handle form submission
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDesc').value;
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

        // Add new product to array and localStorage
        const newProduct = { name, description, price, image };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        // Update display
        displayProducts();

        // Reset form and collapse it with animation
        addProductForm.reset();
        addProductForm.style.maxHeight = '0';
        addProductForm.classList.remove('expanded');
        errorMessage.classList.add('hidden');
    });
});