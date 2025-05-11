# Portfolio Website

A modern, responsive portfolio website built with Next.js. This website includes a blog, personal information, and project showcase.

## Features

- Responsive design
- Dark/light mode
- Markdown-based blog system
- Project showcase
- Contact form
- Admin dashboard access (hidden from navigation)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at http://localhost:9002 by default.

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy your site to the gh-pages branch
3. Your site will be available at https://yourusername.github.io/repository-name

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Content Management

### Blog Posts

Blog posts are stored as Markdown files in the `content/posts` directory. Each post should include frontmatter with the following fields:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of your post"
coverImage: "https://example.com/image.jpg"
author:
  name: "Your Name"
  image: "https://example.com/avatar.jpg"
category: "Category Name"
tags: ["tag1", "tag2"]
featured: true/false
---

Your post content in Markdown format...
```

### Admin Access

The admin section is hidden from regular navigation but can be accessed at:

```
/admin/dashboard
```

## Customization

- Update colors in `src/app/globals.css`
- Modify site content in the respective components
- Update personal information in component files
