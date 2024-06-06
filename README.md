## Mind Canvas

This application allows users to create, publish, and manage their personal blogs. Users can easily create blog posts to share their original content and have the option to publish them or save them as drafts whenever they wish. Additionally, users can discover, read, comment on, and like blogs shared by other users. This enables users to find content on various topics and interact with other users. In this way, blog authors can share their own content while engaging within the community.


## Features

- **User Blog Creation and Management**: Users can easily create their own personal blogs, publish their content, edit, and manage them. They also have the option to save their posts as drafts.
- **Blog Discovery and Reading**: Users can discover and read blogs shared by other users. This allows them to find content on different topics.
- **Commenting and Liking**: Users can comment on and like blogs they read, allowing them to interact with content creators.
- **Profile Management**: Users can edit their information from their personal profiles.

## Installation

To get started with the Mind Canvas, follow these steps:

1. Clone the repository to your computer:

```
git clone https://github.com/ykslkrtld/mind-canvas.git

```

2. Navigate to the project directory

```
cd mind-canvas
```

3. Install the required packages

```
yarn install
```

4. Start the application

```
yarn start
```

5. Open the browser and navigate to http://localhost:3000

## Usage

1. **Home Page**: Access the home page to view the latest blogs and explore content.
2. **User Authentication**: Register or log in to read and interact with blogs.
3. **Reading Blogs**: Once logged in, users can read blogs shared by other users.
4. **Interacting with Blogs**: Users can comment on blogs, like them, and share their thoughts.
5. **Profile Management**: Update personal information and settings from the profile page.
6. **Creating Blogs**: Authenticated users can create new blogs, either publishing them immediately or saving them as drafts.
7. **Managing Own Blogs**: Users can view and manage their own blogs, editing or deleting them as necessary.
8. **Responsive Design**: The application is designed to work seamlessly across various devices and screen sizes.

## Project Skeleton

```
Mind Canvas

|----readme.md
SOLUTION
├── public
|    ├── index.html
|    ├── favicon.ico
|    ├── manifest.json
|    └── robots.txt
├── src
|    ├── index.css
|    ├── index.js
|    ├── App.js
     ├── App.css
|    ├── app
|    │   ├── store.jsx
|    ├── assets
|    │   ├── loading.gif
|    ├── components
|    │   ├── blog
|    │   │   ├── BlogCard.jsx
|    │   │   ├── CommentCard.jsx
|    │   │   ├── CommentForm.jsx
|    │   │   ├── DeleteModal.jsx
|    │   │   ├── MyBlogCard.jsx
|    │   │   ├── UpdateBlogModal.jsx
|    │   │   ├── UpdateProfileModal.jsx
|    │   ├── Footer.jsx
|    │   ├── Navbar.jsx
|    ├── features
|    │   ├── authSlice.jsx
|    │   └── blogSlice.jsx
|    ├── helper
|    │   └── ToastNotify.jsx
|    ├── pages
|    │   ├── About.jsx
|    │   ├── Dashboard.jsx
|    │   ├── Detail.jsx
|    │   ├── Login.jsx
|    │   ├── MyBlogs.jsx
|    │   ├── NewBlog.jsx
|    │   ├── Profile.jsx
|    │   └── Register.jsx
|    ├── router
|    |    ├── AppRouter.jsx
|    |    └── PrivateRouter.jsx
|    ├── services
|    │   ├── useAuthCalls.jsx
|    │   ├── useAxios.jsx
|    │   └── useBlogCalls.jsx
└── package.json
```

## Technologies I used

- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework with pre-styled components.
- **Redux** Toolkit: Provides a standardized way to write Redux logic, including store configuration and slice management.
- **Redux Toolkit**: A Redux library used for application state management.
- **Redux Persist**: Persist and rehydrate a Redux store.
- **React Redux**: Official React bindings for Redux.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router DOM**: Declarative routing for React applications.
- **Formik**: Form management library for React.
- **Yup**: JavaScript schema builder for value parsing and validation.
- **React Toastify**: Library for creating beautiful toast notifications.

## Dev Tools

- Redux DevTools: A browser extension that allows developers to inspect every action and state change in their Redux application.

## Contributions

I welcome contributions! If you find any bugs, have suggestions, or want to contribute, please open an issue or send a pull request. Your feedback and contributions are greatly appreciated.
