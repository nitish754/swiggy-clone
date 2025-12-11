#Feature to be developed 

1. Home page 
   - Whats In mind (Simply show some items total 5)
   - Top Restaurant (add filter (top rated, Rating high to low, low to high, add cuisines filter and add search bar))
   - Restaurants with online food delivery and sorted by rating default
   - On click of Restaurant open the restaurant menus(with all details like description, rating, name,price, cusines,food_type etc.)
   - On restaurant page there should be option to search the menu. with toggle button for veg and non veg
Note above all data will be publically available 

2. Authenticaton feature 
   - Login 
   - Signup 
   - Forgot Password 

3. Cart Features 
   - Add Cart (On click option select the Quantity etc. )
   - View Carts (If not logged in then ask to login )
4. Manage Address 
   - User should have option to manage multiple address 



## API-TO-DEVELOP 

### Home Page APIs
1. **Get Items for "What's In Mind"**  
    `GET /api/home/whats-in-mind`

2. **Get Top Restaurants**  
    `GET /api/home/top-restaurants?filter={filterType}&search={searchQuery}`

3. **Get Restaurants with Online Food Delivery**  
    `GET /api/home/online-restaurants?sort=rating`

4. **Get Restaurant Details**  
    `GET /api/restaurant/{restaurantId}`

5. **Search Restaurant Menu**  
    `GET /api/restaurant/{restaurantId}/menu?search={searchQuery}&vegOnly={true|false}`

---

### Authentication APIs
1. **Login**  
    `POST /api/auth/login`

2. **Signup**  
    `POST /api/auth/signup`

3. **Forgot Password**  
    `POST /api/auth/forgot-password`

---

### Cart APIs
1. **Add to Cart**  
    `POST /api/cart/add`

2. **View Cart**  
    `GET /api/cart/view`

---

### Address Management APIs
1. **Get User Addresses**  
    `GET /api/address`

2. **Add New Address**  
    `POST /api/address/add`

3. **Update Address**  
    `PUT /api/address/{addressId}`

4. **Delete Address**  
    `DELETE /api/address/{addressId}`
