import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

const RadioBox = (props) => {
  const [check, setCheck] = useState(0);

  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (e) => {
    setCheck(e.target.value);
    props.handleFilters(e.target.value);
  };

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Price">
        <Radio.Group onChange={handleChange} value={check}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};

export default RadioBox;
