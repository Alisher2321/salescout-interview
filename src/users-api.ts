import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

// In-memory store for users
const users: { name: string }[] = [];

// POST /user - Adds a new user
app.post('/user', (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    // Add the new user to the users array
    users.push({ name });
    res.status(201).json({ message: 'User added successfully' });
});

// GET /users - Returns all users
app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
});

// Start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
