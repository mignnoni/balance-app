import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_DEV === "test" ? "localhost" : host,
            database: defaultOptions.database,
        })
    );
};
