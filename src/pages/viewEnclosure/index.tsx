import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './styles.module.css';
import { Card, Button, Typography, Space } from 'antd';
import RootLayout from '@/app/layout';

const { Text, Title } = Typography;

interface User {
    id: string;
    enclosureName: string;
    currentCapacity: number;
    maxCapacity: number;
}

const ViewEnclosure = () => {
    const [viewEnclosure, setViewEnclosure] = useState<User | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:44311/api/services/app/Enclosure/GetEnclosure?id=${id}`
                );
                setViewEnclosure(response.data.result);
            } catch (error) {
                console.log(error);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {viewEnclosure && (
                    <div className={styles.centerContent}>
                        <Card className={styles.card}>
                            <br />
                            <Space
                                className={styles.centerContent}
                                direction="vertical"
                            >
                                <Title>Enclosure Details</Title>
                                <Text className={styles.titleStyle} strong>
                                    enclosureName:{'   '}
                                    <Text className={styles.textStyle}>
                                        {viewEnclosure.enclosureName}
                                    </Text>
                                    {'   '}
                                </Text>
                                <br />
                                <Text className={styles.titleStyle} strong>
                                    currentCapacity:{'   '}
                                    <Text className={styles.textStyle}>
                                        {viewEnclosure.currentCapacity}
                                    </Text>
                                </Text>
                                {'   '}
                                <br />
                                <Text className={styles.titleStyle} strong>
                                    maxCapacity:{'   '}
                                    <Text className={styles.textStyle}>
                                        {viewEnclosure.maxCapacity}
                                    </Text>
                                </Text>{' '}
                            </Space>
                        </Card>

                        <br />
                        <div>
                            {' '}
                            <Button
                                className={styles.buttons}
                                type="primary"
                                href="/viewAllEnclosure"
                            >
                                <Link href="/viewAllEnclosure"></Link>
                                View Enclosure
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <ViewEnclosure />
        </RootLayout>
    );
}
