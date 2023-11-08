// const Swal = require("sweetalert2");
// import Swal from "sweetalert2";

function tags() {
  const tags_list = [
    "2-sat",
    "binary search",
    "bitmasks",
    "brute force",
    "combinatorics",
    "constructive algorithms",
    "data structures",
    "dfs and similar",
    "divide and conquer",
    "dp",
    "dsu",
    "expression parsing",
    "fft",
    "flow",
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
    "number theory",
    "probability",
    "schedules",
    "shortest path",
    "sorting",
    "strings",
    "ternary search",
    "trees",
    "two pointers",
  ];

  let needed_html = "";

  tags_list.forEach((tag) => {
    needed_html += `<button class="tag-btn">${tag}</button>`;
  });

  return needed_html;
}

window.addEventListener("load", () => {
  document.getElementsByClassName("tags-container")[0].innerHTML = tags();

  let btns = document.getElementsByClassName("tag-btn");
  const green = "rgb(51, 172, 113)";
  const blue = "rgb(0, 188, 212)";

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
});

async function valid(handle) {
  const url = `https://codeforces.com/api/user.info?handles=${handle}`;

  const instance = axios.create({
    baseURL: url,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 400) {
        return false;
      }
      return Promise.reject(error);
    }
  );

  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    return true;
    // if (response.status === 400) return false;
    // else return true;
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}

function add_handle(handle) {
  // if (document.getElementsByClassName('accepted-handles').length === 0) {
  //     document.getElementsByClassName('handles-container')[0].innerHTML +=
  //         '<div class="accepted-handles"></div>';
  // }

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
      // if (document.getElementsByClassName('accepted-handle tooltip').length === 1)
      //     document.getElementsByClassName('accepted-handles')[0].remove();
      // else
      element.srcElement.remove();
    });
  }
}

document
  .getElementsByClassName("add-handle-btn")[0]
  .addEventListener("click", () => {
    const handle = document.getElementById("handles").value;

    if (handle === "")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter a handle!",
      });
    else if (!valid(handle)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter a valid handle!",
      });
    } else add_handle(handle);
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

function get_problems() {}

function view_problems() {}

document.getElementsByClassName("gen-btn")[0].addEventListener("click", () => {
  if (validate_input() === true) {
    let problems = get_problems();
    view_problems();
  }
});
