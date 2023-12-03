import Preview from './Preview';
import api from '../services/api';
import { useEffect, useState } from 'react';

function Landing() {
  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getDataProjects();
      console.log(data);
      setListProject(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {listProject.map((project) => {
        return <Preview className="preview" data={project} />;
      })}

    </>
  );
}

export default Landing;
