import React from "react";
import Job from "./job/job.jobs";
import { jobs } from "../../../../data/jobs";
import styled from "styled-components";
import { Flex } from "../../../../components/shared/shared.styled";

const Root = styled(Flex)`
  width: 100%;
  overflow-x: auto;

  @media (min-width: 650px) {
    justify-content: center;
  }
`;

const Jobs = () => {
  const displayJobs = () =>
    jobs.map((job) => <Job Icon={job.Icon} name={job.name} key={job.name} />);

  return <Root align="center">{displayJobs()}</Root>;
};

export default Jobs;
