import '../styles/index.scss';

import user2 from '../images/user2.png';

function Preview({ data, className }) {
  console.log(data);
  return (
    <div className="div_preview">
      <a href={`http://localhost:3500/project/${data.idProject}`}>
        <article className="preview__autor">
          <section className="preview__autor--project">
            <p className="line-word">Personal Project Card</p>
            <hr className="line" />
            <h2 className="title">{(data.name) || "Elegant Workspace"}</h2>
            <p className="slogan">{(data.slogan) || "Diseños Exclusivos"}</p>
            <p className="desc">
              {(data.desc) ||
                `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Libero, delectus Voluptates at hic aliquam porro ad suscipit
              harum laboriosam saepe earum `}
            </p>

            <p className="technologies">
              {(data.technologies) || "React JS, MongoDB"}
              <a href={data.demo} target="_blank" rel="noreferrer">
                <i className="globe fa-solid fa-globe"></i>
              </a>
              <a href={data.repo} target="_blank" rel="noreferrer">
                <i className="github fa-brands fa-github"></i>
              </a>
            </p>
          </section>

          <figure className="preview__autor--figure">
            <img className="image" src={data.image || user2} alt="" />
            <figcaption>
              <h3 className="job">{(data.job) || "Full Stack Developer"}</h3>
              <h2 className="name">{(data.autor) || "Emmelie Björklund"}</h2>
            </figcaption>
          </figure>
        </article>
      </a>
    </div>
  )
}

export default Preview;
