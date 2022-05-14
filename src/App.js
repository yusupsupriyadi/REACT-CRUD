import "./App.css";
import List from "./List";

function App() {
  return (
    <div className="App">
      <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold">My Contact List</h1>
        <form className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input type="text" className="form-control" name="name" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">No. Telp</label>
            <input type="text" className="form-control" name="telp" />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 350 }}>
        <List />
      </div>
    </div>
  );
}

export default App;
