// Using Express
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require('cors')

// Middleware
app.use(express.json());
app.use(cors())

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/mernApp')
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    });

// Creating schema
const todoSchema = new mongoose.Schema({
    title: {
        required:true,
        type : String
    },
    description: String
});

// Creating model
const todoModel = mongoose.model('Todo', todoSchema);

// POST: Create a new todo
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;

    

    try {
        const newTodo = new todoModel({ title, description });
        await newTodo.save();
        res.status(201).json({success:true,todo:newTodo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

});

// GET: Default route
app.get('/', (req, res) => {
    res.send("Hello world");
});

// GET: All todos from DB
app.get('/todos', async (req, res) => {
    try {
       const Alltodos= await todoModel.find()
       res.json(Alltodos);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
}});


// Update a todo item
app.put('/todos/:id',async(req,res)=>{
     try{
        const { title, description } = req.body;
      const id = req.params.id
      const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        {title, description},
        {new : true}
      )

      if(!updatedTodo){
        return res.status(404).json({message:'Todo not found'})
      }
      res.json(updatedTodo)
     }
     catch (error){
           console.log(error)
        res.status(500).json({message:error.message})
     }
})

// Delete a tod item 
app.delete('/todos/:id',async(req,res)=>{
    try{
        const id = req.params.id;
    await todoModel.findByIdAndDelete(id)
    res.status(204).end()

    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
  
});
