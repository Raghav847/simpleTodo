import { createTodo } from "./todo";
import { createProject } from "./project";
import { saveProjects, loadProjects } from "./storage";

let projects = [];
let currentProjectId = null;

export function initializeApp() {
    const loadedProjects = loadProjects();
    if (loadedProjects.length > 0) {
        projects = loadProjects;
        currentProjectId = projects[0].id;
        console.log('✓ Loaded existing projects from storage');
    } else {
        const defaultProject = createProject("My Tasks");
        projects.push(defaultProject);
        currentProjectId = defaultProject.id;
        saveToStorage();
        console.log('✓ Created default project');
    }
}

export function getAllProjects() {
    return projects;
}

export function getCurrentProject() {
    return projects.find(p => p.id === currentProjectId) || null;
}

export function setCurrentProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        currentProjectId = projectId;
        console.log(`Switched to project: ${project.name}`);
    }
}

export function addProject(name) {
    const newProject = createProject(name);
    projects.push(newProject);
    saveToStorage();
    console.log(`Created new project: ${name}`);
    return newProject;
}

export function deleteProject(projectId) {
    if (projects.length <= 1) {
        console.log('Cannot delete the last project');
        return false;
    }

    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== projectId);

    if (projects.length < initialLength) {
        if (currentProjectId === projectId) {
            currentProjectId = projects[0].id;
        }
        saveToStorage();
        console.log('Project deleted');
        return true;
    }
    return false;
}

export function addTodoToCurrentProject(todoData) {
    const currentProject = getCurrentProject();
    if (!currentProject) {
        console.log('No current project selected');
        return null;
    }
    const newTodo = createTodo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.notes
    );
    currentProject.addTodo(newTodo);
    saveToStorage();
    return newTodo;
}

export function updateTodo(todoId, newData) {
    const currentProject = getCurrentProject();
    if (!currentProject) return false;
    
    const todo = currentProject.getTodo(todoId);
    if (!todo) {
        console.log('Todo not found');
        return false;
    }
    
    todo.updateTodo(newData);
    saveToStorage();
    console.log('Todo updated');
    return true;
}

export function deleteTodo(todoId) {
    const currentProject = getCurrentProject();
    if (!currentProject) return false;
    
    const deleted = currentProject.removeTodo(todoId);
    if (deleted) {
        saveToStorage();
    }
    return deleted;
}

export function toggleTodoComplete(todoId) {
    const currentProject = getCurrentProject();
    if (!currentProject) return false;
    
    const todo = currentProject.getTodo(todoId);
    if (!todo) return false;
    
    todo.toggleComplete();
    saveToStorage();
    console.log(`Todo "${todo.title}" marked as ${todo.completed ? 'complete' : 'incomplete'}`);
    return true;
}

export function getTodo(todoId) {
    const currentProject = getCurrentProject();
    if (!currentProject) return null;
    return currentProject.getTodo(todoId);
}

export function getAllTodosFromCurrentProject() {
    const currentProject = getCurrentProject();
    if (!currentProject) return [];
    return currentProject.getAllTodos();
}

function saveToStorage() {
    saveProjects(projects);
}

console.log("✓ appLogic.js (ES6 Module) loaded successfully");