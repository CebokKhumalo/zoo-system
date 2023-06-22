import axios from 'axios';
import { Form, Input, Button, Card, Space, Modal, Typography } from 'antd';
import { LinkOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './createEnclo.module.css';
import { Enclosure } from 'interface';
import RootLayout from '@/app/layout';

const { Text } = Typography;

const CreateEnclosure = () => {
    const [enclosureData, setEnclosureData] = useState<Enclosure>({
        enclosureName: '',
        currentCapacity: 0,
        maxCapacity: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEnclosureData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                `https://localhost:44311/api/services/app/Enclosure/CreateEnclosure`,
                enclosureData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const newEnclosure: Enclosure = response.data.result;
            console.log('New enclosure created:', newEnclosure);

            setEnclosureData({
                enclosureName: '',
                currentCapacity: 0,
                maxCapacity: 0,
            });

            // Display success message and refresh the page
            Modal.success({
                content: 'New enclosure created successfully!',
                onOk: () => window.location.reload(),
            });
        } catch (error) {
            console.log(error);

            // Show error message
            Modal.error({
                content: 'Failed to create new enclosure.',
            });
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Card className={styles.card}>
                    <Form className={styles.cardInformation}>
                        <Form.Item name="enclosureName">
                            <Input
                                placeholder="Enter the Enclosure Name"
                                type="text"
                                name="enclosureName"
                                value={enclosureData.enclosureName}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item name="currentCapacity">
                            <Input
                                placeholder="Enter the Current capacity of the Enclosure"
                                type="number"
                                name="currentCapacity"
                                value={enclosureData.currentCapacity}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item name="maxCapacity">
                            <Input
                                placeholder="Enter the Current capacity of the Enclosure"
                                type="number"
                                name="maxCapacity"
                                value={enclosureData.maxCapacity}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button
                                    className={styles.buttons}
                                    type="link"
                                    icon={<SearchOutlined />}
                                    onClick={handleCreate}
                                >
                                    <Text className={styles.buttonText}>
                                        Create Enclosure
                                    </Text>
                                </Button>
                                <Button
                                    className={styles.buttons}
                                    type="link"
                                    icon={<LinkOutlined />}
                                    href="/viewAllEnclosure"
                                >
                                    <Text className={styles.buttonText}>
                                        {' '}
                                        View Enclosure
                                    </Text>
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <CreateEnclosure />
        </RootLayout>
    );
}
