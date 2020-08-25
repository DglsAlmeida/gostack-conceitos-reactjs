import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    async function getDatas(){
      const response = await api.get('/repositories');
      setRepositores(response.data);
    }
    getDatas();
  }, [])

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
        title: 'test front end',
        url: 'https://github.com/DglsAlmeida/gostack-conceitos-nodejs',
        techs : [
          'ReactJS',
          'NodeJS'
        ]
    });

    const repository = response.data;
  
    setRepositores([
      ...repositories,
      repository
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repo = repositories.filter(repository => repository.id !== id);
    setRepositores(repo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
