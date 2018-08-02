import * as React from "react";
import { Layout, Row, Col, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./Header.less";
import axios from 'axios';

export const Header: React.StatelessComponent<{}> = () => {
    axios.get("http://localhost:8080/api/hello").then(response => console.log(response));
    return (
        <Layout.Header style={{ background: "#fff", padding: 0 }}>
            <Row type="flex" justify="end" align="middle">
                <Col span={3}>
                    <Menu mode="horizontal" className="user-logout">
                        <Menu.SubMenu title={<span><Icon type="user" />{"User 1"}</span>} >
                            <Menu.Item key="logOut"><a href="https://app.vssps.visualstudio.com/oauth2/authorize?client_id=61EBDCEA-ACD9-44C7-A504-B9764322B01A&response_type=Assertion&state=User1&scope=vso.build%20vso.code%20vso.connected_server%20vso.dashboards%20vso.entitlements%20vso.extension%20vso.extension.data%20vso.gallery%20vso.graph%20vso.loadtest%20vso.machinegroup_manage%20vso.memberentitlementmanagement%20vso.notification_diagnostics%20vso.packaging%20vso.profile_write%20vso.project%20vso.release%20vso.security_manage%20vso.serviceendpoint%20vso.symbols%20vso.taskgroups_read%20vso.test%20vso.wiki&redirect_uri=https://eu-devops-dashboard.azurewebsites.net/" >Logout</a></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Col>
            </Row>
        </Layout.Header>
    );
};


