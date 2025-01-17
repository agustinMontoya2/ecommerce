import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    entities: string[];
    migrations: string[];
    autoloadEntities: boolean;
    logging: boolean;
    synchronize: boolean;
    dropSchema: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    entities: string[];
    migrations: string[];
    autoloadEntities: boolean;
    logging: boolean;
    synchronize: boolean;
    dropSchema: boolean;
}>;
export default _default;
export declare const connectionSource: DataSource;
