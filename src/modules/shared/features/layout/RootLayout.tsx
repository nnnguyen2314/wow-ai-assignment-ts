import React, {useEffect, useState} from 'react';
import {Layout, MenuProps, Typography} from 'antd';
import {HomeFilled} from "@ant-design/icons";
import styled from 'styled-components';

const { Header, Content } = Layout;
const { Title } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledLayoutHeader = styled(Header)`
  color: #000;
  background: linear-gradient(90deg, white 0%, #dceaff 100%);
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  height: auto;
  justify-content: space-between;

  .branding {
    display: flex;
    align-items: center;

    .branding-logo {
      display: flex;
      font-size: 50px;
      height: 70px;
      img {
        height: 100%;
        display: block;
      }
      .anticon {
        color: #000;
      }
    }
  }

  .ant-menu-light {
    background: transparent;
    border: none;
  }

  .ant-menu-item-active {
    font-weight: 600;

    &&::after {
      border: none;
    }
  }
`;

const StyledContent = styled(Content)`
  height: auto;
  padding: 0;
  margin: auto;
  min-width: 1280px;
`;

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <StyledLayout>
            <StyledLayoutHeader>
                <div className="branding">
                    <Title level={2}>Wow AI Assignment</Title>
                </div>
            </StyledLayoutHeader>
            <StyledContent>
                {children}
            </StyledContent>
        </StyledLayout>
    );
};

export default RootLayout;