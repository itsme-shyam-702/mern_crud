import { useState, useEffect } from "react";

export default function TodoApp() {
  const apiurl = "https://mern-crud-backend-v3of.onrender.com";
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editID, setEditID] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // FETCH (Read)
  const getItems = () => {
    fetch(apiurl + "/todos")
      .then(res => res.json())
      .then(setTodos)
      .catch(() => setError("Unable to fetch todos"));
  };

  useEffect(() => { getItems(); }, []);

  // CREATE
  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setError("Fill both fields");
      return;
    }
    setError("");
    fetch(apiurl + "/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    })
      .then(res => res.json())
      .then(data => {
        setTodos([...todos, data.todo]);
        setTitle("");
        setDescription("");
        setMessage("Item added successfully");
        setTimeout(() => setMessage(""), 2000);
      });
  };

  // UPDATE
  const handleUpdate = () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Fill both fields");
      return;
    }
    setError("");
    fetch(`${apiurl}/todos/${editID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDescription })
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(todos.map(t => t._id === editID ? updated : t));
        setEditID(null);
        setEditTitle("");
        setEditDescription("");
        setMessage("Item updated successfully");
        setTimeout(() => setMessage(""), 2000);
      });
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`${apiurl}/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 md:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-indigo-600 text-2xl md:text-3xl font-bold mb-6 text-center">📋 Todo App</h2>

        {/* Input Form */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Title"  
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Description" 
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button 
            onClick={handleSubmit} 
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todos List */}
        <ul className="space-y-3">
          {todos.map(t => (
            <li key={t._id} className="bg-gray-50 border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between">
              {editID === t._id ? (
                <div className="flex flex-col md:flex-row gap-2 flex-1">
                  <input 
                    value={editTitle} 
                    onChange={e => setEditTitle(e.target.value)} 
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                  />
                  <input 
                    value={editDescription} 
                    onChange={e => setEditDescription(e.target.value)} 
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                  />
                  <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{t.title}</p>
                    <p className="text-gray-600 text-sm">{t.description}</p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button 
                      onClick={() => { setEditID(t._id); setEditTitle(t.title); setEditDescription(t.description); }} 
                      className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(t._id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Messages */}
        {error && <p className="text-red-500 text-sm mt-3 ">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-3 ">{message}</p>}
      </div>
    </div>
  );
}
























// import { useEffect, useState } from "react";

// export default function Todo() {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [todos, setTodos] = useState([]);
//     const [error, setError] = useState("");
//     const [message, setMessage] = useState("");
//     const [editID, setEditID] = useState(null);
//     const [editTitle, setEditTitle] = useState("");
//     const [editDescription, setEditDescription] = useState("");
//     const apiurl = "http://localhost:3000";

//     // Fetch all todos
//     useEffect(() => {
//         getItems();
//     }, []);

//     const getItems = () => {
//         fetch(apiurl + "/todos")
//             .then((res) => res.json())
//             .then((data) => setTodos(data))
//             .catch(() => setError("Unable to fetch todos"));
//     };

//     // Create todo
//     const handleSubmit = () => {
//         setError("");
//         if (title.trim() && description.trim()) {
//             fetch(apiurl + "/todos", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title, description })
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     if (data.success) {
//                         setTodos([...todos, data.todo]);
//                         setMessage("Item added successfully");
//                         setTimeout(() => setMessage(""), 3000);
//                         setTitle("");
//                         setDescription("");
//                     } else {
//                         setError(data.message || "Unable to create todo");
//                     }
//                 })
//                 .catch(() => setError("Network error"));
//         } else {
//             setError("Please fill in both Title and description");
//         }
//     };

//     // Start editing
//     const handleEdit = (item) => {
//         setEditID(item._id);
//         setEditTitle(item.title);
//         setEditDescription(item.description);
//     };

//     // Update todo
//     const handleUpdate = () => {
//         if (editTitle.trim() && editDescription.trim()) {
//             fetch(`${apiurl}/todos/${editID}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title: editTitle, description: editDescription })
//             })
//                 .then((res) => res.json())
//                 .then((updated) => {
//                     setTodos(
//                         todos.map((todo) =>
//                             todo._id === editID ? updated : todo
//                         )
//                     );
//                     setEditID(null);
//                     setEditTitle("");
//                     setEditDescription("");
//                     setMessage("Item updated successfully");
//                     setTimeout(() => setMessage(""), 3000);
//                 })
//                 .catch(() => setError("Unable to update item"));
//         } else {
//             setError("Please fill in both Title and description");
//         }
//     };

//     // Delete todo
//     const handleDelete = (id) => {
//         fetch(`${apiurl}/todos/${id}`, { method: "DELETE" })
//             .then(() => {
//                 setTodos(todos.filter((item) => item._id !== id));
//             })
//             .catch(() => setError("Unable to delete item"));
//     };

//     function handleEditCancel(){
//         setEditID(-1)
//     }

//     return (
//         <div className="container">
//             <div className="row p-3 bg-success text-light mx-4">
//                 <h1>Todo project with MERN stack</h1>
//             </div>

//             {/* Add Todo Form */}
//             <div className="row">
//                 <h3>Add item</h3>
//                 {message && <p className="text-success">{message}</p>}
//                 <div className="form-group d-flex gap-2">
//                     <input
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         type="text"
//                         className="form-control"
//                     />
//                     <input
//                         placeholder="Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         type="text"
//                         className="form-control"
//                     />
//                     <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
//                 </div>
//                 {error && <p className="text-danger">{error}</p>}
//             </div>

//             {/* Todo List */}
//             <div className="row mt-3">
//                 <h4>Todo List</h4>
//                 <ul className="list-group">
//                     {todos.map((item) => (
//                         <li key={item._id} className="list-group-item bg-info d-flex justify-content-between align-items-center p-2 my-2">
//                             <div className="d-flex flex-column">
//                                 {editID === item._id ? (
//                                     <>
//                                         <input
//                                             value={editTitle}
//                                             onChange={(e) => setEditTitle(e.target.value)}
//                                             type="text"
//                                             className="form-control mb-2"
//                                         />
//                                         <input
//                                             value={editDescription}
//                                             onChange={(e) => setEditDescription(e.target.value)}
//                                             type="text"
//                                             className="form-control"
//                                         />
//                                     </>
//                                 ) : (
//                                     <>
//                                         <span className="fw-bold">{item.title}</span>
//                                         <span>{item.description}</span>
//                                     </>
//                                 )}
//                             </div>

//                             <div className="d-flex gap-2">
//                                 {editID === item._id ? (
//                                     <button className="btn btn-success" onClick={handleUpdate}>Update</button>
//                                 ) : (
//                                     <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
//                                 )}
//                                 {editID == -1? <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>:
//                                 <button className="btn btn-danger" onClick={handleEditCancel}> Cancel </button>}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }






// , data.todo
// {todos.map((todo, index) => (
//                         <li key={index}>{todo.title} - {todo.description}</li>
//                     ))}
