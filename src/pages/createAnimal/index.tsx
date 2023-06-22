import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal } from 'antd';
import styles from './styles.module.css';

interface Animal {
    animalName: string;
    speciesName: string;
    gender: string;
    healthStatus: string;
    age: number;
}

const CreateAnimal = () => {
    const [animalData, setAnimalData] = useState<Animal>({
        animalName: '',
        speciesName: '',
        gender: '',
        healthStatus: '',
        age: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnimalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                'https://localhost:44311/api/services/app/Animal/Create',
                animalData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const newAnimal: Animal = response.data.result;
            console.log('New animal created:', newAnimal);

            // Show success message and refresh the page
            Modal.success({
                content: 'New animal created successfully!',
                onOk: () => window.location.reload(),
            });

            // Reset the form fields after successful creation
            setAnimalData({
                animalName: '',
                speciesName: '',
                gender: '',
                healthStatus: '',
                age: 0,
            });
        } catch (error) {
            // Show error message
            Modal.error({
                content: 'Failed to create new animal.',
            });
            console.log(error);
        }
    };

    return (
        <div className={styles.background}>
            <h1>Create New Animal</h1>
            <Card>
                <Form>
                    <Form.Item label="Animal Name" name="animalName">
                        <Input
                            type="text"
                            name="animalName"
                            value={animalData.animalName}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Species Name" name="speciesName">
                        <Input
                            type="text"
                            name="speciesName"
                            value={animalData.speciesName}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Age" name="age">
                        <Input
                            type="number"
                            name="age"
                            value={animalData.age}
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    <Form.Item label="Gender" name="gender">
                        <Input
                            type="text"
                            name="gender"
                            value={animalData.gender}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Health Status" name="healthStatus">
                        <Input
                            type="text"
                            name="healthStatus"
                            value={animalData.healthStatus}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </Form>

                <Form.Item>
                    <Button type="primary" onClick={handleCreate}>
                        Create Animal
                    </Button>
                </Form.Item>
            </Card>
        </div>
    );
};

export default CreateAnimal;
