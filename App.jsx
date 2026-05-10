import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const appRef = useRef(null);

  const [commitments, setCommitments] = useState([
    { item: "Maxis", amount: 550, paid: false },
    { item: "Shopee PL", amount: 127, paid: false }
  ]);

  const [salary, setSalary] = useState(0);

  const addItem = () => {
    setCommitments([...commitments, { item: "New", amount: 0, paid: false }]);
  };

  const updateItem = (i, key, val) => {
    const arr = [...commitments];
    arr[i][key] = val;
    setCommitments(arr);
  };

  const deleteItem = (i) => {
    setCommitments(commitments.filter((_, idx) => idx !== i));
  };

  const saveImage = async () => {
    const canvas = await html2canvas(appRef.current);
    const link = document.createElement("a");
    link.download = "budget.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const total = commitments.reduce((a,b)=> a + Number(b.amount||0),0);

  return (
    <div style={{padding:20}}>
      <button onClick={saveImage}>Save Image</button>

      <div ref={appRef}>
        <h1>Budget App</h1>

        <h2>Salary</h2>
        <input type="number" value={salary} onChange={e=>setSalary(e.target.value)} />

        <h2>Commitments</h2>
        <button onClick={addItem}>Add</button>

        {commitments.map((c,i)=>(
          <div key={i}>
            <input value={c.item} onChange={e=>updateItem(i,"item",e.target.value)} />
            <input type="number" value={c.amount} onChange={e=>updateItem(i,"amount",e.target.value)} />
            <input type="checkbox" checked={c.paid} onChange={e=>updateItem(i,"paid",e.target.checked)} />
            <button onClick={()=>deleteItem(i)}>X</button>
          </div>
        ))}

        <h3>Total: {total}</h3>
      </div>
    </div>
  );
}
