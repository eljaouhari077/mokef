import React from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import { jobs } from "../../../data/jobs";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const Root = styled.div`
  background-color: var(--dark-blue);
  padding: 2rem 0;
  > div {
    width: 90vw;
    margin: 0 auto;

    @media (min-width: 600px) {
      width: 55rem;
    }
  }
`;

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  location,
}) => {
  React.useEffect(() => {
    if (location.search) {
      const parsedQueryString = queryString.parse(location.search);
      if (parsedQueryString.query) {
        setSearchTerm(parsedQueryString.query);
      }
      if (parsedQueryString.cat) {
        setCategory(parsedQueryString.cat);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Root>
      <div>
        <Input.Group>
          <Input
            style={{ width: "65%" }}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ex: Youness"
            value={searchTerm}
          />
          <Select
            value={category}
            style={{ width: "35%" }}
            onChange={(e) => setCategory(e)}
          >
            {jobs.map((job) => (
              <Select.Option value={job.name} key={job.name}>
                {job.name}
              </Select.Option>
            ))}
          </Select>
        </Input.Group>
      </div>
    </Root>
  );
};

export default withRouter(SearchForm);
