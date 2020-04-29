import React from "react";
import { Field } from "formik";
import { Select } from "antd";
import PropTypes from "prop-types";

import styled from "styled-components";

const Root = styled.div`
  margin: 1rem 0;

  > label {
    color: #999;
  }
`;

const SSelect = styled(Select)`
  width: 100%;
  > div {
    background-color: var(--bg-color) !important;
  }
`;

const CustomSelect = ({ name, children, label, ...props }) => {
  return (
    <Root>
      <label htmlFor={name}>{label}</label>
      <Field {...props} as={SSelect} name={name}>
        {children}
      </Field>
    </Root>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default CustomSelect;
