import styled from 'styled-components';

import { Input, Button } from 'antd';

const LoginWarp = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 320px;
  height: 320px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
`;

const LoginLogo = styled.div`
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLogoImage = styled.img`
  width: 40px;
  margin-right: 8px;
`;

const LoginLogoSpan = styled.span`
  vertical-align: text-bottom;
  font-size: 16px;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 700;
`;

const LoginFormInput = styled(Input)`
  font-size: 13sp;
`;

const LoginFormButton = styled(Button)`
  width: 100%;
`;

const LoginGuest = styled.p`
  color: #cccccc;
  text-align: center;
  margin-top: 16px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

export {
  LoginWarp,
  LoginLogo,
  LoginLogoImage,
  LoginLogoSpan,
  LoginFormInput,
  LoginFormButton,
  LoginGuest,
};
