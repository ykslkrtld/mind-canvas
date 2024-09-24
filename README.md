# Mind Canvas

Mind Canvas is an engaging platform that empowers users to craft, publish, and manage their personal blogs. It offers a space for creativity and community interaction, where users can share their thoughts and engage with a wide range of content.

## 🌐 Live Demo

Check out the live demo of the application [here](https://mind-canvas-ykslkrtld.vercel.app/).

## ✨ Features

- **Blog Creation & Management**: Forge and curate your personal blog space with full editorial control.
- **Discover & Read**: Immerse yourself in a diverse universe of user-generated content.
- **Engage**: Connect with authors through comments and appreciation.
- **Profile Customization**: Personalize your blogging identity.

## 🚀 Installation

Embark on your Mind Canvas journey:

```bash
# Clone the repository
git clone https://github.com/ykslkrtld/mind-canvas.git

# Enter the project directory
cd mind-canvas

# Install dependencies
yarn install

# Fire up the application
yarn start

# Visit http://localhost:3000 in your browser
```

## 🔧 Usage

- **Explore:** Start on the home page to catch up with the latest posts.
- **Authenticate:** Sign up or log in to unlock full interaction capabilities.
- **Read & Interact:** Dive into blogs and connect with the community.
- **Create & Curate:** Publish your blogs or save drafts for later refinement.
- **Personalize:** Manage your profile and settings for a tailored experience.

     
## 📁 Project Structure

```bash
Mind Canvas
│
├── public
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── index.css
│   ├── index.js
│   ├── App.js
│   ├── App.css
│   ├── app
│   │   ├── store.jsx
│   ├── assets
│   │   ├── loading.gif
│   ├── components
│   │   ├── blog
│   │   │   ├── BlogCard.jsx
│   │   │   ├── CommentCard.jsx
│   │   │   ├── CommentForm.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── MyBlogCard.jsx
│   │   │   ├── UpdateBlogModal.jsx
│   │   │   ├── UpdateProfileModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   ├── features
│   │   ├── authSlice.jsx
│   │   └── blogSlice.jsx
│   ├── helper
│   │   └── ToastNotify.jsx
│   ├── pages
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Detail.jsx
│   │   ├── Login.jsx
│   │   ├── MyBlogs.jsx
│   │   ├── NewBlog.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── router
│   │   ├── AppRouter.jsx
│   │   └── PrivateRouter.jsx
│   ├── services
│   │   ├── useAuthCalls.jsx
│   │   ├── useAxios.jsx
│   │   └── useBlogCalls.jsx
├── package.json
├── README.md
└── yarn.lock

```

## 🛠 Technologies Utilized

- **React:** For crafting dynamic and responsive user interfaces.
- **Material UI:** For sleek, pre-styled React components.
- **Redux Toolkit & React Redux:** For efficient state management.
- **Axios:** For streamlined API interactions.
- **React Router DOM:** For intuitive app navigation.
- **Formik & Yup:** For robust form handling and validation.
- **React Toastify:** For delightful notification prompts.

## 🛠️ Development Tools

- **Redux DevTools:** For a transparent view of state transitions and actions.

## 🤝 How to Contribute

Join the Mind Canvas community! Report bugs, suggest enhancements, or submit pull requests. Your insights help us grow.
