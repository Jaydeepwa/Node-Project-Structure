import mongoose from 'mongoose';

export default (database: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const connect = () => {
            mongoose
                .connect(database)
                .then(() => {
                    resolve('connected');
                })
                .catch((error) => {
                    console.log('Unable to connect to the db: ' + error?.message);
                    resolve('disconnected');
                    return process.exit(1);
                });
        };
        connect();

        mongoose.connection.on('disconnected', () => {
            console.log(`Db disconnected`);
            resolve('disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    });
};
