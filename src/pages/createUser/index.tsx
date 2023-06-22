import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Card, Form, Input, Space } from 'antd';
import styles from './createEmp.module.css';

interface User {
    userName: string;
    name: string;
    email: string;
    password: string;
}

const CreateEmployee = () => {
    const [employeeData, setEmployeeData] = useState<User>({
        userName: '',
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                `https://localhost:44311/api/services/app/Person/Create`,
                employeeData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(employeeData);
            const newEmployee = response.data.result;
            console.log('New employee created:', newEmployee);

            setEmployeeData({
                userName: '',
                name: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div>
                    <Card title="Create Employee" className={styles.card}>
                        <Form>
                            <Form.Item label="Username" name="userName">
                                <Input
                                    type="text"
                                    name="userName"
                                    value={employeeData.userName}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>

                            <Form.Item label="Name" name="name">
                                <Input
                                    type="text"
                                    name="name"
                                    value={employeeData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>

                            <Form.Item label="Password" name="password">
                                <Input.Password
                                    name="password"
                                    value={employeeData.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>

                            <Form.Item label="Email" name="email">
                                <Input
                                    type="email"
                                    name="email"
                                    value={employeeData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Space size="small">
                                    <Button
                                        type="primary"
                                        onClick={handleCreate}
                                    >
                                        Create Employee
                                    </Button>

                                    <Link href="/viewEmployee">
                                        <Button type="primary">
                                            View Employee
                                        </Button>
                                    </Link>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
