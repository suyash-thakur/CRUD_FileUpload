import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 9000;

const connection_url = 'mongodb+srv://Admin:passwordAdminTikTok@cluster0.ddzlm.mongodb.net/tiktokClone?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log("Connected to database!");
}).catch(() => { 
    console.log("Connection failed!");
});
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => { 
    res.render('index');
});

app.listen(port, () => console.log(`Listening on localhost: ${port}`));