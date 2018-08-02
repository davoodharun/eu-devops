import * as React from "react";
import { Layout, Row, Col, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./Header.less";
import axios from 'axios';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Layout.Header style={{ background: "#fff", padding: 0 }}>
            <Row type="flex" justify="end" align="middle">
                <Col span={3}>
                    <Menu mode="horizontal" className="user-logout">
                        <Menu.SubMenu title={<span><Icon type="user" />{"User 1"}</span>} >
                            <Menu.Item key="logOut"><a href="https://app.vssps.visualstudio.com/oauth2/authorize?client_id=A30D46D0-3F2C-4415-B9C9-082099AC137A&response_type=Assertion&state=User1&scope=vso.build%20vso.code%20vso.dashboards%20vso.extension%20vso.extension.data%20vso.gallery%20vso.graph%20vso.identity%20vso.loadtest%20vso.machinegroup_manage%20vso.notification_diagnostics%20vso.packaging%20vso.profile_write%20vso.project%20vso.release%20vso.serviceendpoint%20vso.symbols%20vso.taskgroups_read%20vso.test%20vso.wiki%20vso.work_write&redirect_uri=https://eu-devops.azurewebsites.net/api/auth/callback" >Logout</a></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Col>
            </Row>
        </Layout.Header>
    );
};


