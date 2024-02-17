import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import axios from '../services/axios';

export default function CoursesList() {
    const [courses, setCourses] = useState();

    useEffect(() => {
        axios.get('/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, []);

    return (
        <List>
            {courses ? (
                courses.map((course) => (
                    <ListItem key={course.id} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={course.name} />
                        </ListItemButton>
                    </ListItem>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </List>
    );
};

