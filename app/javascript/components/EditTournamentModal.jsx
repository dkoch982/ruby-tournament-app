import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

const EditTournamentModal = ({tournament, reload}) => {
    const formRef = React.createRef();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = async (values) => {
        const url = "/api/v1/tournaments/" + tournament.id;
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
    
            <Modal title="Edit Tournament ..." visible={visible} onCancel={handleCancel} footer={null}>
                <Form ref={formRef} layout="vertical" onFinish={onFinish} initialValues={{ name: tournament.name, course_name: tournament.course_name, event_date: tournament.event_date }}>
                    <Form.Item name="name" label="Tournament Name" rules={[{ required: true, message: "Please input the tournament name" }]}>
                        <Input placeholder="Input the tournament name" />
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

export default EditTournamentModal;
