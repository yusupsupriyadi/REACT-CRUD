import "./App.css";
import List from "./List";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      telp: "08123456789",
    },
    {
      id: 2,
      name: "Kevin",
      telp: "08987654321",
    },
    {
      id: 3,
      name: "Jojon Haw",
      telp: "08123456789",
    },
  ]);

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
    } else {
      // Create contact
      data.push({
        id: uid(),
        name: formData.name,
        telp: formData.telp,
      });
    }

    setContacts(data);
    setFormData({
      name: "",
      telp: "",
    })
    setIsUpdate({
      id: null,
      status: false,
    })
  }

  function handleEdit(id) { 
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);

    setFormData({
      name: foundData.name,
      telp: foundData.telp,
    })

    setIsUpdate({
      id: id,
      status: true,
    })
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id !== id);
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

      <List handleEdit={handleEdit} handleDelete={handleDelete} data={contacts} />
    </div>
  );
}

export default App;
