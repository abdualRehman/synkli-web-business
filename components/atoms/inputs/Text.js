import React from "react";

export const Text = ({
  atChange,
  placeholder,
  isRequired,
  length,
  value,
  name,
}) => {
  return (
    <div className="add-ann-form">
      <input
        type="text"
        onChange={(e) => atChange(e)}
        placeholder={placeholder}
        required={isRequired ? true : false}
        minLength={length}
        value={value}
        name={name}
      />
    </div>
  );
};
