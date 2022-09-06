import { useEffect, useState } from 'react';

type Repos = {
  name: string;
  description: string;
}

export function App() {
  const [repos, setRepos] = useState<Repos[]>([]);
  // const [filteredRepos, setFilteredRepos] = useState<Repos[]>([]);
  const [search, setSearch] = useState('');

  console.log('Renderizou')

  useEffect(()=> {
    fetch('https://api.github.com/users/lfoalves/repos')
    .then(response => response.json())
    .then(repositorys => setRepos(repositorys))
    .catch(error => console.error(error))
  }, [])

  const filteredRepos = search.length > 0
    ? repos.filter(repos => repos.name.includes(search))
    : [];

  // useEffect(()=> {
  //   if (search.length) {
  //     setFilteredRepos(repos.filter(repo => repo.name.includes(search)))
  //   }
  // }, [search])


  return (
    <div>
      <h1>Repositórios de @lfoalves</h1>
      <h3>Derived States</h3>
      <form action="">
        <input 
        type="text" 
        placeholder='Search images'
        onChange={e => setSearch(e.target.value)}
        value={search}
        />
        <input type="submit" value={'Send'}/>
      </form>
      
      { search.length > 0 ? (
        <ul>
          {filteredRepos.map(repo => {
            return(
              <li key={repo.name}>
                {repo.name}
              </li>
            )
          })}
        </ul>
      ) : (
        <ul>
          {repos.map(repo => {
            return(
              <li key={repo.name}>
                {repo.name}
              </li>
            )
          })}
        </ul>
      )
      }
    </div>
  )
}
