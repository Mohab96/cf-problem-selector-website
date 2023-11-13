const tags_list = [
    "2-sat",
    "binary search",
    "bitmasks",
    "brute force",
    "chinese remainder theorem ",
    "combinatorics",
    "constructive algorithms",
    "data structures",
    "dfs and similar",
    "divide and conquer",
    "dp",
    "dsu",
    "expression parsing",
    "fft",
    "flows",
    "games",
    "geometry",
    "graph matchings",
    "graphs",
    "greedy",
    "hashing",
    "implementation",
    "interactive",
    "math",
    "matrices",
    "meet-in-the-middle",
    "number theory",
    "probabilities",
    "schedules",
    "shortest paths",
    "sortings",
    "string suffix structures ",
    "strings",
    "ternary search",
    "trees",
    "two pointers",
];

const green = "rgb(51, 172, 113)";
const blue = "rgb(0, 188, 212)";

function tags() {
    let needed_html = "";

    tags_list.forEach((tag) => {
        needed_html += `<button class="tag-btn">${tag}</button>`;
    });

    return needed_html;
}

function dummy_data() {
    let [from, to, problems_cnt] =
    document.getElementsByClassName("another-class");

    from.value = '800';
    to.value = '1000';
    problems_cnt.value = '5';

    add_handle('Mohab_Yaser');

    let btns = document.getElementsByClassName("tag-btn");
    btns[21].style.backgroundColor = green;
    btns[23].style.backgroundColor = green;
    btns[26].style.backgroundColor = green;
}

window.addEventListener("load", () => {
    document.getElementsByClassName("tags-container")[0].innerHTML = tags();

    let btns = document.getElementsByClassName("tag-btn");

    for (let i = 0; i < btns.length; i++) {
        let element = btns[i];

        element.style.backgroundColor = blue;

        element.addEventListener("click", () => {
            if (element.style.backgroundColor == blue) {
                // Include
                element.style.backgroundColor = green;
            } else {
                // Exclude
                element.style.backgroundColor = blue;
            }
        });
    }

    // dummy_data();
});

function http_request(url) {
    let response = fetch(url).then(
        res => {
            if (!res.ok)
                return false;
            else
                return res.json();
        }).then(json => json);

    return response;
}

async function valid_handle(handle) {
    let verdict = await http_request(`https://codeforces.com/api/user.info?handles=${handle}`);
    return verdict;
}

function add_handle(handle) {
    document.getElementsByClassName(
        "accepted-handles"
    )[0].innerHTML += `<div class="accepted-handle tooltip">
            ${handle}
            <span class="tooltiptext">
                Click to remove
            </span>
        </div>`;

    document.getElementById("handles").value = "";

    let acc_handles = document.getElementsByClassName("accepted-handle tooltip");

    for (let i = 0; i < acc_handles.length; i++) {
        acc_handles[i].addEventListener("click", (element) => {
            element.srcElement.remove();
        });
    }
}

document
    .getElementsByClassName("add-handle-btn")[0]
    .addEventListener("click", async() => {
        const handle = document.getElementById("handles").value;

        if (handle === "")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter a handle!",
            });
        else {
            const handle_state = await (valid_handle(handle));
            if (!handle_state) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Enter a valid handle!",
                });
            } else
                add_handle(handle);
        }
    });

function validate_input() {
    let [from, to, problems_cnt] =
    document.getElementsByClassName("another-class");

    from = +from.value;
    to = +to.value;
    problems_cnt = +problems_cnt.value;

    if (from % 100 !== 0 || to % 100 !== 0 || from > to) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid ratings!",
        });
        return false;
    } else if (from > 3500 || from < 800 || to > 3500 || to < 800) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid rating boundaries (800 - 3500)!",
        });
        return false;
    } else if (problems_cnt < 1 || problems_cnt > 50) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a valid number of problems (1 - 50)!",
        });
        return false;
    } else return true;
}

