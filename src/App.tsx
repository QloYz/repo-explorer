import './App.css';
import React, { useState } from "react";
import RepoList from './components/RepoList';
import SearchBar from './components/SearchBar';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

function App() {

  const [repos, setRepos] = useState<Repo[]>([]);
  const fetchRepos = async (username: string) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      console.error(err);
      setRepos([]);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>GitHub Repo Explorer</h1>
      {/* Search bar */}
      <SearchBar onSearch={fetchRepos} />
      {/* Repo list */}
      <RepoList repos={repos} />
    </div>
  );
}

export default App;
