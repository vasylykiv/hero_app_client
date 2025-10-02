# Hero App

This is the frontend of hero application built with React and a modern tech stack. The application showcases the main functionality of an CRUD application. This app also allows you to add images, which partly makes it similar to a blog app.

What sets this application apart from others is an interesting way to add photos, with the **ability to drag and drop**, **previews** of images are shown in the upload field, with the ability to delete unnecessary ones.

When you are on the hero page, to change the image, just delete the ones you see from the field or upload additional photos to the field from a computer or phone.

A small validation is implemented for the fields. The application also uses routing capabilities, that is, it is divided into two parts, a list of all heroes and a page for each individual one. To go to an individual hero, you need to click on any item in the list and you will be redirected to the hero page.

The application also has an implemented pagination system.

You can only upload images in **jpg** and **png** format, and no more than **5 images**.

---
<h3>Backend part: https://github.com/vasylykiv/hero_app_server.git</h3>

---


## 🎨 Screenshots

### Hero List

| Home page (Empty)                                                                                                                                         | Home page (Add new hero)                                                                                                                                   | Home page                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/vasylykiv/hero_app_client/blob/96ba907fe08da4966a40d072b111adfe74ead13d/app_previews/1_page_without_heroes.png" width="260"> | <img src="https://github.com/vasylykiv/hero_app_client/blob/96ba907fe08da4966a40d072b111adfe74ead13d/app_previews/2_page_create_new_hero.png" width="260"> | <img src="https://github.com/vasylykiv/hero_app_client/blob/96ba907fe08da4966a40d072b111adfe74ead13d/app_previews/3_page_with_heroes.png" width="260"> |

---

### Hero Page

| Hero page                                                                                                                                       | Hero page (edit)                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/vasylykiv/hero_app_client/blob/96ba907fe08da4966a40d072b111adfe74ead13d/app_previews/4_page_hero.png" width="260"> | <img src="https://github.com/vasylykiv/hero_app_client/blob/96ba907fe08da4966a40d072b111adfe74ead13d/app_previews/5_page_hero_edit.png" width="260"> |

## 🚀 Tech Stack

This project is built using the following technologies and libraries:

- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - A strongly typed programming language that builds on JavaScript.
- **[React Hook Form](https://react-hook-form.com/)** - Performant, flexible and extensible forms with easy-to-use validation.
- **[React Router](https://reactrouter.com/)** - A user‑obsessed, standards‑focused, multi‑strategy router you can deploy anywhere.
- **[React Dropzone](https://react-dropzone.js.org/)** - Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
- **[Axios](https://axios-http.com/)** - Promise based HTTP client for the browser and node.js

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

**1. Clone the repo:**

```bash
git clone https://github.com/vasylykiv/hero_app_client.git
```

**2. Navigate to the project directory:**

```bash
cd hero_app_client
```

**3. Install NPM packages:**

```bash
npm install
```

**4. Run the development server:**

```bash
npm run dev
```

After this, open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application.
