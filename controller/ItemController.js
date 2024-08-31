const express = require("express")
const router = express.Router()
const Item = require("../modal/Item")

router.post("/addItem", async (req, res) => {
    try {
        const { itemName, description } = req.body

        const item = new Item({
            itemName: itemName,
            description: description,
        })

        await item.save()
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.get("/getItem", async (req, res) => {
    try{
        const Items = await Item.find();
        res.status(200).send(Items);
    }
    catch (error){
        res.status(500).send(error);
    }
})

router.delete("/deleteItem/:itemId", async (req,res) => {
    try{
        const deleteItem = await Item.findByIdAndDelete(req.params.id)
        if(!deleteItem){
            res.status(500).send("item not found")
        }
       
            res.status(500).send("item deleted")
        
    }
    catch(error){
        res.status(500).send(error.message);
    }
})


router.get("getItemById/:itemId", async (req,res) => {
    try{
        const Items = await Item.findById(req.params.itemId)
        res.status(200).send(Items)
    }
    catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;