import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchFeature = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunc(e.currentTarget.value);
  };

  return (
    <Search
      placeholder="input search text"
      onChange={searchHandler}
      style={{ width: 200 }}
      value={searchTerm}
    />
  );
};

export default SearchFeature;
