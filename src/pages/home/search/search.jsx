import React from "react";
import { Input, Select, Button } from "antd";
import { jobs } from "../../../data/jobs";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const InputGroup = styled(Input.Group)`
  width: 70rem;
`;

const Search = () => {
  return (
    <>
      <InputGroup>
        <Input
          size="large"
          style={{ width: "60%" }}
          placeholder="ex: Youness"
        />
        <Select
          size="large"
          defaultValue={jobs[0].name}
          style={{ width: "20%" }}
        >
          {jobs.map((job) => (
            <Select.Option value={job.name} key={job.name}>
              {job.name}
            </Select.Option>
          ))}
        </Select>
        <Button size="large" type="primary">
          <SearchOutlined />
        </Button>
      </InputGroup>
    </>
  );
};

export default Search;
