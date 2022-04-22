import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

const AddTournamentModal = ({reloadTournaments}) => {
    const formRef = React.createRef();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        const url = "api/v1/tournaments";
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
                reloadTournaments();
          })
          .catch((err) => console.error("Error: " + err));
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create New +
            </Button>
    
            <Modal title="Add New Tournament ..." visible={visible} onCancel={handleCancel} footer={null}>
                <Form ref={formRef} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="Tournament Name" rules={[{ required: true, message: "Please input the tournament name" }]}>
                        <Input placeholder="Input your tournament name" />
                    </Form.Item>
    
                    <Form.Item name="course_name" label="Course Name" rules={[{ required: true, message: "Please input the course name" }]}>
                        <Input placeholder="Input the course name" />
                    </Form.Item>
    
                    <Form.Item name="event_date" label="Date of Tournament" rules={[{ required: true, message: "Please input the date for the tournament" }]}>
                        <Input type="date" />
                    </Form.Item>
    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default AddTournamentModal;
