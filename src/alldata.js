import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

export default function Alldata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://server-1-5jvf.onrender.com/data").then((item) => {
        setData(item.data);
      });
    };
    fetchData();
  }, []);

  function handleDelete(index) {
    let deleteArray = [...data];
    axios.delete(`https://server-1-5jvf.onrender.com/delete/${deleteArray[index]._id}`);
    alert(`Account ${deleteArray[index].id} deleted from Database`);
    deleteArray.splice(index, 1);
    setData(deleteArray);
  }

  function handleUpdate(index) {
    let updateItem = data[index];
    let newName = prompt("Enter new name:", updateItem.name);
    let newEmail = prompt("Enter new email:", updateItem.email);
    let newAmount = prompt("Enter new balance:", updateItem.amount);
    
    if (newName && newEmail && newAmount) {
      let updatedItem = { ...updateItem, name: newName, email: newEmail, amount: newAmount };
      axios.put(`https://server-1-5jvf.onrender.com/update/${updateItem._id}`, updatedItem)
        .then(() => {
          let updatedData = [...data];
          updatedData[index] = updatedItem;
          setData(updatedData);
          alert("Account updated successfully");
        })
        .catch(err => console.error("Update failed", err));
    }
  }

  return (
    <>
      <h2>Bank Users Database</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AccountNo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.amount}</td>
              <td>
                <Button variant="warning" onClick={() => handleUpdate(index)}>Update</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
