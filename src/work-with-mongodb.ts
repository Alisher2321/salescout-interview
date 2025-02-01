import mongoose, { Schema, Document } from 'mongoose';

// Define a User schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// Create a User model
const User = mongoose.model('User', userSchema);

type DuplicatedUsers = {
    email: string;
};

async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/myDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Create users and add them to the collection
        const usersToAdd = [
            { name: 'John Doe', email: 'john.doe@example.com' },
            { name: 'Jane Smith', email: 'jane.smith@example.com' },
            { name: 'John Doe 2', email: 'john.doe@example.com' },
        ];

        // Insert multiple users into the database
        await User.insertMany(usersToAdd);
        console.log('Users added successfully');

        // Find users with duplicate emails
        const duplicatedUsers = await User.aggregate([
            { $group: { _id: "$email", count: { $sum: 1 } } }, // Group by email and count occurrences
            { $match: { count: { $gt: 1 } } }, // Filter to only duplicate emails
            { $project: { email: "$_id", _id: 0 } } // Project the email field
        ]);

        console.log('Duplicated users:', duplicatedUsers);

        return duplicatedUsers;

    } catch (error) {
        console.error('Error managing users:', error);
        return [];
    } finally {
        // Close the MongoDB connection
        await mongoose.disconnect();
    }
}

module.exports = { manageUsers };
