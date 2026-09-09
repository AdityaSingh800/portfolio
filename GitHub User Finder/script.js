let usernameInput =
    document.getElementById("usernameInput");

let searchButton =
    document.getElementById("searchButton");

let profile =
    document.getElementById("profile");

let repositories =
    document.getElementById("repositories");

let repoSearch =
    document.getElementById("repoSearch");

let repoCount =
    document.getElementById("repoCount");


let allRepositories = [];


// ==============================
// SEARCH USER
// ==============================

async function searchUser() {

    let username =
        usernameInput.value.trim();


    if (username === "") {

        profile.textContent =
            "Please enter a GitHub username.";

        repositories.innerHTML = "";

        repoCount.textContent = "";

        return;
    }


    try {

        profile.textContent = "Loading...";

        repositories.innerHTML = "";

        repoCount.textContent = "";


        let response = await fetch(
            `https://api.github.com/users/${username}`
        );


        if (!response.ok) {

            throw new Error("User not found.");
        }


        let user =
            await response.json();


        displayProfile(user);


        getRepositories(username);

    }


    catch (error) {

        profile.textContent =
            "User not found. Please check the username.";

        repositories.innerHTML = "";

        repoCount.textContent = "";

        console.log(error);

    }

}


// ==============================
// DISPLAY PROFILE
// ==============================

function displayProfile(user) {

    profile.innerHTML = `

        <img
            src="${user.avatar_url}"
            class="profile-image"
        >

        <h2>
            ${user.name || "No name"}
        </h2>

        <p class="username">
            @${user.login}
        </p>

        <p>
            ${user.bio || "No bio available."}
        </p>

        <p>
            📍
            ${user.location || "Location not available"}
        </p>

        <p>
            🏢
            ${user.company || "No company"}
        </p>

        <div class="stats">

            <div class="stat">

                <strong>
                    ${user.followers}
                </strong>

                Followers

            </div>


            <div class="stat">

                <strong>
                    ${user.following}
                </strong>

                Following

            </div>


            <div class="stat">

                <strong>
                    ${user.public_repos}
                </strong>

                Repositories

            </div>

        </div>


        <a
            href="${user.html_url}"
            target="_blank"
            class="profile-link"
        >
            View GitHub Profile
        </a>

    `;
}


// ==============================
// GET REPOSITORIES
// ==============================

async function getRepositories(username) {

    repositories.innerHTML =
        "<p>Loading repositories...</p>";


    try {

        let response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );


        if (!response.ok) {

            throw new Error(
                "Repositories not found."
            );
        }


        let repos =
            await response.json();


        // Challenge 1:
        // Sort by most stars

        repos.sort(function(a, b) {

            return b.stargazers_count -
                   a.stargazers_count;

        });


        allRepositories = repos;


        displayRepositories(repos);


        // Challenge 4:
        // Find most starred repository

        findMostStarred(repos);

    }


    catch (error) {

        repositories.innerHTML =
            "<p>Could not load repositories.</p>";

        repoCount.textContent = "";

        console.log(error);

    }

}


// ==============================
// DISPLAY REPOSITORIES
// ==============================

function displayRepositories(repos) {

    repositories.innerHTML = "";


    // Challenge 3:
    // Repository count

    repoCount.textContent =
        `Showing ${repos.length} repositories`;


    if (repos.length === 0) {

        repositories.innerHTML =
            "<p>No repositories found.</p>";

        return;
    }


    repos.forEach(function(repo) {

        let div =
            document.createElement("div");


        div.classList.add("repository");


        div.innerHTML = `

            <h3>
                ${repo.name}
            </h3>

            <p>
                ${repo.description || "No description"}
            </p>

            <p>
                ⭐ Stars:
                ${repo.stargazers_count}
            </p>

            <p>
                🍴 Forks:
                ${repo.forks_count}
            </p>

            <p>
                💻 Language:
                ${repo.language || "Not specified"}
            </p>

            <a
                href="${repo.html_url}"
                target="_blank"
            >
                View Repository
            </a>

        `;


        repositories.appendChild(div);

    });

}


// ==============================
// CHALLENGE 2
// JAVASCRIPT REPOSITORIES
// ==============================

function showJavaScriptRepositories() {

    let javascriptRepos =
        allRepositories.filter(function(repo) {

            return repo.language === "JavaScript";

        });


    displayRepositories(javascriptRepos);

}


// ==============================
// BONUS 1
// SEARCH REPOSITORIES
// ==============================

repoSearch.addEventListener(
    "input",
    function() {

        let searchText =
            repoSearch.value
                .toLowerCase()
                .trim();


        let filteredRepos =
            allRepositories.filter(function(repo) {

                return repo.name
                    .toLowerCase()
                    .includes(searchText);

            });


        displayRepositories(filteredRepos);

    }
);


// ==============================
// BONUS 2
// MOST STARRED REPOSITORY
// USING reduce()
// ==============================

function findMostStarred(repos) {

    if (repos.length === 0) {

        return;
    }


    let mostStarred =
        repos.reduce(function(previous, current) {

            if (
                current.stargazers_count >
                previous.stargazers_count
            ) {

                return current;

            }

            else {

                return previous;

            }

        });


    console.log(
        "Most starred repository:",
        mostStarred.name
    );

    console.log(
        "Stars:",
        mostStarred.stargazers_count
    );

}


// ==============================
// SEARCH BUTTON
// ==============================

searchButton.addEventListener(
    "click",
    searchUser
);


// ==============================
// ENTER KEY
// ==============================

usernameInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchUser();

        }

    }
);

let javascriptButton =
    document.getElementById("javascriptButton");

let allReposButton =
    document.getElementById("allReposButton");


javascriptButton.addEventListener(
    "click",
    showJavaScriptRepositories
);


allReposButton.addEventListener(
    "click",
    function() {

        displayRepositories(allRepositories);

    }
);