export default function About() {
  return (
    <section className="about">
      <div className="about__wrapper">
        <div className="about__avatar"></div>
        <div className="about__text-wrapper">
          <h2 className="about__title">About the author</h2>
          <p className="about__subtitle">
            Hi, my name is Benyo, and I am a FullStack web Developer.
          </p>
          <p className="about__subtitle">
            This is my final project in the Full Stack Developer Bootcamp at
            Practicum by Yandex. The project's Frontend uses React and the
            Backend/API uses Node.js, Express.js, MongoDB, Mongoose, AWS. This
            app allows users to search news/articles using a public News API
            service.
          </p>
          <p className="about__subtitle">
            The Practicum's curriculum provided a wide range of projects based
            on the following Full Stack Development technologies: HTML5, CSS3,
            flexbox, grid layout, BEM, Media queries, transition,
            JavaScript/JSX, DOM, Debugging, Git, Git/Github, Figma, Form
            validation, OOP, Webpack, NPM, React, React components, React Hooks,
            Node.js, Express.js, Database, MongoDB, Mongoose, Microsoft Azure.
          </p>
        </div>
      </div>
    </section>
  );
}
