# Project Name: Corporate Website (Next.js + Strapi CMS)

## Overview
This project is a corporate website built using **Next.js**, **Tailwind CSS**, and **Redux Toolkit**. Content is managed via **Strapi CMS** and forms are handled with **Formik**. The site supports **multilingual functionality** (English & Arabic) with RTL support for Arabic.

Key features include:

- Responsive **Navbar** with dropdown menus
- Dynamic **Hero Section** and **Blog Page** with CMS-managed content
- **Team Members** showcase
- **Client Showcase** with logos, testimonials, or case studies
- **Footer** with subscription form and links
- Optimized performance with **SSG/SSR** and loading states

---

## Tech Stack

### Frontend
- Next.js (Routing & Pages)
- Tailwind CSS (Styling)
- Redux Toolkit (State Management)
- Formik (Form Handling)
- next-intl / i18next (Multilingual support, AR/EN with LTR/RTL)

### Backend
- Strapi CMS (Content Management)
- REST API (Data fetching & Form submissions)

---

## Features

### 1. Header Navigation
- Responsive Navbar with **logo**, **links**, and **Services dropdown**
- Dropdown links redirect to specific service pages
- Search functionality with query results categorized by Team and Services
- Multilingual toggle (EN/AR) with RTL support for Arabic

### 2. Hero Section
- Dynamic **images/videos** fetched from Strapi CMS
- Auto-play slider for videos, smooth transitions for images
- **Multilingual support** (EN/AR) with **LTR/RTL** support

### 3. Blog Page
- Dynamic list of blog posts fetched from Strapi CMS
- Each post shows title, description, author, date, read time, and image
- Skeleton loaders displayed while fetching data
- **Multilingual support** (EN/AR) with **LTR/RTL** support

### 4. Our Team
- Display team members with **images, names, and roles**
- Multilingual support (EN/AR) with RTL support

### 5. Clients
- Showcase client logos, testimonials, or case studies
- Multilingual support (EN/AR), RTL for Arabic

### 6. Footer
- Multiple links and subscription form with **email validation**
- Prevent duplicate submissions, show success/error messages
- Multilingual support (EN/AR), RTL support

---

## Technical Requirements

### Frontend
- **Next.js** for routing and dynamic pages (e.g., `/services/[service-id]`)
- **Tailwind CSS** for dark-themed styling (brown, white, black)
- **Redux Toolkit** to manage search query, language selection, and form states

### Backend
- **Strapi CMS** to manage content collections: Pages, Services, Team Members, Blog, Clients, Subscribers
- REST API endpoints for fetching content and submitting forms

### Form Handling
- **Formik** for subscription forms
- Email validation and error handling
- Duplicate email prevention

### Multilingual Support
- Use **next-intl** or **i18next** for translations
- RTL support for Arabic
- All text content from translation JSON files (`en.json` / `ar.json`)

### Performance
- Optimize images using CMS or Next.js image optimization
- Implement SSG/SSR where appropriate
- Skeleton loaders displayed while fetching API data

---

## Design Guidelines
- Follow the **Figma design** for layout, colors, and typography
- Maintain dark theme with **brown, white, black**
- Replace placeholder images/videos with CMS content
- Ensure responsiveness across devices
- Maintain consistent grayscale/dark filter style for media
- Cards and sections should have hover effects and shadows

---

## Setup Instructions

### 1. Clone Repository
```bash
git clone <https://github.com/Najmalfawaz/strapi-company-website>
cd <interview-task>

Install Dependency
"npm i"
