// all the products logic in the routes

const Product = require('../models/product.model');

const User = require('../models/user.model');

const getIndex = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.render('shop/index', {
      pageTitle: 'Shop',
      products: products,
      path: '/',
      hasProducts: products.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.render('shop/product-list', {
      pageTitle: 'Shopping list',
      products: products,
      path: '/product-list',
      hasProducts: products.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res, next) => {
  // const product = (await Product.findAll({ where: { id: req.params.id } }))[0]; // returns array
  // const product = await Product.find({ where: { id: req.params.id } }); // returns  single element
  const product = await Product.findById(req.params.id); // returns  single element

  res.render('shop/product-detail', {
    pageTitle: 'Product detail',
    product: product,
    path: '/product-list',
  });
};

const getCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  const products = cart.items;
  const totalPrice = cart.totalPrice;
  res.render('shop/cart', {
    pageTitle: 'Shopping Cart',
    products: products,
    totalPrice: Math.round(totalPrice * 100) / 100,
    path: '/cart',
    hasProducts: products.length > 0,
  });
};


const postCart = async (req, res, next) => {
  const prodId = req.params.id;
  const user = req.user;
  await user.addToCart(prodId);
  res.redirect('/cart');
};


const deleteProductFromCart = async (req, res, next) => {
  const prodId = req.params.id;
  await req.user.deleteFromCart(prodId);
  res.redirect('/cart');
};

const postOrder = async (req, res, next) => {
  req.user.addOrder();
  res.redirect('/orders');
};

const getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders();
  res.render('shop/orders', {
    pageTitle: 'Orders',
    orders: orders,
    path: '/orders',
  });
};

const getCheckout = async (req, res, next) => {
  const products = await Product.findAll();
  res.render('shop/checkout', {
    pageTitle: 'Shop Checkout',
    products: products,
    path: '/checkout',
    hasProducts: products.length > 0,
  });
};

module.exports = {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  postCart,
  deleteProductFromCart,
  getCheckout,
  getOrders,
  postOrder,
};
