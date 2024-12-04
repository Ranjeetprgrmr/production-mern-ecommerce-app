import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController,
braintreeTokenController, braintreePaymentController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import braintree from 'braintree';

const router = express.Router()

//routes
//create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//get all products
router.get('/get-product', getProductController);

//single product
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//filter product
router.post('/product-filters', productFiltersController)

//product count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//search product
router.get('/search/:keyword', searchProductController)

//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
router.get('/product-category/:slug', productCategoryController)

//payments routes
//token
router.get('/braintree/token', braintreeTokenController)

//payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router;