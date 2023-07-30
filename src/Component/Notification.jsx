 import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
 export const Notify =()=>{
    const addItem = () => toast("Item added successfully");

    return (
      <div>
        <button onClick={addItem}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }