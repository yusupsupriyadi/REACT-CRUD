import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Mengambil data API
    axios.get("http://localhost:3000/contacts").then((response) => {
      setContacts(response?.data ?? []);
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  const [isUpdate, setIsUpdate] = useState({
    id: null,
    status: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...contacts];

    if (formData.name === "" || formData.telp === "") {
      return false;
    }

    if (isUpdate.status === true) {
      // Update Contact
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      });

      axios
        .put(`http://localhost:3000/contacts/${isUpdate.id}`, {
          name: formData.name,
          telp: formData.telp,
        })
        .then((response) => {
          alert("Data berhasil diupdate");
        });
    } else {
      // Create contact
      let newData = {
        id: uid(),
        name: formData.name,
        telp: formData.telp,
      };
      data.push(newData);
      axios.post("http://localhost:3000/contacts", newData).then((response) => {
        alert("Data berhasil ditambahkan");
      });
    }

    setContacts(data);
    setFormData({
      name: "",
      telp: "",
    });
    setIsUpdate({
      id: null,
      status: false,
    });
  }

  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);

    setFormData({
      name: foundData.name,
      telp: foundData.telp,
    });

    setIsUpdate({
      id: id,
      status: true,
    });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id !== id);

    axios.delete(`http://localhost:3000/contacts/${id}`).then((response) => {
      alert("Data berhasil dihapus");
    });
    setContacts(filteredData);
  }
  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            name="name"
            value={formData.name}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            name="telp"
            value={formData.telp}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={contacts}
      />
    </div>
  );
}

export default App;
