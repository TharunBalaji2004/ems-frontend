import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; 
import { Link, useLocation } from 'react-router-dom';

const Change = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [employee, setEmployee] = useState({
        employeeId: '',
        name: '',
        gender: '',
        dob: '',
        phoneNo: '',
        email: '',
        department: '',
        position: ''
    });

    const [nameError, setNameError] = useState(null);
    const [phoneNumError, setPhoneNumError] = useState(null);

    const location = useLocation();
    const state = location.state; 

    const fetchData = async (employeeId) => {
        try {
            const response = await fetch(`http://ec2-52-66-251-140.ap-south-1.compute.amazonaws.com:8080/ems/get/${employeeId}`);
    
            if (!response.ok) throw new Error("Network response not OK");
    
            const result = await response.json();
    
            console.log(`Employee details obtained: ${JSON.stringify(result.data)}`);
    
            setEmployee({
                employeeId: result.data.employeeId,
                name: result.data.name,
                gender: result.data.gender,
                dob: result.data.dob,
                phoneNo: result.data.phone_number, 
                email: result.data.email,
                department: result.data.employee_dept, 
                position: result.data.employee_position 
            });
    
        } catch (error) {
            setError(error);
        }
    };

    const postData = async (employeeId, employee) => {
        try {
          const response = await fetch(`http://ec2-52-66-251-140.ap-south-1.compute.amazonaws.com:8080/ems/update/${employeeId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('Response data:', data);
        } catch (error) {
          console.error('Error making POST request:', error);
        }
      };

    const addData = async(employee) => {
        try {
            const response = await fetch("http://ec2-52-66-251-140.ap-south-1.compute.amazonaws.com:8080/ems/add", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(employee),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log('Response data:', data);
          } catch (error) {
            console.error('Error making POST request:', error);
          }
    }

    console.log(state);

    if (state.isEdit == null) state.isEdit = false;

    if (state.isEdit) {
        useEffect(() => {
            console.log("Use effect called")
            
            fetchData(parseInt(state.employeeId));
        }, []);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const formValidation = (employee) => {
        let validate = true;

        if (employee.name === "")  {
            setNameError("Name cannot be empty");
            validate = false;
        } else {
            setNameError(null)
        }

        if (employee.phone_number === "") {
            setPhoneNumError("Phone number cannot be empty")
        } else if (employee.phone_number.length < 10) {
            setPhoneNumError("Phone number is invalid")
        }
        else {
            setPhoneNumError(null)
        }

        return validate;
    }   

    const handleSubmit = async(e) => {
        e.preventDefault();

        const currEmployee = {
            "name":employee.name,
            "gender":employee.gender,
            "dob":employee.dob,
            "email":employee.email,
            "phone_number":employee.phoneNo,
            "employee_dept": employee.department,
            "employee_position": employee.position
        }

        const validate = formValidation(currEmployee);

        if (!validate) {
            return;
        }

        const isEmpty = Object.values(currEmployee).some((value) => value.trim() === '');

        if (isEmpty) {
            alert('Please fill in all fields');
            return;
        }

        if (state.isEdit) {
            await postData(state.employeeId, currEmployee)
            alert("Data updated successfully")
        } else {
            await addData(currEmployee)
            alert("Data added successfully")
        }
        
        
        console.log("Submitted:", employee);

        if (!state.isEdit) {
            setEmployee({
                employeeId: '',
                name: '',
                gender: '',
                dob: '',
                phoneNo: '',
                email: '',
                department: '',
                position: ''
            });
        }
    };

    return (
        <>
            <Navbar isVisible={false} />
            <div className="flex justify-center py-20">
                <div className="w-100 bg-gray-200 p-8 rounded-lg shadow-md">
                
                    <h2 className="text-2xl font-bold mb-4">{state && state.isEdit ? "Edit" : "Add"} Employee</h2>
                    
                    <form onSubmit={handleSubmit}>

                        { state.isEdit && (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-600">Employee ID:</label>
                                <input
                                    type="text"
                                    id="employeeId"
                                    name="employeeId"
                                    value={employee.employeeId}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    disabled={true}
                                />
            
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Employee Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                                <span className='text-red-600 text-sm font-bold'>{nameError}</span>
                            </div>
                        </div>
                        )}

                        { !state.isEdit && (
                            <div className='mb-4'>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Employee Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                                <span className='text-red-600 text-sm font-bold'>{nameError}</span>
                            </div>
                        )}
                
                    
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender:</label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    value={employee.gender}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-600">Date of Birth:</label>
                                <input
                                    type="text"
                                    id="dob"
                                    name="dob"
                                    value={employee.dob}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                        </div>

                        {/* 3rd row */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-600">Phone No:</label>
                                <input
                                    type="text"
                                    id="phoneNo"
                                    name="phoneNo"
                                    value={employee.phoneNo}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                        </div>

                        {/* 4th row */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-600">Department:</label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="position" className="block text-sm font-medium text-gray-600">Position:</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={employee.position}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                        </div>

                        <div className='flex flex-row justify-center items-center'>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                                {state && state.isEdit ? "Edit" : "Add"} Employee
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
}

export default Change;
