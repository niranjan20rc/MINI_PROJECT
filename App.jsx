// import React, { Component } from "react";
// import Typewriter from "./Typewriter";
// import * as XLSX from "xlsx";
// import "./App.css";

// class Apps extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       role: "admin", // "admin" 
//       newColumn: "",
//     };
//   }

//   componentDidMount() {
//     const storedData = localStorage.getItem("excelData");
//     if (storedData) {
//       this.setState({ data: JSON.parse(storedData) });
//     } else {
//       const defaultData = Array.from({ length: 10 }, (_, i) => ({
//         id: i + 1,
//         Name: "",
//         Age: "",
//         Country: "",
//       }));
//       this.setState({ data: defaultData }, this.saveToLocalStorage);
//     }
//   }

//   saveToLocalStorage = () => {
//     localStorage.setItem("excelData", JSON.stringify(this.state.data));
//   };

//   handleFieldChange = (rowIndex, field, value) => {
//     const updated = [...this.state.data];
//     updated[rowIndex][field] = value;
//     this.setState({ data: updated }, this.saveToLocalStorage);
//   };

//   isEditable = (field) => {
//     return field !== "id";
//   };

//   handleExport = () => {
//     const { data } = this.state;
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([buffer], { type: "application/octet-stream" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "assigned_data.xlsx");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   handleRoleChange = (e) => {
//     this.setState({ role: e.target.value });
//   };

//   handleAddColumn = () => {
//     const { newColumn, data } = this.state;
//     if (!newColumn.trim()) return;
//     const updated = data.map((row) => ({ ...row, [newColumn]: "" }));
//     this.setState({ data: updated, newColumn: "" }, this.saveToLocalStorage);
//   };

//   handleDeleteColumn = (field) => {
//     if (field === "id") return;
//     const updated = this.state.data.map((row) => {
//       const newRow = { ...row };
//       delete newRow[field];
//       return newRow;
//     });
//     this.setState({ data: updated }, this.saveToLocalStorage);
//   };

//   render() {
//     const { data, role, newColumn } = this.state;
//     const headers = data.length > 0 ? Object.keys(data[0]) : [];

//     const filteredData =
//       role === "admin"
//         ? data
//         : data.filter((row) => row.id.toString() === role);

//     return (
//       <div className="container">
//         <h2 className="tp"><Typewriter/></h2>
//         {/* <Typewriter/> */}

//         <label>Select Role:&nbsp;</label>



        
//         { <select value={role} onChange={this.handleRoleChange}>
//           <option value="admin">Admin</option>
//           {data.map((user) => (
//             <option key={user.id} value={user.id.toString()}>
//               User {user.id}
//             </option>
//           ))}
//         // </select> }

//         <br />
//         <br />

//         <table>
//           <thead>
//             <tr>
//               {headers.map((field) => (
//                 <th key={field}>
//                   {field}
//                   {role === "admin" && field !== "id" && (
//                     <>
//                       <br />
//                       <button  className="btn" onClick={() => this.handleDeleteColumn(field)}>
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row, rowIndex) => (
//               <tr key={row.id}>
//                 {headers.map((field) => (
//                   <td key={field}>
//                     {this.isEditable(field) ? (
//                       <input
//                         type="text"
//                         value={row[field] || ""}
//                         onChange={(e) =>
//                           this.handleFieldChange(
//                             this.state.data.findIndex((r) => r.id === row.id),
//                             field,
//                             e.target.value
//                           )
//                         }
//                       />
//                     ) : (
//                       row[field]
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <br />
//         {role === "admin" && (
//           <>
//             <div style={{ marginBottom: 10 }}>
//               <input
//                 type="text"
//                 placeholder="New Column Name"
//                 value={newColumn}
//                 onChange={(e) =>
//                   this.setState({ newColumn: e.target.value })
//                 }
//               />
//               <button onClick={this.handleAddColumn}>Add Column</button>
//             </div>

//             <button
//               onClick={this.handleExport}
//               style={{ padding: "10px 20px" }}
//             >
//               Export to Excel
//             </button>
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default Apps;



import React, { Component } from "react";
import Typewriter from "./Typewriter";
import * as XLSX from "xlsx";
import "./App.css";

class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      role: "admin", // "admin" or user ID
      newColumn: "",
    };
  }

  componentDidMount() {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      this.setState({ data: JSON.parse(storedData) });
    } else {
      const defaultData = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        Name: "",
        Age: "",
        Country: "",
      }));
      this.setState({ data: defaultData }, this.saveToLocalStorage);
    }
  }

  saveToLocalStorage = () => {
    localStorage.setItem("excelData", JSON.stringify(this.state.data));
  };

  clearLocalStorage = () => {
    localStorage.removeItem("excelData");
    this.setState({ data: [] });
  };

  handleFieldChange = (rowIndex, field, value) => {
    const updated = [...this.state.data];
    updated[rowIndex][field] = value;
    this.setState({ data: updated }, this.saveToLocalStorage);
  };

  // Check if the current user (admin or specific user) can edit the field
  isEditable = (rowId, field) => {
    const { role } = this.state;
    if (field === "id") return false;
    return role === "admin" || role === rowId.toString();
  };

  handleExport = () => {
    const { data } = this.state;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "assigned_data.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  handleAddColumn = () => {
    const { newColumn, data } = this.state;
    if (!newColumn.trim()) return;
    const updated = data.map((row) => ({ ...row, [newColumn]: "" }));
    this.setState({ data: updated, newColumn: "" }, this.saveToLocalStorage);
  };

  handleDeleteColumn = (field) => {
    if (field === "id") return;
    const updated = this.state.data.map((row) => {
      const newRow = { ...row };
      delete newRow[field];
      return newRow;
    });
    this.setState({ data: updated }, this.saveToLocalStorage);
  };

  // Add new user with the smallest available positive ID
  handleAddUser = () => {
    const { data } = this.state;
    
    // Find smallest missing positive integer ID starting from 1
    const existingIds = new Set(data.map((d) => d.id));
    let newId = 1;
    while (existingIds.has(newId)) {
      newId++;
    }

    const newUser = { id: newId };
    const fields = data[0] ? Object.keys(data[0]) : [];

    fields.forEach(field => {
      if (field !== "id") {
        newUser[field] = "";
      }
    });

    const updated = [...data, newUser];
    this.setState({ data: updated }, this.saveToLocalStorage);
  };

  render() {
    const { data, role, newColumn } = this.state;
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    // Filter data for admin or user-specific role
    const filteredData =
      role === "admin"
        ? data
        : data.filter((row) => row.id.toString() === role);

    return (
      <div className="container">
        <h2 className="tp"><Typewriter /></h2>

        <label>Select Role:&nbsp;</label>
        <select value={role} onChange={this.handleRoleChange}>
          <option value="admin">Admin</option>
          {data.map((user) => (
            <option key={user.id} value={user.id.toString()}>
              User {user.id}
            </option>
          ))}
        </select>

        <br /><br />

        <table>
          <thead>
            <tr>
              {headers.map((field) => (
                <th key={field}>
                  {field}
                  {role === "admin" && field !== "id" && (
                    <>
                      <br />
                      <button
                        className="btn"
                        onClick={() => this.handleDeleteColumn(field)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={row.id}>
                {headers.map((field) => (
                  <td key={field}>
                    {this.isEditable(row.id, field) ? (
                      <input
                        type="text"
                        value={row[field] || ""}
                        onChange={(e) =>
                          this.handleFieldChange(
                            this.state.data.findIndex((r) => r.id === row.id),
                            field,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      row[field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        {role === "admin" && (
          <>
            <div style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="New Column Name"
                value={newColumn}
                onChange={(e) =>
                  this.setState({ newColumn: e.target.value })
                }
              />
              <button onClick={this.handleAddColumn}>Add Column</button>
            </div>

            <div style={{ marginBottom: 10 }}>
              <button onClick={this.handleAddUser}>Add User</button>
            </div>

            <button
              onClick={this.handleExport}
              style={{ padding: "10px 20px" }}
            >
              Export to Excel
            </button>

            {/* Clear Local Storage Button for Admin */}
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={this.clearLocalStorage}
                style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}
              >
                Clear Form
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Apps;

