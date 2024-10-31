const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/Dbconfig');
const userRoutes = require('./Routes/users');
const orderRoutes = require('./Routes/orderRoutes');
const productRoutes = require('./Routes/products');
const categoryRoutes =require('./Routes/categoryRoutes')
const http = require('http');
const socketIo = require('socket.io');
const Stripe = require('stripe');
// Import controllers
const userupload = require('./Controllers/userController');
const {getUserByEmail} = require('./Controllers/users');
const user = require('./Controllers/users');
const { createProduct, deleteOneProduct, updateOneProduct,getAllProducts } = require('./Controllers/productController');
const { login } = require('./Controllers/login');
const { addCustomer, getCustomers } = require('./Controllers/customerController');
const { getCustomerByEmail } = require('./Controllers/getCustomerEmail');
const { fakeProductgenerator } = require('./Controllers/generateRandomData');
const { countryName } = require('./Controllers/countryController');
  
// App initialization
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);
const io = socketIo(server);
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Now you can use `stripe` object to make API calls

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        io.emit('chat message', msg); // Broadcast message to all clients
    });

    // On disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.post('/send-message', (req, res) => {
    const { message } = req.body; // Get the message from the request body
    if (message) {
        io.emit('chat message', message); // Broadcast the message to all clients
        res.status(200).send('Message sent successfully'); // Respond with success
    } else {
        res.status(400).send('Message is required'); // Respond with an error if no message
    }
});


app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body; // Price ko frontend se accept karein

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: item.name,
                  },
                  unit_amount: item.price * 100, // Price in cents
                },
                quantity: item.quantity,
              })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url }); // Stripe Checkout page ka URL send karein
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});





// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('Image');

// Connect to database
connectDB();

// Route handlers
app.use('/api/user', userRoutes);
app.use('/api', orderRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);


app.get('/getuser', user.getuser);
app.post('/adduser',upload, userupload.registerUser);
app.get('/getAllUsers', user.getAllUsers);
app.get('/getAllProducts', getAllProducts);
app.post('/login', login);
app.post('/addCustomer', upload, addCustomer);
app.get('/getCustomers', getCustomers);
app.post('/getCustomerByEmail', getCustomerByEmail);
app.get('/fakeProductgenerator', fakeProductgenerator);
app.post('/countryName', countryName);
app.delete('/deleteOneProduct/:id', deleteOneProduct);
app.put('/updateOneProduct/:id', updateOneProduct);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is working on http://${HOST}:${PORT}`);
});
