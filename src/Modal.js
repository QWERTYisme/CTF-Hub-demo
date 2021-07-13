import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Modal, Input, Button, notification } from 'antd';

const openNotificationWithIcon = type => {
    if (type == 'success') {
        notification[type]({
            message: '正确！',
            description:
                '恭喜，flag正确！',
        });
    }
    if (type == 'error') {
        notification[type]({
            message: '错误！',
            description:
                '遗憾，再试试吧！',
        });
    }
};

class ChallengeModal extends React.Component {
    state = { id: '', title: '', content: '', visible: false };

    showModal = (arg1, arg2, arg3) => {
        this.setState({
            id: arg1,
            title: arg2,
            content: arg3,
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            value: '',
        });
        let url = 'http://139.224.207.0:8000/checkFlag?id=' + this.state.id + '&flag=' + this.state.value;
        fetch(
            url
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                openNotificationWithIcon(data);
            })
            .catch(e => console.log('错误:', e))
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <>

                <Modal
                    okText={"submit"}
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Input id="flag" value={this.state.value} onChange={this.handleChange} placeholder="Input your flag here" />,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Submit
                        </Button>
                    ]}
                >
                    <p>{this.state.content}</p>
                </Modal>
            </>
        );
    }
}
export default ChallengeModal;