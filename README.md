# 🧠 Bamlaa.fi

## 🎯 Project Idea

**Bamlaa.fi** is a web application focused on teaching *Stadin Slangi* (Helsinki slang).  
It includes both a public-facing interface and an admin dashboard.

**Target users:** Slang enthusiasts, students and developers.


## 🖥️ Public Interface

- ✅ **Word of the Day**  
  Displays a random word from the main database on the homepage.

- ✅ **Word Suggestion Form**  
  Allows users to submit new slang words or usage examples.

<img src="https://github.com/eemuston/bamlaa_app/blob/main/frontend_bamlaa/public/home.png?raw=true" alt="home screen" width="400"/>

- ✅ **Vocabulary Browser**  
  A list of all approved slang words from the main database.

<img src="https://github.com/eemuston/bamlaa_app/blob/main/frontend_bamlaa/public/vocabulary.png?raw=true" alt="home screen" width="400"/>

- ✅ **Practice Quiz**  
  Users are shown either a Finnish or slang word and must choose the correct translation from four options.

<img src="https://github.com/eemuston/bamlaa_app/blob/main/frontend_bamlaa/public/quiz.png?raw=true" alt="home screen" width="400"/>

- ✅ **API Documentation View**  
  Public GET endpoint at `/api/words` for use in external projects.  
  Includes usage instructions and example queries.

<img src="https://github.com/eemuston/bamlaa_app/blob/main/frontend_bamlaa/public/documentation.png?raw=true" alt="home screen" width="400"/>

## 🔒 Admin Dashboard

- 🔧 **Token-based Login / Hidden Route**

- ✏️ **Add New Quiz Words**  
  Admins can add new words to the quiz-specific database.

- ✅ **Approve Word Suggestions**  
  - Moves the word to the main database  
  - Deletes it from the suggestions database

- ❌ **Reject Word Suggestions**  
  - Deletes the word from the suggestions database

<img src="https://github.com/eemuston/bamlaa_app/blob/main/frontend_bamlaa/public/dashboard.png?raw=true" alt="home screen" width="400"/>

## 🗃️ Databases (MongoDB Atlas)

- `words` – Approved slang words  
  - Fields: word, translation, usage example

- `suggestions` – User-submitted suggestions  
  - Fields: word, translation, usage example

- `users` – Admin user data

## 🧱 Technologies Used

- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT token (admin login) 

[Watch the demo on YouTube](https://youtu.be/fKW5mDNtJkk)
