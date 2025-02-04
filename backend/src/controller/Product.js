const {Router} = require('express');
const productrouter = Router();

productrouter.get('/',(req,res)=>{
    res.send("Product route")
})

productrouter.post('/',productupload('files'),(req,res)=>{
    const(name,description,category,tags,price,stock,email,images)=req.body;
    const images = req.files.map(file => file.path);
    try{
        const seller=await Productmodel.findOne({email:email});
        if(seller){
            return res.status(400).json({message:"Seller not found"});
        }

        if(images.length==0){
            return res.status(400).json({message:"Please upload atleast one image"});          
        }

        await Productmodel.create({
            name:name,
            description:description,
            category:category,
            tags:tags,
            price:price,
            stock:stock,
            email:email,
            images:images
        })

        res.status(200).json({message:"Product created successfully",product:newproduct});
    }
    catch(error){
        console.error(error);
    })

