const repositoryList = document.querySelector("#repositories");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository-card";

      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;

      const description = document.createElement("p");
      description.textContent = repository.description;

      const details = document.createElement("small");
      details.textContent = `${repository.language} · Starred ${repository.starred_at}`;

      item.append(link, description, details);
      repositoryList.append(item);
    }

    statusMessage.textContent = `${repositories.length} starred repositories.`;
  } catch (error) {
    statusMessage.textContent = "Repositories could not be loaded.";
    console.error(error);
  }
}

loadRepositories();
