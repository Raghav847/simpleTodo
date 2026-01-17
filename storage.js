// ========================================
// STORAGE MODULE (ES6)
// ========================================
// This module handles saving and loading data from localStorage
// Important: localStorage only stores strings (JSON format)
// We need to convert objects to JSON when saving, and parse JSON when loading

import { createTodo } from './todo.js';
import { createProject } from './project.js';

// Key name for localStorage
const STORAGE_KEY = 'todoAppProjects';

/**
 * Save all projects to localStorage
 * @param {array} projects - Array of project objects
 */
export function saveProjects(projects) {
    try {
        // Convert projects array to JSON string
        // Note: This saves the DATA but loses the METHODS
        const jsonString = JSON.stringify(projects);
        localStorage.setItem(STORAGE_KEY, jsonString);
        console.log('✓ Projects saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Load all projects from localStorage
 * @returns {array} Array of project objects with methods restored
 */
export function loadProjects() {
    try {
        // Get the JSON string from localStorage
        const jsonString = localStorage.getItem(STORAGE_KEY);
        
        // If nothing saved yet, return empty array
        if (!jsonString) {
            console.log('No saved projects found');
            return [];
        }
        
        // Parse the JSON string to get plain objects
        const plainProjects = JSON.parse(jsonString);
        
        // IMPORTANT: We need to restore the methods!
        // JSON only stores data, not functions
        const projectsWithMethods = plainProjects.map(projectData => {
            // Create a new project (which has methods)
            const project = createProject(projectData.name);
            
            // Restore the saved properties
            project.id = projectData.id;
            project.createdAt = projectData.createdAt;
            
            // Restore all todos with their methods
            project.todos = projectData.todos.map(todoData => {
                // Create a new todo (which has methods)
                const todo = createTodo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.notes
                );
                
                // Restore the saved properties
                todo.id = todoData.id;
                todo.completed = todoData.completed;
                todo.createdAt = todoData.createdAt;
                
                return todo;
            });
            
            return project;
        });
        
        console.log(`✓ Loaded ${projectsWithMethods.length} projects from localStorage`);
        return projectsWithMethods;
        
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
}

/**
 * Clear all data from localStorage (useful for testing)
 */
export function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('✓ Storage cleared');
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
}

/**
 * Check if there's any saved data
 * @returns {boolean} True if data exists
 */
export function hasStoredData() {
    return localStorage.getItem(STORAGE_KEY) !== null;
}

console.log("✓ storage.js (ES6 Module) loaded successfully");