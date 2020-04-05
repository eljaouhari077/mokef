import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "antd";
import PropTypes from "prop-types";

import styled from "styled-components";

const ErrorSpan = styled.span`
  color: #e74c3c;
`;

const Root = styled.div`
  margin: 1rem 0;

  > label {
    color: #999;
  }
`;

const SInput = styled(Input)`
  background-color: #f5f5f5;
  border: 0;
`;

const CustomInput = ({ label, name, type }) => {
  return (
    <Root>
      <label htmlFor={name}>{label}</label>
      <Field as={SInput} type={type} name={name} />
      <ErrorMessage name={name} component={ErrorSpan} />
    </Root>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CustomInput;
