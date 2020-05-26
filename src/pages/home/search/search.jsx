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
  const [category, setCategory] = React.useState("Tous");
  const [city, setCity] = React.useState("Tous");

  const handleClick = () => {
    return query.length
      ? history.push(`/search?query=${query}&cat=${category}&city=${city}`)
      : history.push(`/search?cat=${category}&city=${city}`);
  };

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
          defaultValue="Tous"
          style={{ width: "20%" }}
          onChange={(e) => setCategory(e)}
        >
          {jobs.map((job) => (
            <>
              <Select.Option value="Tous">Tous</Select.Option>
              <Select.Option value={job.name} key={job.name}>
                {job.name}
              </Select.Option>
            </>
          ))}
        </Select>
        <Select
          size="large"
          defaultValue="Tous"
          style={{ width: "20%" }}
          onChange={(e) => setCity(e)}
        >
          {cities.map((city) => (
            <>
              <Select.Option value="Tous">Tous</Select.Option>
              <Select.Option value={city} key={city}>
                {city}
              </Select.Option>
            </>
          ))}
        </Select>
        <Button onClick={handleClick} size="large" type="primary">
          <SearchOutlined />
        </Button>
      </InputGroup>
    </>
  );
};

export default withRouter(Search);
