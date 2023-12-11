import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Table = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://ec2-52-66-251-140.ap-south-1.compute.amazonaws.com:8080/ems/getall");

      if (!response.ok) {
        throw new Error("Network response not OK");
      }

      const result = await response.json();

      if (result.data.length === 0) {
        setData([]);
      } else {
        setData(result.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (employeeId) => {
    try {
      const response = await fetch(`https://ec2-52-66-251-140.ap-south-1.compute.amazonaws.com:8080/ems/delete/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Network response not OK");
      }

      fetchData();
      alert("Data deleted successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center py-10 text-sm">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data.length >= 0 && (
        <table className="table-auto border-collapse border border-slate-500 divide-gray-400">
          <thead>
            <tr>
            
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Employee ID</th>
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Name</th>
          <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Gender</th>
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Email</th>
            
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Phone No</th>
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Department</th>
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Position</th>
            <th className="px-6 py-3 uppercase border border-slate-500 bg-slate-200">Action</th>
            </tr>
          </thead>
          
          <tbody>

            {data.map(item => (

              <tr key={item.employeeId}>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.employeeId}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.name}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.gender}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.email}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.phone_number}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.employee_dept}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">{item.employee_position}</td>
                <td className="px-6 py-3 border border-slate-500 text-center">
                  <Link to="/change" state={{ isEdit: true, employeeId: item.employeeId }}>
                    <button className="px-4 py-1 rounded-3xl bg-sky-500 text-white font-bold shadow-2xl mr-4">Edit</button>
                  </Link>
                  <button
                    className="px-4 py-1 rounded-3xl bg-red-500 text-white font-bold shadow-2xl"
                    onClick={() => deleteData(item.employeeId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
