import React from "react";
import { Input, Select, Button } from "antd";
import { jobs } from "../../../data/jobs";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const InputGroup = styled(Input.Group)`
  width: 70rem;
`;

const Search = ({ history }) => {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("Electricien");

  const handleClick = () =>
    history.push(`/search?query=${query}&cat=${category}`);

  return (
    <>
      <InputGroup>
        <Input
          size="large"
          style={{ width: "60%" }}
          placeholder="ex: Youness"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Select
          size="large"
          defaultValue={jobs[0].name}
          style={{ width: "20%" }}
          onChange={(e) => setCategory(e)}
        >
          {jobs.map((job) => (
            <Select.Option value={job.name} key={job.name}>
              {job.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          onClick={handleClick}
          disabled={!query.length}
          size="large"
          type="primary"
        >
          <SearchOutlined />
        </Button>
      </InputGroup>
    </>
  );
};

export default withRouter(Search);
