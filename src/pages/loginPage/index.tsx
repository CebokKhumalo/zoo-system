'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import RootLayout from '@/app/layout';
import styles from './styles.module.css';

const { Text, Title } = Typography;

const LoginPage = () => {
    const [emailOrEmail, setEmailOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onFinish = async () => {
        try {
            const response = await axios.get(
                `https://localhost:44311/api/services/app/Person/GetAsyncByUsenameOrEmailAndPassword?userNameOrEmail=${emailOrEmail}&password=${password}`
            );

            const user = response.data.result;
            if (user) {
                const userId = user.id;
                console.log('Email:', emailOrEmail);
                console.log('password:', password);
                router.push(`/userPage?id=${userId}`);
            } else {
                window.alert(
                    'Credentials incorrect. Please re-enter your credentials.'
                );
                console.log('Email:', emailOrEmail);
                console.log('password:', password);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.background}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Card className={styles.container}>
                    <Title style={{ color: 'white' }}>Login</Title>
                    <Form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '300px',
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="emailOrEmail"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your username or email!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Username or Password"
                                value={emailOrEmail}
                                onChange={(e) =>
                                    setEmailOrEmail(e.target.value)
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Button className={styles.button} htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
