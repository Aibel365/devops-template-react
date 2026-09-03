import { useEffect, useState } from "react";

/**
 * Read value from local storage
 * The data must be stored in json format.
 * If error it returns null and logs a warning to the console.
 *
 * @param key  the storage key
 */
export function readLocalStorageValue<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    try {
        const item = window.localStorage.getItem(key);
        if (item == null) return null;
        return JSON.parse(item) satisfies T;
    } catch (error) {
        console.warn(error);
    }
    return null;
}

/**
 * Save value to local storage
 * The data will be stored in json format.
 * If error it returns null and logs a warning to the console.
 * If the value is null, the key will be removed from local storage
 *
 * @param key   the storage key
 * @param value the value that will be saved
 */
export function saveLocalStorageValue<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
        if (value == null) {
            window.localStorage.removeItem(key);
            return;
        }
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(error);
    }
}

/**
 * Custom React hook for managing state synchronized with local storage
 * The data will be stored in JSON format and automatically synced between state and local storage.
 * If error occurs, it logs an error to the console and falls back to the initial value.
 *
 * @param key          the storage key to use in local storage
 * @param initialValue the initial value to use if no value exists in local storage
 * @returns A tuple containing:
 *          - value: the current value from local storage
 *          - setValue: function to update the value (accepts value or updater function)
 *          - removeItem: function to remove the item from local storage and reset to initial value
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void] {
    // Use a function to initialize the state from localStorage
    const [value, setValue] = useState<T>(() => {
        try {
            if (typeof window === "undefined") return initialValue; // Handle SSR
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Update localStorage whenever the state changes
    useEffect(() => {
        try {
            if (typeof window === "undefined") return;
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }, [key, value]);

    // Function to remove the item from localStorage
    const removeItem = () => {
        try {
            if (typeof window === "undefined") return;
            window.localStorage.removeItem(key);
            setValue(initialValue); // Reset state to initial value
        } catch (error) {
            console.error(error);
        }
    };

    return [value, setValue, removeItem];
}
