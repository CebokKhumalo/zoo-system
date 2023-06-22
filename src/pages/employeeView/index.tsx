'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button, Card, Space, Typography } from 'antd';
import styles from './styles.module.css';
import RootLayout from '@/app/layout';
import { useRouter } from 'next/router';
const { Text } = Typography;

interface User {
    id: string;
    userName: string;
    name: string;
    password: string;
    email: string;
}

const UserPage = () => {
    const [viewUser, setViewUser] = useState<User>({
        id: '',
        userName: '',
        name: '',
        password: '',
        email: '',
    });

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:44311/api/services/app/Person/Get?id=${id}`
                );
                setViewUser(response.data.result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {viewUser && (
                    <Card className={styles.card}>
                        <div className={styles.cardInformation}>
                            <h2>
                                {viewUser.name.charAt(0).toUpperCase() +
                                    viewUser.name.slice(1)}
                                's Profile
                            </h2>
                            <p>
                                <Text style={{ color: 'green' }}>ID:</Text>{' '}
                                {viewUser.id}
                            </p>
                            <p>
                                <Text style={{ color: 'green' }}>Name:</Text>{' '}
                                {viewUser.name}
                            </p>
                            <p>
                                <Text style={{ color: 'green' }}>Email:</Text>{' '}
                                {viewUser.email}
                            </p>
                            <p>
                                <Text style={{ color: 'green' }}>
                                    Password:
                                </Text>{' '}
                                {viewUser.password}
                            </p>
                            <p>
                                <Text style={{ color: 'green' }}>
                                    Username:
                                </Text>{' '}
                                {viewUser.userName}
                            </p>
                            <Space>
                                <Link href="/viewEmployee">
                                    <Button type="primary">
                                        View Employees
                                    </Button>
                                </Link>
                                <Link href="/createUser">
                                    <Button type="primary">
                                        Create Employees
                                    </Button>
                                </Link>
                            </Space>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <UserPage />
        </RootLayout>
    );
}
