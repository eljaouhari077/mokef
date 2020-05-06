import React from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import { jobs } from "../../../data/jobs";
import Criteria from "./criteria/criteria";

const Root = styled.div`
  background-color: var(--dark-blue);
  padding: 2rem 0;
  > div {
    width: 90vw;
    margin: 0 auto;
  }
`;

const SearchForm = () => {
  const [isFiltering, setIsFiltering] = React.useState(false);

  return (
    <Root>
      <div>
        <Input.Group>
          <Input
            style={{ width: "65%" }}
            onChange={(e) => console.log(e.target.value)}
            placeholder="ex: Youness"
          />
          <Select
            defaultValue={jobs[0]}
            style={{ width: "35%" }}
            onChange={(e) => console.log(e)}
          >
            {jobs.map((job) => (
              <Select.Option value={job} key={job}>
                {job}
              </Select.Option>
            ))}
          </Select>
        </Input.Group>
        <span
          onClick={() => setIsFiltering(!isFiltering)}
          style={{ color: "#fff" }}
        >
          {isFiltering ? "Enlever Filtre" : "Filtrer"}
        </span>
        {isFiltering && <Criteria />}
      </div>
    </Root>
  );
};

export default SearchForm;
