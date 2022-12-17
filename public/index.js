function generateBrandCheckboxList() {
    $.get(API_BASE + '/brand/all', function (res) {
        let ht = '';
        $.each(res, function (i, x) {
            ht += `<div class="form-check">
            <input class="form-check-input filter-brand-checkbox" type="checkbox" value="${x.id}" id="${x.brandName}">
            <label class="form-check-label" for="${x.brandName}">
             ${x.brandName}
            </label>
          </div>`;
        });
        $('#brands-sidebar').html(ht);
    }, 'json');
}

function generateBrandDropdown() {
    $.get(API_BASE + '/brand/all', function (res) {
        let ht = '';
        $.each(res, function (i, x) {
            ht += `<option value="${x.id}">${x.brandName}</option>`;
        });
        $('.category-dropdown').html(ht);
    }, 'json');
}

function toggleLoggedIn() {
    if (localStorage.getItem('user_id') == null) {
        // guest - show login button
        $('#login_link').show();
        $('#user_menu').hide();
    } else {
        // logged-in user - hide login button and show menu
        $('#login_link').hide();
        $('#user_menu').show();
    }
}

function isLoggedIn() {
    return (localStorage.getItem('user_id') != null);
}

function getFilterSelectedBrandIds() {
    let items = $('.filter-brand-checkbox:checked');
    let ids = [];
    $.each(items, function (i, x) {
        ids.push(parseInt(x.value));
    });
    return ids;
}

function listFilteredItems() {
    // collect filters
    let minPrice = parseInt($('#filter_price_min').val() == '' ? '0' : $('#filter_price_min').val());
    let maxPrice = parseInt($('#filter_price_max').val() == '' ? '0' : $('#filter_price_max').val());
    let sortKey = $('#sort_by').val();
    let productType = $('#category').val();
    let selectedBrands = getFilterSelectedBrandIds();
    let searchVal = $('#filter-search-field').val();
    let productTypesArr = productType ? [productType] : [];

    // get data
    let url = API_BASE + '/product/filter';
    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "brandIds": selectedBrands,
            "endPrice": maxPrice,
            "prodcutTypes": productTypesArr,
            "searchCol": searchVal,
            "sortingCol": sortKey,
            "startPrice": minPrice
        }),
    };

    $.ajax(settings).done(function (res) {
        renderProducts(res);
    });
}

function renderProducts(products) {
    let ht = ``;
    if (products.length == 0) {
        ht = `<div class="col-lg-12">
                <div class="alert alert-info">
                    <h4>No items matching your search results can be found.</h4>
                </div>
            </div>`;
    } else {
        $.each(products, function (i, prod) {
            ht += `<div class="col-lg-3 mb-3">
              <div class="product" data-prodid="${prod.id}" 
              style="background-image: url('/images/product-sample.webp');
              background-size:contain;
              background-repeat: no-repeat;
              cursor: pointer;">
                <a href="javascript:void()" data-prod_id="${prod.id}" class="add-to-wishlist">
                  <img src="/images/add-to-favorites.png">
                </a>
                <a href="javascript:void()" data-prod_id="${prod.id}" class="add-to-cart">
                  <img src="/images/Group 1662.png">
                </a>
                <div class="details">
                  <p>
                    <span class="product-name">${prod.productName}</span> <br>
                    <span class="product-price">LKR ${Number(prod.unitPrice).toFixed(2)}</span> <br>
                    <span class="product-rating">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>`;
        });
    }
    $('.product-grid').html(ht);
}

function getProductTypes() {

}

function refreshLoginStatus() {
    setInterval(function () {
        toggleLoggedIn();
    }, 2000);
}

$('#filter_items').click(function () {
    listFilteredItems();
});

$(document).on('click', '.product', function () {
    let prodId = $(this).data('prodid');
    window.location = '/products/view/' + prodId;
});

function addToCart(id) {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '{}');
    }

    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[id] = 1;

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '{}');
    }

    let cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[id];

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '{}');
    }

    let cart = JSON.parse(localStorage.getItem('cart'));
    let itemCount = Object.keys(cart).length;
    $('.cart-count-display').html(itemCount);
}

$(document).on('click', '.add-to-cart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    let id = $(this).data('prod_id');
    addToCart(id);
    updateCartIcon();
});

function addToWishlist(id) {
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', '{}');
    }

    let wishlist = JSON.parse(localStorage.getItem('wishlist'));
    wishlist[id] = 1;

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateWishlistIcon() {
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', '{}');
    }

    let wishlist = JSON.parse(localStorage.getItem('wishlist'));
    let itemCount = Object.keys(wishlist).length;
    $('.wishlist-count-display').html(itemCount);
}

