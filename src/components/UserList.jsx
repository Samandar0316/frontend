import React from 'react';
import '../UserList.css';

export default function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) return <p>Foydalanuvchilar topilmadi.</p>;

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ism</th>
          <th>Email</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <button onClick={() => onEdit({ id, name, email })}>Tahrirlash</button>
              <button onClick={() => onDelete(id)} className="delete-btn">O'chirish</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
