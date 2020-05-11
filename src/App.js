import React, { useState, useEffect } from "react";
import api from './services/api';
import RepoDelButton from './components/RepoDelButton';

import "./styles.css";

 function App() {
    const [repo, setRepo] = useState([]);
    useEffect(() => {
      api.get('repositories').then(result => { setRepo(result.data) });
    }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: `Novo Repositorio ${Date.now()}`,
      url: "www.teste.com.br",
      techs: [ "tech1", "tech2", "tech3"]
    };
    const result = await api.post('repositories', newRepo);
    const addRepo = result.data;
    setRepo([...repo, addRepo]);
  }

  async function handleRemoveRepository(id) {
    var newRepo = [];
    repo.forEach(del => {
      if(del.id != id) newRepo.push(del);
    });
    setRepo(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(repo => <li key={repo.id}>{repo.title}<RepoDelButton action={() => handleRemoveRepository(repo.id)} /></li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
