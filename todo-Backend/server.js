// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug check
console.log("Mongo URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ DB connected');
})
.catch((err) => {
    console.log('❌ DB connection error:', err.message);
});

// ================= SCHEMA & MODEL =================
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
});

const Todo = mongoose.model('Todo', todoSchema);

// ================= ROUTES =================

// Root test route
app.get('/', (req, res) => {
    res.send("Hello world 🌍");
});

// POST: Create todo
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = new Todo({ title, description });
        await newTodo.save();
        res.status(201).json({ success: true, todo: newTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET: All todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await Todo.find();
        res.json(allTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ success: true, message: "Todo deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
