import React, { useEffect, useState } from "react";
import "./manageusers.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("user");
  const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/all-users");
        setUsers(res.data.users);
      } catch (error) {
        //console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8080/api/v1/user/role/${id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map((user) => (user._id === id ? { ...user, role: newRole } : user)));
      toast.success("Role updated successfully");
      setEditingUserId(null);
    } catch (error) {
      toast.error("Failed to update role");
  
      //console.error("Failed to update role", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/v1/user/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
      //console.error("Failed to delete user", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

   // Calculate total pages
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

   // Get current items based on currentPage
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handler for page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="users-section-container">
      <h2 className="usersection-title">Manage Users</h2>
      <input
        type="text"
        className="usersearch-bar"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ backgroundColor: "var(--section-color)", color: "var(--label-color)" }}
      />

      <table className="users-table">
        <thead className="users-table-header">
          <tr>
            <th className="users-table-heading">Name</th>
            <th className="users-table-heading">Email</th>
            <th className="users-table-heading">Role</th>
            <th className="users-table-heading">Blogging from</th>
            <th className="users-table-heading userpage-action">Actions</th>
          </tr>
        </thead>
        <tbody className="users-table-body">
          {currentItems.map((user) => (
            <tr key={user._id} className="users-table-row">
              <td className="users-table-data">{user.username}</td>
              <td className="users-table-data">{user.email}</td>
              <td className="users-table-data">
                {editingUserId === user._id ? (
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="edit-role-dropdown"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="users-table-data">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="users-table-actions">
                {editingUserId === user._id ? (
                  <>
                    <button className="useredit-modal-update-btn" onClick={() => handleRoleChange(user._id)}>
                      Save
                    </button>
                    <button className="useredit-modal-cancel-btn" onClick={() => setEditingUserId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="useredit-btn2"
                      onClick={() => {
                        setEditingUserId(user._id);
                        setNewRole(user.role);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button className="userdelete-btn2" onClick={() => handleDeleteUser(user._id)}>
                      <MdDelete />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
        {/* Simple pagination below */}
      <div className="userpagination">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index + 1}
            className={`userpage-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
