import styled from 'styled-components';

import { Input, Button, Form } from 'antd';

const LoginWarp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginForm = styled(Form)`
  max-width: 320px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 20px 0px;
  padding: 32px !important;
  border-radius: 8px;
`;

const LoginFormInput = styled(Input)`
  font-size: 13sp;
`;

const LoginFormForgot = styled.a`
  float: right;
`;

const LoginFormButton = styled(Button)`
  width: 100%;
`;

export {
  LoginWarp,
  LoginForm,
  LoginFormInput,
  LoginFormForgot,
  LoginFormButton,
};
