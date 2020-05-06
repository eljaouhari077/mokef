import React from "react";
import { Input, InputNumber } from "antd";

const MinMax = ({ title, min, max }) => {
  return (
    <div>
      <span style={{ color: "#fff" }}>{title}</span>
      <Input.Group>
        <InputNumber defaultValue={0} min={min} />
        <InputNumber defaultValue={10000} max={max} />
      </Input.Group>
    </div>
  );
};

export default MinMax;
