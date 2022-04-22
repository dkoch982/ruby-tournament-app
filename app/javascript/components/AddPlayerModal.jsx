import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;

const AddPlayerModal = ({reloadPlayers}) => {
    const formRef = React.createRef();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        const url = "api/v1/players";
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((data) => {
            if (data.ok) {
                handleCancel();
                return data.json();
            }
            throw new Error("Network error.");
          })
          .then(() => {
                reloadPlayers();
          })
          .catch((err) => console.error("Error: " + err));
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create New +
            </Button>
    
            <Modal title="Add New Player ..." visible={visible} onCancel={handleCancel} footer={null}>
                <Form ref={formRef} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "Please input the player's first name" }]}>
                        <Input placeholder="Player's first name" />
                    </Form.Item>
    
                    <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Please input the player's last name" }]}>
                        <Input placeholder="Player's last name" />
                    </Form.Item>
    
                    <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true, message: "Please input the player's postal code" }]}>
                        <Input placeholder="Player's postal code" />
                    </Form.Item>

                    <Form.Item name="handicap" label="Player's Handicap" rules={[{ required: true, message: "Please input the player's handicap" }]}>
                        <Input type="number" />
                    </Form.Item>
    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default AddPlayerModal;
