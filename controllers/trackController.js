const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ADDRESS = '127.0.0.1';
const PORT = `mongodb://${ADDRESS}:27017/njmusicstore` || process.env.PORT;

mongoose.connect(
    PORT,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);

/*Replace the above connection string with the actual connection string of your MongoDB database*/
const trackSchema= new mongoose.Schema({    
    trackName: {
        type: String,
        unique: true
    },
    artistName: String,
    albumName: String,
    albumYear: String,
    albumGenre: String,  
    trackPrice: String
 });

const userCartSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    trackId: String,
    trackName: String,
    quantity: String,
    unitPrice: String
});

const Track = mongoose.model('Track', trackSchema);
const CartItem = mongoose.model('userCart', userCartSchema);

const trackTest = new Track({
    trackName: 'Track name name test',
    artistName: 'Artist name name test',
    albumName: 'Album name test',
    albumYear: 'Year name test',
    albumGenre: 'Album genre test',  
    trackPrice: 'Track price test'
});

const cartItemTest = new CartItem({
    username: 'User name test',
    trackId: 'Track id test',
    trackName: 'Track name test',
    quantity: 'Quantity test',
    unitPrice: 'Price test'
});

trackTest
.save()
.catch((e) => console.log('Track already exists!'))

cartItemTest
.save()
.catch((e) => console.log('Item already exists!'))

const urlencodedParser=bodyParser.urlencoded({extended:false});

const trackController= (app) => {      
    app.get('/track', (req,res) =>
        Track.find(
            {},
            (err,data) => {
             if(err) throw err;

                return !!req.query.username
                ? res.render('track-list',{tracks: data,title: 'Product List', username:req.query.username})
                : res.render('track-list',{tracks: data,title: 'Product List', username:''});
            })
    );

    app.get('/track-list', (req,res) =>
        Track.find(
            {},
            (err,data) => {
                 if(err) throw err;

                 return !!req.query.username
                ? res.render('track-list',{tracks: data,title: 'Product List', username:req.query.username})
                : res.render('track-list',{tracks: data,title: 'Product List', username:''});
            })
     );

     app.get(
        '/track-add',
        (req,res) => 
            Track.find(
            {},
            (err,data) => {
                if(err) throw err;

                return !!req.query.username
                ? res.render('track-add',{tracks: data,title: 'Add Track', username:req.query.username})
                : res.render('track-add',{tracks: data,title: 'Add Track', username:''});
            })
     );

    app.delete(
        '/track/:_id',
        (req,res) =>
            Track
            .find({_id: req.params._id})
            .remove( (err,data) => {                  
                if(err) throw err;
            
                return !!req.query.username
                ? res.render('track-add',{tracks: data,title: 'Add Track', username:req.query.username})
                : res.render('track-add',{tracks: data,title: 'Add Track', username:''});
            })
    );

    app.post(
        '/track-add',
        urlencodedParser, 
        (req,res) => 
            Track(req.body)
            .save((err,data) => {
                if(err) throw err;

                return !!req.query.username
                ? res.render('track-add',{tracks:data, title:'Track', username:req.query.username})
                : res.render('track-add',{tracks:data, title:'Track', username:''});
            }) 
    );

    app.post(
        '/cart',
        urlencodedParser,
        (req,res) =>
            CartItem(req.body)
            .save( (err,data) => {
                if(err) throw err;

                return !!req.query.username
                ? res.render('cart',{cartItems:data, title:'Shopping Cart', username:req.query.username})
                : res.render('cart',{cartItems:data, title:'Shopping Cart', username:''});
            })
    );

    app.get(
        '/cart',
        (req,res) =>
            CartItem
            .find(
                {username: req.query.username},
                (err,data) => {
                    if(err) throw err;

                    return !!req.query.username
                    ? res.render('cart',{cartItems:data, title:'Shopping Cart', username:req.query.username})
                    : res.render('cart',{cartItems:data, title:'Shopping Cart', username:''});
            })
    );

    app.delete(
        '/cart/:_id',
        (req,res) => 
            CartItem
            .find({_id: req.params._id})
            .remove(
                (err,data) => {                  
                    if(err) throw err;

                    return !!req.query.username
                    ? res.render('cart',{cartItems:data, title:'Shopping Cart', username:req.query.username})
                    : res.render('cart',{cartItems:data, title:'Shopping Cart', username:''});
            })
    );
};

module.exports = {
    trackController
  };
