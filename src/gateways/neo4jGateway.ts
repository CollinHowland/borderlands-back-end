import neo4j, { Driver } from 'neo4j-driver'
import assert from 'assert'

let _driver: Driver

export const initializeDriver = (callback: Function) => {
    if (_driver) {
        console.warn("Trying to initialize the database driver again")
        return callback(null, _driver)
    }
    try {
        const DB_PASSWORD: string = process.env.DB_PASSWORD as string
        const DB_PORT: string = process.env.DB_PORT as string
        const driver = neo4j.driver(
            `bolt://localhost:${DB_PORT}`,
            neo4j.auth.basic('neo4j', DB_PASSWORD)
        )
        _driver = driver
        return callback(null, _driver)
    } catch (error) {
        return callback(error)
    }
}

export const getDriver = () => {
    assert.ok(_driver, "Driver has not been initialized. Please initialize first.");
    return _driver;
}

// TODO: close driver when application is shutdown. This is just the method that should be called
export const closeDriver = () => {
    assert.ok(_driver, "Driver has not been initialized. Cannot close uninitialized driver.");
    _driver.close()
}


