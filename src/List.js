import React from "react";

export default function List({ data, handleEdit, handleDelete }) {
  let key = 1;
  return (
    <div className="list-group">
      {data.map((contact) => {
        return (
          <div className="list-group-item list-group-item-action" key={contact.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{key++}. {contact.name}
              </h5>
              <div>
                <button onClick={() => handleEdit(contact.id)} className="btn btn-sm btn-link">Edit</button>
                <button onClick={() => handleDelete(contact.id)} className="btn btn-sm btn-link">Del</button>
              </div>
            </div>
            <p className="mb-1">Telp: {contact.telp}</p>
          </div>
        );
      })}
    </div>
  );
}
