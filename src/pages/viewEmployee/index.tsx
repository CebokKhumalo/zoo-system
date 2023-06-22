import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Card, Space, Table } from 'antd';
import RootLayout from '@/app/layout';

import styles from './styles.module.css';

const ViewEmployee = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'https://localhost:44311/api/services/app/Person/GetAll',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const data = response.data;
                setEmployees(data.result);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Username',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (person: any) => (
                <Space>
                    <Link href={`/employeeView?id=${person.id}`}>
                        <Button type="primary">Get person Details</Button>
                    </Link>
                    <Link href={`/updateEmployee?id=${person.id}`}>
                        <Button type="primary">Update Employee Details</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Card>
                    <h1>Employee List</h1>
                    <Table
                        className={styles.card}
                        dataSource={employees}
                        columns={columns}
                    />

                    <Link href="createUser">
                        <Button className={styles.button}>
                            Create New Employee
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <ViewEmployee />
        </RootLayout>
    );
}
