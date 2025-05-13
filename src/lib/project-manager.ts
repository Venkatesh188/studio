
'use client';

import type { Project } from '@/types/cms';

const PROJECTS_STORAGE_KEY = 'projectsData';

const getProjectsFromStorage = (): Project[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return storedProjects ? JSON.parse(storedProjects) : [];
  } catch (error) {
    console.error('Error parsing projects from localStorage:', error);
    return [];
  }
};

const saveProjectsToStorage = (projects: Project[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

const initializeDummyProjects = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem(PROJECTS_STORAGE_KEY)) {
    const dummyProjects: Project[] = [
      {
        id: "proj-1",
        slug: "allagash-brewing-data-analysis",
        title: "Data Analysis for Allagash Brewing Company",
        description: "<p>Led a data analysis project to <strong>optimize packaging strategies</strong> by analyzing sales trends. The insights derived helped in better inventory management and targeted marketing for seasonal products.</p>",
        problem: "<p>The primary challenge was inefficient packaging leading to potential revenue loss and high inventory holding costs for less popular SKUs. Sales data was available but not effectively utilized for demand forecasting of specific pack sizes.</p>",
        tools: ["Data Analysis", "Sales Trend Analysis", "Inventory Optimization", "Python", "Pandas"],
        outcome: "<p>Achieved a <strong>20% increase in taproom revenue</strong> by aligning packaging with demand. Identified a 15% higher demand for seasonal to-go packs, leading to reduced waste and better stock rotation. The project provided a clear framework for data-driven decision making in packaging.</p>",
        imageUrl: "https://picsum.photos/seed/allagash/400/250",
        imageHint: "brewery data analytics",
        published: true,
        date: "2023-05-15",
        author: "Venkatesh S.",
        tags: ["Data Analysis", "Optimization", "Retail"]
      },
      {
        id: "proj-2",
        slug: "ml-cardiac-surgery-prediction",
        title: "ML for Adverse Events after Cardiac Surgery",
        description: "<p>Developed and validated machine learning models to <strong>predict complications</strong> such as kidney failure after cardiac surgery. This involved working with sensitive medical data and ensuring model interpretability.</p>",
        problem: "<p>Early and accurate prediction of post-operative complications is crucial for timely intervention and improved patient outcomes. Existing models lacked desired precision for specific high-risk cohorts.</p>",
        tools: ["Machine Learning", "Predictive Modeling", "Python", "Scikit-learn", "Healthcare Analytics"],
        outcome: "<p>The developed models demonstrated <strong>improved prediction accuracy by 12%</strong> compared to the national STS model. This enables better resource allocation for high-risk patients and has the potential to significantly reduce adverse event rates.</p>",
        imageUrl: "https://picsum.photos/seed/cardiacml/400/250",
        imageHint: "medical technology machine learning",
        published: true,
        date: "2023-09-20",
        author: "Venkatesh S.",
        tags: ["Machine Learning", "Healthcare", "Predictive Analytics"]
      },
    ];
    saveProjectsToStorage(dummyProjects);
  }
};

initializeDummyProjects();

export const getAllProjects = (): Project[] => {
  return getProjectsFromStorage().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjectsFromStorage();
  return projects.find(project => project.id === id);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  const projects = getProjectsFromStorage();
  return projects.find(project => project.slug === slug);
};

export const createProject = (newProjectData: Omit<Project, 'id' | 'date' | 'author'>): Project => {
  const projects = getProjectsFromStorage();
  const newProject: Project = {
    ...newProjectData,
    id: `proj-${Date.now().toString()}`,
    date: new Date().toISOString().split('T')[0],
    author: 'Venkatesh S.',
  };
  const updatedProjects = [...projects, newProject];
  saveProjectsToStorage(updatedProjects);
  return newProject;
};

export const updateProject = (id: string, updatedData: Partial<Omit<Project, 'id' | 'author'>>): Project | undefined => {
  const projects = getProjectsFromStorage();
  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex === -1) {
    return undefined;
  }
  
  const originalProject = projects[projectIndex];
  const updatedProjectDetails = { ...originalProject, ...updatedData, id: originalProject.id, author: originalProject.author };
  
  projects[projectIndex] = updatedProjectDetails;
  saveProjectsToStorage(projects);
  return updatedProjectDetails;
};

export const deleteProject = (id: string): boolean => {
  let projects = getProjectsFromStorage();
  const initialLength = projects.length;
  projects = projects.filter(project => project.id !== id);
  if (projects.length < initialLength) {
    saveProjectsToStorage(projects);
    return true;
  }
  return false;
};

export const getPublishedProjects = (): Project[] => {
    const projects = getProjectsFromStorage();
    return projects.filter(project => project.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRecentProjects = (limit: number = 3): Project[] => {
    return getPublishedProjects().slice(0, limit);
};
