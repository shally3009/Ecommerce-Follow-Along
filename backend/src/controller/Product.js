const {Router} = require('express');
const Productmodel = require('../Model/ProductModel');
const productrouter = Router();
 productrouter.get("/get-product",async (req,res)=>{
    try{
        const productfind=await Productmodel.find();
        const productimages = productfind.map((product)=>{
            return{
                name:product.name,
                description:product.description,
                category:product.category,
                tags:product.tags,
                price:product.price,
                email:product.email,
                stock:product.stock,
                images:product.images,

            }
        });
        res.status(200).json({products:products});
    }
    catch(err){
        console.log(err)
    }
    })
    productrouter.post("/post-product", productupload.array('files'), async (req, res) => {
        const { name, price, description, category, tags, stock, email } = req.body;
        const images = req.files.map(file => file.path);
        try{
            const seller = await Productmodel.findOne({email:email});
            if(!seller){
                return res.status(400).json({message:"Seller not found"});
            }
            if(images.length === 0){
                return res.status(400).json({message:"Please upload atleast one images"});
            }
            await Productmodel.create({
                name: name,
                price:price,
                description: description,
                category: category,
                tags:tags,
                stock: stock,
                email:email,
                images: images,
            });
            res.status(200).json({message:"Product created successfully",product:newProduct});
        }
        catch(err){
            console.log(err);
        }
    })

    module.exports = productrouter;