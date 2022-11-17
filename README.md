# BlueKart-BackEnd

BlueKart is an E-Commerce website for everything Blue. It is a one-stop place for Blue color fanatics to buy a variety of products and Go Blue in style! Apply filters on the product listing page as per your needs and in just a few clicks you can buy any product from our website. BlueKart supports all kind of payment options like debit/credit card, UPI.

This repository contains the Back-End code for BlueKart.

## Tech Stack

- Express.js
- Node.js
- MongoDB
- Mongoose

## Features

- API routes implemented:
    - [Auth](https://github.com/Devansu-Yadav/BlueKart-BackEnd/blob/development/routes/auth.route.js):
        - Login: `[POST] - /api/auth/login`
        - Signup: `[POST] - /api/auth/signup`
        - Password reset: `[POST] - /api/auth/passwordReset`
    - [Categories](https://github.com/Devansu-Yadav/BlueKart-BackEnd/blob/development/routes/categories.route.js):
        - `[GET] - /api/categories`
        - `[GET] - /api/categories/:categoryId`
    - [Products](https://github.com/Devansu-Yadav/BlueKart-BackEnd/blob/development/routes/products.route.js):
        - `[GET] - /api/products`
        - `[GET] - /api/products/:productId`
    - [Users](https://github.com/Devansu-Yadav/BlueKart-BackEnd/blob/development/routes/user.route.js):
        - Wishlist: 
            - `[GET, POST] - /api/user/wishlist`
            - `[DELETE] - /api/user/wishlist/:productId`
        - Cart:
            - `[GET, POST] - /api/user/cart`
            - `[POST, DELETE] - /api/user/cart/:productId`
        - Account:
            - `[GET, POST] - /api/user/account`
            - UserAddress:
                - `[GET, POST] - /api/user/account/addresses`
                - `[POST, DELETE] - /api/user/account/addresses/:addressId`

## Live
[BlueKart-BackEnd](http://bluekart-back-end.vercel.app/)
