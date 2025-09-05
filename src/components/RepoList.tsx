import React from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => (
        <div key={repo.id} style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <strong>{repo.name}</strong>
          </a>
          <p>{repo.description}</p>
          <p>
            ⭐ {repo.stargazers_count} | Forks: {repo.forks_count} | Language: {repo.language}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
export {}; 

