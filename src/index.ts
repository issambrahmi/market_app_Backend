import express from 'express';
import admin_router from './Routes/V1/Admin/admin_route';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/V1/market/admin' , admin_router);

//app.use('/V2/market/admin' , admin_router);


app.listen(3030 , ()=>{
    console.log('connected successfully');
})