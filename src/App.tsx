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
  updated_at: string;
}

type SortOption = "stars" | "forks" | "updated";

function App() {

  const [repos, setRepos] = useState<Repo[]>([]);
  const [filterLanguage, setFilterLanguage] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("stars");

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

  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter((lang): lang is string => !!lang))
  );

  const filteredRepos = repos.filter(
    (repo) => filterLanguage === "All" || repo.language === filterLanguage
  );

  const sortedRepos = [...repos].sort((a, b) => {
  switch (sortBy) {
    case "stars":
      return b.stargazers_count - a.stargazers_count;
    case "forks":
      return b.forks_count - a.forks_count;
    case "updated":
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    default:
      return 0;
  }
});

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div className="App">
      <div className="App-container">
        <header className="App-header">
          <h1>GitHub Repo Explorer</h1>
        </header>
      </div>
    </div>
      <SearchBar onSearch={fetchRepos} />
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Last Updated</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="language">Filter by language: </label>
        <select
          id="language"
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
        >
          <option value="All">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
        <RepoList repos={sortedRepos} />
    </div>
  );
}

export default App;
