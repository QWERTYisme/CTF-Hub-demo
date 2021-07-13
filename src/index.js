import { React, Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Row, PageHeader } from 'antd';
import ShowChallenge from './challenge';

const { Header, Content, Footer } = Layout;

class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
      challengeList: []
    }
  }

  componentDidMount() {
    //fetch 获取info 详细信息
    //setState 将详细信息放入infoList
    fetch(
      'http://139.224.207.0:8000/getChallenges'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ challengeList: data })
      })
      .catch(e => console.log('错误:', e))
  }

  render() {
    let challengeList = this.state.challengeList;
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Challenge</Menu.Item>
            <Menu.Item key="3">Admin</Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <PageHeader
            className="site-page-header"
            title="CTF-Hub-demo"
          />
          <div className="site-layout-background" style={{ padding: 24, minHeight: 650 }}>
            <div className="site-card-wrapper" >
              <Row gutter={[48, 24]}>
                {
                  challengeList.map((item) => {
                    return <ShowChallenge id={item.id} title={item.title} content={item.content} />
                  })
                }
              </Row>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout >
    );
  }
}
ReactDOM.render(
  <Board />,
  document.getElementById('container')
);