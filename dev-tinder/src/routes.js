import express from 'express';

export const app= express();

// app1.use('/demo',(req,res,next)=>{
//     console.log('first demo route handler')
//     next();
//     res.send('hello from first demo route handler')
// },
// (req,res,next)=>{
//     console.log('second demo route handler')
//     next();
// }
// )

app.use('/demo',(req,res,next)=>{
    console.log('first demo route handler')
    next();
    res.send('hello from first demo route handler')
})

app.use('/demo',(req,res,next)=>{
    console.log('first demo route handler')
    next();
    res.send('hello from first demo route handler')
})