function valid_problem(problem, min, max, problems_out_of_scope, chosen_tags) {
    problems_out_of_scope.forEach((element) => {
        if (element === problem['name'])
            return false;
    });

    let rate = (problem['rating'] !== undefined ? problem['rating'] : 0);

    if (rate < min || rate > max)
        return false;

    problem['tags'].forEach((tag) => {
        if (!chosen_tags.has(tag))
            return false;
    });

    let len = problem['tags'].length;

    if (len === 0)
        return false;

    for (let i = 0; i < len; i++) {
        let tag = problem['tags'][i];
        if (!chosen_tags.has(tag))
            return false;
    }

    return true;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function get_problems() {
    let not_solved_by = [];
    let acc_handles = document.getElementsByClassName("accepted-handle tooltip");

    for (let i = 0; i < acc_handles.length; i++) {
        not_solved_by.push(acc_handles[i].innerText);
    }

    let problems_out_of_scope = new Set();

    not_solved_by.forEach(async(handle) => {
        let url = `https://codeforces.com/api/user.status?handle=${handle}`
        let submissions = await http_request(url);
        submissions['result'].forEach((submission) => {
            if (submission['verdict'] === 'OK')
                problems_out_of_scope.add(submission['problem']['name']);
        });
    });

    let chosen_tags = new Set();

    let all_tags = document.getElementsByClassName("tag-btn");
    for (let i = 0; i < all_tags.length; i++) {
        if (all_tags[i].style.backgroundColor === green)
            chosen_tags.add(all_tags[i].innerText);
    }

    if (chosen_tags.size === 0)
        chosen_tags = new Set(tags_list);

    let problemset = await http_request('https://codeforces.com/api/problemset.problems');
    let available_problems = [];
    let [from, to] = document.getElementsByClassName("another-class");

    from = +from.value;
    to = +to.value;

    let min = Math.max(800, from);
    let max = Math.min(3500, to);

    problemset['result']['problems'].forEach((problem) => {
        if (valid_problem(problem, min, max, problems_out_of_scope, chosen_tags))
            available_problems.push(problem);
    });

    available_problems = shuffle(available_problems);

    let problems_cnt = +(document.getElementsByClassName("another-class")[2].value);

    let final_problems = available_problems.slice(0, problems_cnt);

    return final_problems;
}

function view_problems(problems) {
    let showed_tags = [];
    let showed_ratings = [];
    for (let i = 0; i < problems.length; i++) {
        let problem_container = `
        <div class="problem">
          <button class="code-btn tooltip">
            Code 
            <span class="tooltiptext">
              Click to copy problem code
            </span>
          </button>
          <button class="tags-btn tooltip">
            Click to see tags
          </button>
          <button class="rate-btn tooltip">
            Click to see rating
          </button>
          <a target="_blank" href="https://codeforces.com/problemset/problem/${problems[i]['contestId']}/${problems[i]['index']}">
            Go to problem
          </a>
      </div>`;

        showed_tags.push(problems[i]['tags']);
        showed_ratings.push(problems[i]['rating']);

        document.getElementsByClassName('problems-container')[0].innerHTML += problem_container;
    }

    let tags_btns = document.getElementsByClassName('tags-btn tooltip');

    for (let i = 0; i < tags_btns.length; i++) {
        let btn = tags_btns[i];

        btn.addEventListener("click", () => {
            Swal.fire({title: showed_tags[i]});
        });
    }

    let ratings_btns = document.getElementsByClassName('rate-btn tooltip');

    for (let i = 0; i < ratings_btns.length; i++) {
        let btn = ratings_btns[i];

        btn.addEventListener("click", () => {
            Swal.fire(showed_ratings[i].toString());
        });
    }
}

function remove_old_problems() {
    document.getElementsByClassName('problems-container')[0].innerHTML = '';
}

document.getElementsByClassName("gen-btn")[0].addEventListener("click", async() => {
    if (validate_input() === true) {
        remove_old_problems();
        let problems = await get_problems();
        await view_problems(problems);
    }
});