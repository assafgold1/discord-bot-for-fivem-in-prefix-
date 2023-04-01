const mysql = require('mysql2');

class MySqlHandler {
    #connection;
    constructor(config) {
        this.config = config;
        this.#connection = null;
    }

    escape(value) {
        return mysql.escape(value);
    }

    query(sql, ...args) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.#connection) await this?.createPool();

                this.#connection?.query(sql, ...args, (error, results, fields) => {
                    if (error) reject(error);
                    else resolve(results);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getConnection() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.#connection) await this.createPool();
                this.#connection.getConnection((err, connection) => {
                    if (err) reject(err);
                    else resolve(connection);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    createPool(config = this.config) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.#connection) {
                    const pool = mysql.createPool({ ...config });
                    this.#connection = pool;

                    this.#connection.on('error', (err) => {
                        console.log('[DB Manager] pool error.');
                        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                            console.log('[DB Manager] Reconnecting lost connection and deleting connection.');
                            this.#connection = null;
                        } else { throw err; }
                    });

                    console.log('[DB Manager] Pool created.');
                }

                resolve(this.#connection);
            } catch (err) {
                reject(err);
            }
        });
    }
};

module.exports = MySqlHandler;
