import React from "react";
import { Input, Select, Button } from "antd";
import { jobs } from "../../../data/jobs";
import { cities } from "../../../data/cities";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const InputGroup = styled(Input.Group)`
  width: 70rem;
`;

const Search = ({ history }) => {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("Electricien");
  const [city, setCity] = React.useState("Casablanca");

  const handleClick = () =>
    history.push(`/search?query=${query}&cat=${category}&city=${city}`);

  return (
    <>
      <InputGroup>
        <Input
          size="large"
          style={{ width: "50%" }}
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
        <Select
          size="large"
          defaultValue={cities[0]}
          style={{ width: "20%" }}
          onChange={(e) => setCity(e)}
        >
          {cities.map((city) => (
            <Select.Option value={city} key={city}>
              {city}
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
