import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      // checked에 없으면
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBoxList = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Continents">{renderCheckBoxList()}</Panel>
    </Collapse>
  );
};

export default CheckBox;
