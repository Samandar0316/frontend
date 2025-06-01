import React, { useState, useEffect } from 'react';
import '../UserForm.css';

export default function UserForm({ addUser, editingUser, updateUser, cancelEdit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Iltimos, barcha maydonlarni to‘ldiring');
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, { name, email });
    } else {
      addUser({ name, email });
    }

    setName('');
    setEmail('');
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi qo‘shish'}</h2>
      <input
        type="text"
        placeholder="Ism"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="buttons">
        <button type="submit">{editingUser ? 'Yangilash' : 'Qo‘shish'}</button>
        {editingUser && (
          <button type="button" onClick={cancelEdit} className="cancel-btn">
            Bekor qilish
          </button>
        )}
      </div>
    </form>
  );
}
