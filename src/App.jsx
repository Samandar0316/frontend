import React, { useState, useEffect } from "react";
import "./App.css"; // Optional: Add global styles if needed
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://backend1-pif1.onrender.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      alert("Foydalanuvchilarni olishda xatolik");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async ({ name, email }) => {
    try {
      const res = await fetch("https://backend1-pif1.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Xatolik yuz berdi");
        return;
      }
      const newUser = await res.json();
      setUsers([...users, newUser]);
    } catch (error) {
      alert("Server bilan bog‘lanishda xatolik");
    }
  };

  // Update user
  const updateUser = async (id, { name, email }) => {
    try {
      const res = await fetch(`https://backend1-pif1.onrender.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Xatolik yuz berdi");
        return;
      }
      const updatedUser = await res.json();
      setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
      setEditingUser(null);
    } catch (error) {
      alert("Server bilan bog‘lanishda xatolik");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`https://backend1-pif1.onrender.com/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Xatolik yuz berdi");
        return;
      }
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      alert("Server bilan bog‘lanishda xatolik");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", padding: "0 16px" }}>
      <h1 style={{ fontFamily: "'Inter', sans-serif", textAlign: "center", color: "#1f2937" }}>
        User Management
      </h1>
      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
        cancelEdit={cancelEdit}
      />
      {/* <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} /> */}
    </div>
  );
}

export default App;