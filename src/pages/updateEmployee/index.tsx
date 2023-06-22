import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'; // Import useEffect
import { User } from 'interface';
import { Button, Card, Form, Input, Space } from 'antd';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import RootLayout from '@/app/layout';

const UpdateEmployee = () => {
    const [updatePerson, setUpdatePerson] = useState<User>({
        id: '',
        userName: '',
        name: '',
        email: '',
        password: '',
    });

    const router = useRouter();
    const { id } = router.query;

    // Use useEffect to update the id once it is available
    useEffect(() => {
        if (id && updatePerson) {
            setUpdatePerson((prevPerson) => ({
                ...prevPerson,
                id: id as string,
            }));
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatePerson((prevPerson: User | null) => ({
            ...(prevPerson as User),
            [name]: value,
        }));
    };

    const updateEmployee = async (e: FormEvent) => {
        e.preventDefault();

        //const token = localStorage.getItem('token');

        const storedId = localStorage.getItem('userId');
        const userId = id || storedId;
        try {
            const res = await axios.put(
                'https://localhost:44311/api/services/app/Person/Update',
                updatePerson
            );
            const updateEmployeeDetails: User = res.data.result;
            setUpdatePerson({
                id: '',
                userName: '',
                name: '',
                email: '',
                password: '',
            });
            console.log('Employee Details Update:', updateEmployeeDetails);
        } catch (error) {
            console.log(error);
        }

        if (userId) {
            localStorage.setItem('userId', userId);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div>
                    <Card
                        title="Update Employee Details"
                        className={styles.card}
                    >
                        <Form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                width: '300px',
                            }}
                            onFinish={updateEmployee}
                        >
                            <Form.Item name="userName">
                                <Input
                                    placeholder="Username"
                                    type="text"
                                    name="userName"
                                    value={updatePerson?.userName}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item name="name">
                                <Input
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    value={updatePerson?.name}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item name="password">
                                <Input.Password
                                    placeholder="Password"
                                    name="password"
                                    value={updatePerson?.password}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item name="email">
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={updatePerson?.email}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Space size="small">
                                    <Button
                                        type="primary"
                                        onClick={updateEmployee}
                                    >
                                        Update Employee Details
                                    </Button>

                                    <Link href={'/viewEmployee'}>
                                        <Button
                                            type="primary"
                                            onClick={updateEmployee}
                                        >
                                            View Employees
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

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <UpdateEmployee />
        </RootLayout>
    );
}
