import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../../components/shared/shared.styled";
import { SelectedJobContext } from "../../../../../contexts/selected-job.context";

const Root = styled(Flex)`
  cursor: pointer;
  padding: 1rem;
  border: 0.6rem solid #fff;
  border-radius: 1rem;
  margin: 0 0.5rem;
  height: 15rem;
  background-color: ${(props) => props.selected && "#fff"};

  @media (min-width: 650px) {
    padding: 2rem;
    margin: 0 2rem;
  }

  > span {
    color: ${(props) => (props.selected ? "var(--blue)" : "#fff")};
  }

  path,
  rect {
    fill: ${(props) => (props.selected ? "var(--blue)" : "#fff")};
  }
`;

const Job = ({ Icon, name }) => {
  const { selectedJob, setSelectedJob } = React.useContext(SelectedJobContext);

  const setCurrentJobAsTheSelectedJob = () => setSelectedJob(name);
  const isSelected = () => selectedJob === name;

  return (
    <Root
      onClick={setCurrentJobAsTheSelectedJob}
      direction="column"
      align="center"
      selected={isSelected()}
    >
      <Icon />
      <span>{name}</span>
    </Root>
  );
};

export default Job;
