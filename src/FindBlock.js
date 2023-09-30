import React from "react";

function FindBlock({ searchValue, onSearchChange }) {
  const handleClick = () => {  
    onSearchChange(""); 
  };

  return (
    <form className="find_item">
      <img src="/find.png" alt="Find Icon" />
      <input
        className="produqtis_dasaxeleba"
        type="text"
        placeholder="მომხმარებლის დასახელება"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div
        className="find_close"
        onClick={handleClick}
      >
        close
      </div>
    </form>
  );
}

export default FindBlock;
