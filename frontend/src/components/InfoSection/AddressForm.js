import React from "react";
import "../../styles/AddressSection.css";

const AddressForm = ({
  newAddress,
  setNewAddress,
  message,
  handleAddAddressDone,
  handleCancel,
  studentId,
}) => {
  return (
    <div className="details-section">
      <h3>Add New Address</h3>
      {/* Text area for entering a new address */}
      <textarea
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        placeholder="Enter new address"
      />
      <div className="buttons">
        {/* Button to submit the new address */}
        <button onClick={() => handleAddAddressDone(studentId, newAddress)}>
          Done
        </button>
        {/* Button to cancel the address addition */}
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddressForm;