$(document).on('click', '.add-to-wishlist', function (e) {
    e.stopPropagation();
    e.preventDefault();
    let id = $(this).data('prod_id');
    addToWishlist(id);
    updateWishlistIcon();
});

function displayProductDetailsById(prodId) {
    var settings = {
        "url": "http://localhost:8080/api/product/getbyid/" + prodId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json"
        },
    };

    $.ajax(settings).done(function (response) {
        $('#product_title').html(response.productName);
        $('#description_content').html(response.productDescription);
        $('#brand_name').html(response.brand.brandName);
        $('#product_price').html(Number(response.unitPrice).toFixed(2));
    });
}

function updateProductDetailsView() {
    if ($('#selectedProductId').length == 0) {
        return false;
    }

    let selectedId = $('#selectedProductId').val();
    displayProductDetailsById(selectedId);
}

function init() {
    generateBrandCheckboxList();
    toggleLoggedIn();
    refreshLoginStatus();

    if ($('.category-dropdown').length > 0) {
        generateBrandDropdown();
    }
}

function change_image(image) {
    var container = document.getElementById("main-image");
    container.src = image.src;
}

let cartProductsTable = [];

function listCartProductsTable() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '{}');
    }

    let cart = JSON.parse(localStorage.getItem('cart'));

    for (const cartKey in cart) {
        getProductDetailsById(cart[cartKey]);
    }
    console.log(cartProductsTable);
}

function getProductDetailsById(prodId) {
    var settings = {
        "url": "http://localhost:8080/api/product/getbyid/" + prodId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json"
        },
    };

    return $.ajax(settings).done(function (response) {
        cartProductsTable.push(response);
    });
}

function populateCartTable() {
    let tht = '';
    let cartTotal = 0.0;

    if (cartProductsTable.length == 0) {
        tht = '<div class="alert alert-info">No products added to cart.</div>';
    }

    for (const cartProduct of cartProductsTable) {
        console.log(cartProduct);
        tht += `<div class="row">
                <div class="col-md-3">
                    <div class="images p-3">
                        <div class="text-center p-4"> 
                            <img id="main-image" src="/images/product-sample.webp" width="150" />
                        </div>                                        
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="p-4">                                        
                        <div class="mt-4 mb-3"> 
                            <h5 class="text-uppercase">${cartProduct.productName}</h5>
                            <div class="price d-flex flex-row align-items-center"> 
                                <span class="act-price">
                                    <h4>LKR ${Number(cartProduct.unitPrice).toFixed(2)}</h4>
                                </span>
                            </div>
                        </div>
                        <div class="cart mt-4 align-items-center">
                            <section id="buyBlock">
                                <span id="priceATC" class="quantity-up-down">
                                    <label>Qty</label>
                                    <span class="icon-minus-squared off cart-decrement" data-prod_id="${cartProduct.id}">&ndash;</span>
                                    <input name="Quantity" type="number" value="1" id="Quantity" class="qty-field" min="1" max="12">
                                    <span class="icon-plus-squared cart-increment" data-prod_id="${cartProduct.id}">+</span>
                                </span>                                                
                            </section>
                        </div>                                        
                    </div>
                </div>
                <div class="col-md-1 p-4">
                    <div class="cart mt-4 align-items-center">                                            
                        <button class="btn btn-danger text-uppercase mb-2 remove-from-cart" data-prod_id="${cartProduct.id}">Delete</button> 
                    </div>
                </div>
            </div>`;
        cartTotal += Number(cartProduct.unitPrice);
    }

    $('#cart-products-list').html(tht);
    $('.cart-total').html('LKR ' + cartTotal.toFixed(2));
}

$(document).on('click', '.remove-from-cart', function (e) {
    if (confirm('Are you sure you want to remove this item from the cart?')) {
        let productId = $(this).data('prod_id');
        removeFromCart(productId);
        populateCartTable();
    }
});

setTimeout(function () {
    populateCartTable();
}, 1000);

function logout() {
    if(confirm('Are you sure you want to log out?')) {
        alert('login faild. please try again.');
        localStorage.removeItem('user_id');
        localStorage.removeItem('customer');
        window.location = '/login';
    }
}

$(function () {
    init();

    if ($('#filter_items').length > 0) {
        listFilteredItems();
    }

    updateCartIcon();
    updateWishlistIcon();

    // update details of the product
    updateProductDetailsView();

    if ($('#cart-products-list').length > 0) {
        listCartProductsTable();
    }
});