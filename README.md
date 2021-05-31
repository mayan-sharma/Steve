# Steve
An API for an ecommerce site

## features
* [x] Users can GET products.
* [x] Users can register, login and delete their account.
* [x] Users can add and remove products from their cart.
* [x] Admin user do all CRUD operations on products.

## Setup locally
- Clone the repo using `git clone https://github.com/mayan-sharma/Steve.git`
- cd `steve`
- Create `env` file in the root of the project.

```
MONGO_URI = ""
SECRET = ""
```

## API Reference

### User
  - `/api/user/login`
    - Allowed Methods: `POST`
    - Required fields: `{ email, password }`
    - Authenticates user info and returns a JWT token.
    
  - `/api/user/register`
    - Allowed Methods: `POST`
    - Required fields: `{ name, email, password }`
    - Registers a user and returns a JWT token.
    
  - `/api/user/`
    - Allowed Methods: `GET`
    - Authorization: Admin
    - Returns a list of all users
    
  - `/api/user/verify`
    - Allowed Methods: `GET`
    - Authorization: Bearer <Token>
    - Check the validity of the JWT token.
    
  - `/api/user/delete`
    - Allowed Methods: `DELETE`
    - Authorization: Bearer <Token>
    - Deletes the user.
  
### Products
  - `/api/products`
    - Allowed Methods: `GET` `POST`
    - `GET`
      - Returns the list of all products.
    - `POST`
      - Authorization: Bearer <Token>, Admin
      - Add a product to the catalog
    
  - `/api/products/:id`
    - Allowed Methods: `GET` `POST`
    - Returns single product with id passed

  - `/api/products/:id`
    - Allowed Methods: `PUT` `DELETE`
    - Authorization: Bearer <Token>, Admin
    - `PUT`
      - Required Fields: `{ name, price }`
      - Authorization: Bearer <Token>, Admin
      - Updates a product
    - `DELETE`
      - Deletes a product

### Cart
  - `/api/cart/:id`
    - Allowed Methods: `POST` `DELETE`
    - Authorization: Bearer <Token>
    - `POST`
      - Adds a product to the user's cart
    - `DELETE`
      - Deletes a product from the user's cart

  - `/api/cart/display`
    - Allwoed Methods: `GET`
    - Authorization: Bearer <Token>
    - Return all products in the cart

## Contributing
Pull requests are welcome.
