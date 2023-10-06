# J-Site
This is the main codebase for J-Site Builder application.

&nbsp;
## Docs

- [Codebase](#codebase)
  - [Technologies](#technologies)
  - [Folder Structure](#folder-structure)
- [First time setup](#first-time-setup)
- [Running locally](#running-locally)
- [Code style guide](#code-style-guide)

&nbsp;
## Codebase
### Technologies
Here is a list of all the core technologies this project use:

- [npm](https://www.npmjs.com/): Package manager
- [Tailwind CSS](https://tailwindcss.com/): CSS framework for styling
- [Nuxt 3](https://nuxt.com/): Vue.js framework for server-side rendering

&nbsp;
### Folder Structure
```bash
j-site/
├── assets        # Uncompiled assets such as Stylus or Sass files, images, or fonts
├── components    # Vue.js components
├── layouts       # Custom layout accessible with the layout property in the page component
├── pages         # Application views and routes
├── plugins       # Add Vue plugins and inject functions or constants
├── static        # Static files
└── utils         # Reusable utility codes or functions
```

&nbsp;
## First time setup
The first step to running J-Site locally is downloading the code by cloning the repository:

```bash
git clone https://github.com/jabardigitalservice/j-site-builder.git

#or using SSH
git clone git@github.com:jabardigitalservice/j-site-builder.git
```

open `j-site-builder` directory

```bash
cd j-site-builder
```

create env file

```bash
cp .env.example .env
```

install the dependencies

```bash
npm install
```

&nbsp;
## Running locally

Compiles and hot-reloads for development

```bash
npm run dev
```

&nbsp;
### Code Style Guide
- **Javascript Style Guide by Airbnb** (https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)
