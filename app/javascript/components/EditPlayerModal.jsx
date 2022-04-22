import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

const EditPlayerModal = ({player, reload}) => {
    const formRef = React.createRef();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = async (values) => {
        const url = "/api/v1/players/" + player.id;
        try {
            let response = await fetch(url, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                handleCancel();
                reload();
            }
            throw new Error(`HTTP error: ${response.status}`);
        } catch(err) {
            console.error("Error: " + err);
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>Edit</Button>
    
            <Modal title="Edit Player ..." visible={visible} onCancel={handleCancel} footer={null}>
                <Form ref={formRef} layout="vertical" onFinish={onFinish} initialValues={{ first_name: player.first_name, last_name: player.last_name, postal_code: player.postal_code, handicap: player.handicap }}>
                    <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "Please input your first name" }]}>
                        <Input placeholder="Input your first name" />
                    </Form.Item>
    
                    <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Please input your last name" }]}>
                        <Input placeholder="Input your name" />
                    </Form.Item>
    
                    <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true, message: "Please input your postal code" }]}>
                        <Input placeholder="Input your postal code" />
                    </Form.Item>

                    <Form.Item name="handicap" label="Handicap" rules={[{ required: true, message: "Please input your handicap" }]}>
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

export default EditPlayerModal;
