import { React, Component } from 'react';
import { Card, Col, Typography } from 'antd';
import ChallengeModal from './Modal';
const { Text } = Typography;

class ShowChallenge extends Component {
    myModal = null;
    handleClick = () => {
        this.myModal.showModal(this.props.id, this.props.title, this.props.content);
    }
    render() {
        return (
            <>
                <Col span={6}>
                    <Card onClick={this.handleClick} hoverable={true} style={{ width: 300, height: 200, fontSize: '25px' }} bodyStyle={{ textAlign: 'center', margin: '50px' }}>
                        <Text strong={true}>{this.props.title}</Text>
                    </Card>
                </Col>
                <ChallengeModal ref={(ref) => this.myModal = ref} />
            </>
        );
    }
}
export default ShowChallenge;