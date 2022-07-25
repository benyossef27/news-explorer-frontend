import { baseUrl } from "./consts";
// const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    const data = res.json();
    return data;
  } else {
    return Promise.reject(res);
  }
}

const register = async (email, password, username) => {
  const res = await fetch(
    `${baseUrl}/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: username
      }),
    });
  return checkResponse(res);
};

const login = async (email, password) => {
  const res = await fetch(
    `${baseUrl}/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
  return checkResponse(res);
}

const getUserData = async () => {
  const res = await fetch(
    `${baseUrl}/users/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  return checkResponse(res);
}

const saveArticle = async (article) => {
  const res = await fetch(
    `${baseUrl}/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        keyword: localStorage.getItem('keyWord'),
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image || "https://raw.githubusercontent.com/IliaZaidin/news-explorer-frontend/main/public/logo192.png"
      })
    });
  return checkResponse(res);
}

const deleteArticle = async (article) => {
  const res = await fetch(
    `${baseUrl}/articles/${article._id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('jwt')}`,
    }
  });
  return checkResponse(res);
}

const getArticlesFromDb = async () => {
  const res = await fetch(
    `${baseUrl}/articles`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('jwt')}`
    }
  });
  return checkResponse(res);
}

export { register, login, getUserData, saveArticle, deleteArticle, getArticlesFromDb };