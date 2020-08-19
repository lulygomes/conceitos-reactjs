import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])


  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: 'Teste',
      url: 'http://teste.com',
      techs: [
        'Techs test1',
        'Techs test2',
      ]
    }
    const response = await api.post('repositories', repository)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id, index) {
    api.delete(`repositories/${id}`)
    repositories.splice(index, 1)
    setRepositories([...repositories])
  }

  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id, index)}>
                Remover
              </button>
            </li>

          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
