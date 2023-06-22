import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Typography, Space } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import RootLayout from '@/app/layout';

const { Title, Text } = Typography;

const ViewAllEnclosure = () => {
    const [enclosure, setEnclosure] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'https://localhost:44311/api/services/app/Enclosure/GetAllEnclosure',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Extract enclosure data from the response and update the state
                const data = response.data;
                setEnclosure(data.result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Enclosure Name',
            dataIndex: 'enclosureName',
            key: 'enclosureName',
        },
        {
            title: 'Current Capacity',
            dataIndex: 'currentCapacity',
            key: 'currentCapacity',
        },
        {
            title: 'Max Capacity',
            dataIndex: 'maxCapacity',
            key: 'maxCapacity',
        },
        {
            title: 'Get Enclosure',
            dataIndex: 'id',
            key: 'getEnclosure',
            render: (id: string) => (
                <Link href={`viewEnclosure?id=${id}`}>
                    <Button
                        className={`${styles.buttons} centered-button`}
                        style={{
                            fontSize: '10px',
                            color: 'white',
                        }}
                        icon={<LinkOutlined />}
                    >
                        get enclosure details
                    </Button>
                </Link>
            ),
        },
        // Add more columns for additional fields
    ];

    return (
        <div className={styles.background}>
            <div className={styles.centerContent}>
                <Card className={styles.centeredTable}>
                    <Title>Enclosure List</Title>
                    <Table
                        className={styles.table}
                        dataSource={enclosure}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                    />
                    <br />
                </Card>
                <div>
                    <Button
                        className={styles.buttons}
                        type="primary"
                        href="WcreateEnclosure"
                    >
                        <Link href="/createEnclosure"></Link>
                        Create Enclosure
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <ViewAllEnclosure />
        </RootLayout>
    );
}
