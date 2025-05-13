
'use client';

import type { AboutContent, Achievement } from '@/types/cms';

const ABOUT_STORAGE_KEY = 'aboutData';

const defaultAchievements: Achievement[] = [
  { id: 'ach-1', iconName: "Award", text: "Optimized packaging strategies, increasing taproom revenue by 20% for Allagash Brewing Company." },
  { id: 'ach-2', iconName: "Brain", text: "Improved prediction of adverse events after cardiac surgery, outperforming national standards." },
  { id: 'ach-3', iconName: "Users", text: "Led end-to-end AI development at Aosenuma, reducing operational costs by 30-40%." },
  { id: 'ach-4', iconName: "Lightbulb", text: "Achieved 100% customer satisfaction by resolving complex COBOL/JCL/VSAM issues at Cognizant." },
];

const defaultAboutContent: AboutContent = {
  id: "main-about-content",
  mainText: `<p>Hello! I'm Venkatesh Shivandi, an Applied Machine Intelligence professional with a passion for leveraging AI to solve real-world challenges and drive impactful change. My journey in AI is fueled by a deep curiosity and a commitment to continuous learning.</p>
<p>With a Master’s in Applied Machine Intelligence from Northeastern University (GPA: 3.94) and hands-on experience in roles spanning AI development, software engineering, and data science, I've honed a versatile skill set. I specialize in developing robust machine learning models, optimizing complex systems, and translating data into actionable insights.</p>
<p>My expertise includes Python, SQL, NoSQL, and cloud platforms like AWS and Azure. I'm proficient in tools like Power BI, Tableau, and various machine learning libraries. I'm also a Microsoft Certified Azure Data Engineer Associate.</p>
<p>I thrive in collaborative environments, leading cross-functional teams and spearheading innovation. My goal is to not only build advanced AI solutions but also to mentor and inspire others in the field.</p>`,
  imageUrl: "https://picsum.photos/seed/venkateshwork/600/400",
  imageHint: "person working computer",
  achievements: defaultAchievements,
};

const getAboutFromStorage = (): AboutContent | null => {
  if (typeof window === 'undefined') {
    return defaultAboutContent; 
  }
  try {
    const storedAbout = localStorage.getItem(ABOUT_STORAGE_KEY);
    if (storedAbout) {
      return JSON.parse(storedAbout);
    } else {
      localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(defaultAboutContent));
      return defaultAboutContent;
    }
  } catch (error) {
    console.error('Error parsing About content from localStorage:', error);
    return defaultAboutContent; 
  }
};

const saveAboutToStorage = (content: AboutContent): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(content));
  } catch (error) {
    console.error('Error saving About content to localStorage:', error);
  }
};


export const getAboutContent = (): AboutContent => {
  const content = getAboutFromStorage();
  return content || defaultAboutContent; 
};

export const updateAboutContent = (updatedData: Partial<AboutContent>): AboutContent => {
  const currentContent = getAboutContent(); 
  const newContent: AboutContent = {
    ...currentContent,
    ...updatedData,
    id: currentContent.id || "main-about-content", 
  };
  saveAboutToStorage(newContent);
  return newContent;
};

if (typeof window !== 'undefined' && !localStorage.getItem(ABOUT_STORAGE_KEY)) {
  saveAboutToStorage(defaultAboutContent);
}
