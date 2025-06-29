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

function toggleHelp() {
  let helpList = document.getElementById("help-list");
  let expandHelp = document.getElementById("expand-help");
  
  if (helpList.style.display === "none" || helpList.style.display === "") {
    helpList.style.display = "block";
    expandHelp.classList.add("expanded");
    helpList.classList.add("fade-in");
  } else {
    helpList.style.display = "none";
    expandHelp.classList.remove("expanded");
  }
}

document.getElementById("expand-help").addEventListener("click", toggleHelp);

function disableBtn(button) {
  button.disabled = true;
  button.style.opacity = "0.6";
  button.style.cursor = "not-allowed";
}

function enableBtn(button) {
  button.disabled = false;
  button.style.opacity = "1";
  button.style.cursor = "pointer";
}

const green = "rgb(51, 172, 113)";
const blue = "rgb(0, 188, 212)";

function tags() {
  let needed_html = "";

  tags_list.forEach((tag) => {
    needed_html += `<button class="tag-btn" data-tag="${tag}">${tag}</button>`;
  });

  return needed_html;
}

function dummy_data() {
  let [from, to, problems_cnt] =
    document.getElementsByClassName("another-class");

  from.value = "800";
  to.value = "800";
  problems_cnt.value = "2";

  add_handle("Mohab_Yaser");

  document.getElementById("handles").value =
    "Mohab_Yaser,Mostafa__Fouad,JOE002";

  let btns = document.getElementsByClassName("tag-btn");
  btns[21].classList.add("selected");
  btns[23].classList.add("selected");
  btns[26].classList.add("selected");

  let problem_container = `
        <div class="problem fade-in">
          <div class="problem-info">
            <h3>Problem Title</h3>
            <p>Problem description goes here...</p>
          </div>
          <button class="code-btn tooltip">
            Copy Code
          </button>
          <button class="tags-btn tooltip">
            View Tags
          </button>
          <button class="rate-btn tooltip">
            View Rating
          </button>
          <a target="_blank" href="https://codeforces.com/problemset/problem/" class="problem-link">
            Go to problem
          </a>
      </div>`;

  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
  document.getElementsByClassName("problems-container")[0].innerHTML +=
    problem_container;
}

document
  .getElementsByClassName("storage-reset")[0]
  .addEventListener("click", () => {
    Swal.fire({
      title: "Reset Preferences",
      text: "Are you sure you want to reset all saved preferences?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reset!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        location.reload();
      }
    });
  });

document
  .getElementsByClassName("storage-save")[0]
  .addEventListener("click", () => {
    let tags_btns = document.getElementsByClassName("tag-btn");
    let tags = "";
    for (let i = 0; i < tags_btns.length; i++) {
      let tag = tags_btns[i];
      if (tag.classList.contains("selected")) {
        tags += i.toString() + ",";
      }
    }

    tags = tags.slice(0, -1);

    let [from, to, problems_cnt] =
      document.getElementsByClassName("another-class");
    from = from.value;
    to = to.value;
    problems_cnt = problems_cnt.value;

    let found_handles = document.getElementsByClassName(
      "accepted-handle"
    );
    let handles = "";

    for (let i = 0; i < found_handles.length; i++) {
      handles += found_handles[i].innerText.replace("×", "").trim() + ",";
    }

    handles = handles.slice(0, -1);

    localStorage.setItem("tags", tags);
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
    localStorage.setItem("problems_cnt", problems_cnt);
    localStorage.setItem("handles", handles);
    
    Swal.fire({
      title: "Preferences Saved!",
      text: "Your preferences have been saved successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });
  });

function load_from_local_storage() {
  let tags_btns = document.getElementsByClassName("tag-btn");
  let tags = localStorage.getItem("tags");

  if (tags === null) return;

  tags = localStorage.getItem("tags").split(",");

  if (tags.length > 1) {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] !== "") {
        tags_btns[+tags[i]].classList.add("selected");
      }
    }
  }

  let [from, to, problems_cnt] =
    document.getElementsByClassName("another-class");
  from.value = localStorage.getItem("from") || "";
  to.value = localStorage.getItem("to") || "";
  problems_cnt.value = localStorage.getItem("problems_cnt") || "";

  let handles = localStorage.getItem("handles");
  if (handles) {
    handles = handles.trim().split(",");

    for (let i = 0; i < handles.length; i++) {
      if (handles[i] != "") add_handle(handles[i]);
    }
  }
}

window.addEventListener("load", () => {
  document.getElementsByClassName("tags-container")[0].innerHTML = tags();

  let btns = document.getElementsByClassName("tag-btn");

  for (let i = 0; i < btns.length; i++) {
    let element = btns[i];

    element.addEventListener("click", () => {
      element.classList.toggle("selected");
    });
  }

  load_from_local_storage();
  //   dummy_data();
});

function http_request(url) {
  let response = fetch(url)
    .then((res) => {
      if (!res.ok) return false;
      else return res.json();
    })
    .then((json) => json);

  return response;
}

async function valid_handle(handle) {
  let verdict = await http_request(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );
  return verdict;
}

function add_handle(handle) {
  if (document.getElementsByClassName("accepted-handle").length === 0)
    document.getElementsByClassName("accepted-handles")[0].style.display =
      "block";

  document.getElementsByClassName(
    "accepted-handles"
  )[0].innerHTML += `<div class="accepted-handle fade-in">
            ${handle}
        </div>`;

  document.getElementById("handles").value = "";

  let acc_handles = document.getElementsByClassName("accepted-handle");

  for (let i = 0; i < acc_handles.length; i++) {
    acc_handles[i].addEventListener("click", (element) => {
      element.target.style.transform = "scale(0.8)";
      setTimeout(() => {
        element.target.remove();
        if (
          document.getElementsByClassName("accepted-handle").length === 0
        )
          document.getElementsByClassName("accepted-handles")[0].style.display =
            "none";
      }, 200);
    });
  }
}

function already_entered(handle) {
  let already_entered_handles = document.getElementsByClassName(
    "accepted-handle"
  );
  for (let i = 0; i < already_entered_handles.length; i++) {
    if (already_entered_handles[i].innerText.replace("×", "").trim() == handle) return true;
  }

  return false;
}

document
  .getElementsByClassName("add-handle-btn")[0]
  .addEventListener("click", async () => {
    disableBtn(document.getElementsByClassName("add-handle-btn")[0]);
    let handles = document.getElementById("handles").value;
    handles = handles.split(",");
    handles = new Set(handles);

    handles.forEach(async (handle) => {
      handle = handle.trim();
      if (handle === "")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Enter a handle!",
        });
      else {
        const valid = await valid_handle(handle);
        if (!valid) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid handle!",
          });
        } else if (already_entered(handle)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `You have already entered the handle ${handle} before`,
          });
        } else add_handle(handle);
      }
    });

    enableBtn(document.getElementsByClassName("add-handle-btn")[0]);
  });

// Add Enter key support for handles input
document.getElementById("handles").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementsByClassName("add-handle-btn")[0].click();
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
      title: "Invalid Rating Range",
      text: "Please enter valid ratings (must be multiples of 100 and 'from' must be less than 'to')!",
    });
    return false;
  } else if (from > 3500 || from < 800 || to > 3500 || to < 800) {
    Swal.fire({
      icon: "error",
      title: "Invalid Rating Boundaries",
      text: "Please enter valid rating boundaries (800 - 3500)!",
    });
    return false;
  } else if (problems_cnt < 1 || problems_cnt > 50) {
    Swal.fire({
      icon: "error",
      title: "Invalid Problem Count",
      text: "Please enter a valid number of problems (1 - 50)!",
    });
    return false;
  } else return true;
}

function valid_problem(problem, min, max, problems_out_of_scope, chosen_tags) {
  if (problems_out_of_scope.has(problem["name"])) return false;

  let rate = problem["rating"] !== undefined ? problem["rating"] : 0;

  if (rate < min || rate > max) return false;

  problem["tags"].forEach((tag) => {
    if (!chosen_tags.has(tag)) return false;
  });

  let len = problem["tags"].length;

  if (len === 0) return false;

  for (let i = 0; i < len; i++) {
    let tag = problem["tags"][i];
    if (!chosen_tags.has(tag)) return false;
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
  let acc_handles = document.getElementsByClassName("accepted-handle");

  for (let i = 0; i < acc_handles.length; i++) {
    not_solved_by.push(acc_handles[i].innerText.replace("×", "").trim());
  }

  let problems_out_of_scope = new Set();

  for (let handle of not_solved_by) {
    let url = `https://codeforces.com/api/user.status?handle=${handle}`;
    let submissions = await http_request(url);
    if (submissions && submissions["result"]) {
      submissions["result"].forEach((submission) => {
        if (submission["verdict"] === "OK") {
          problems_out_of_scope.add(submission["problem"]["name"]);
        }
      });
    }
  }

  let chosen_tags = new Set();

  let all_tags = document.getElementsByClassName("tag-btn");
  for (let i = 0; i < all_tags.length; i++) {
    if (all_tags[i].classList.contains("selected"))
      chosen_tags.add(all_tags[i].innerText);
  }

  if (chosen_tags.size === 0) chosen_tags = new Set(tags_list);

  let problemset = await http_request(
    "https://codeforces.com/api/problemset.problems"
  );
  let available_problems = [];
  let [from, to, problems_cnt] =
    document.getElementsByClassName("another-class");

  from = +from.value;
  to = +to.value;
  problems_cnt = +problems_cnt.value;

  let min = Math.max(800, from);
  let max = Math.min(3500, to);

  if (problemset && problemset["result"] && problemset["result"]["problems"]) {
    problemset["result"]["problems"].forEach((problem) => {
      if (valid_problem(problem, min, max, problems_out_of_scope, chosen_tags))
        available_problems.push(problem);
    });
  }

  available_problems = shuffle(available_problems);

  if (available_problems.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No Problems Found",
      text: "There are no problems available with the current criteria. Try adjusting your filters.",
    });

    return false;
  }
  let final_problems = available_problems.slice(
    0,
    Math.min(problems_cnt, available_problems.length)
  );
  if (available_problems.length < problems_cnt) {
    Swal.fire({
      icon: "warning",
      title: "Limited Results",
      text: `Only ${available_problems.length} problems are available, but you requested ${problems_cnt} problems. Please adjust your filters or check back later.`,
    });
  }

  return final_problems;
}

function view_problems(problems) {
  document.getElementsByClassName("problems-container")[0].style.display =
    "block";

  let showed_tags = [];
  let showed_ratings = [];
  let showed_codes = [];
  let showed_names = [];
  
  for (let i = 0; i < problems.length; i++) {
    let problem_container = `
        <div class="problem fade-in">
          <div class="problem-info">
            <h3>${problems[i]["name"]}</h3>
            <p>Contest: ${problems[i]["contestId"]}</p>
          </div>
          <button class="code-btn tooltip">
            Copy Code
          </button>
          <button class="tags-btn tooltip">
            View Tags
          </button>
          <button class="rate-btn tooltip">
            View Rating
          </button>
          <a target="_blank" href="https://codeforces.com/problemset/problem/${problems[i]["contestId"]}/${problems[i]["index"]}" class="problem-link">
            Go to problem
          </a>
      </div>`;

    showed_tags.push(problems[i]["tags"]);
    showed_ratings.push(problems[i]["rating"]);
    showed_codes.push(`${problems[i]["contestId"]}${problems[i]["index"]}`);
    showed_names.push(problems[i]["name"]);

    document.getElementsByClassName("problems-container")[0].innerHTML +=
      problem_container;
  }

  let tags_btns = document.getElementsByClassName("tags-btn tooltip");

  for (let i = 0; i < tags_btns.length; i++) {
    let btn = tags_btns[i];

    btn.addEventListener("click", () => {
      Swal.fire({
        title: "Problem Tags",
        html: `<div style="text-align: left;">${showed_tags[i].map(tag => `<span style="display: inline-block; background: #6366f1; color: white; padding: 4px 8px; margin: 2px; border-radius: 4px; font-size: 12px;">${tag}</span>`).join('')}</div>`,
        confirmButtonText: "Close"
      });
    });
  }

  let ratings_btns = document.getElementsByClassName("rate-btn tooltip");

  for (let i = 0; i < ratings_btns.length; i++) {
    let btn = ratings_btns[i];

    btn.addEventListener("click", () => {
      Swal.fire({
        title: "Problem Rating",
        text: `Rating: ${showed_ratings[i]}`,
        icon: "info",
        confirmButtonText: "Close"
      });
    });
  }

  let codes_btns = document.getElementsByClassName("code-btn tooltip");

  for (let i = 0; i < codes_btns.length; i++) {
    let btn = codes_btns[i];

    btn.addEventListener("click", () => {
      // Check if clipboard API is supported [requires HTTPS]
      if (navigator.clipboard) {
        navigator.clipboard.writeText(showed_codes[i]);
      }
      // Fallback is the solution for browsers without clipboard API or insecure connections
      else {
        const textArea = document.createElement("textarea");
        textArea.value = showed_codes[i];
        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
      }
      Swal.fire({
        title: "Code Copied!",
        text: `Problem code "${showed_codes[i]}" has been copied to clipboard.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
    });
  }
}

function remove_old_problems() {
  document.getElementsByClassName("problems-container")[0].innerHTML = "";
  document.getElementsByClassName("problems-container")[0].style.display =
    "none";
}

document
  .getElementsByClassName("gen-btn")[0]
  .addEventListener("click", async () => {
    disableBtn(document.getElementsByClassName("gen-btn")[0]);
    
    // Show loading state
    const genBtn = document.getElementsByClassName("gen-btn")[0];
    const originalText = genBtn.textContent;
    genBtn.textContent = "Generating...";
    
    if (validate_input() === true) {
      remove_old_problems();
      let problems = await get_problems();
      if (problems !== false) await view_problems(problems);
    }
    
    // Restore button state
    genBtn.textContent = originalText;
    enableBtn(document.getElementsByClassName("gen-btn")[0]);
  });

document.querySelector("#github span").addEventListener("click", () => {
  window.open("https://github.com/Mohab96", "_blank");
});

document.querySelector("#github img").addEventListener("click", () => {
  window.open("https://github.com/Mohab96", "_blank");
});

// Visitor Counter Functionality
function updateVisitorCount() {
  // Get current visitor count from localStorage
  let visitorCount = localStorage.getItem('visitorCount');
  
  // If no count exists, initialize it
  if (!visitorCount) {
    visitorCount = 0;
  } else {
    visitorCount = parseInt(visitorCount);
  }
  
  // Increment the count for this visit
  visitorCount++;
  
  // Save the updated count
  localStorage.setItem('visitorCount', visitorCount.toString());
  
  // Update the display
  const counterElement = document.getElementById('visitor-count');
  if (counterElement) {
    // Animate the number change
    animateNumber(counterElement, parseInt(localStorage.getItem('visitorCount') || 0) - 1, visitorCount);
  }
}

function animateNumber(element, start, end) {
  const duration = 1000; // 1 second
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

// Initialize visitor count when page loads
window.addEventListener('load', () => {
  updateVisitorCount();
  
  // Also initialize the display for existing visitors
  const visitorCount = localStorage.getItem('visitorCount') || 0;
  const counterElement = document.getElementById('visitor-count');
  if (counterElement) {
    counterElement.textContent = parseInt(visitorCount).toLocaleString();
  }
});

// Accordion Functionality
function toggleAccordion(sectionId) {
  const content = document.getElementById(`${sectionId}-content`);
  const icon = document.getElementById(`${sectionId}-icon`);
  
  if (content.classList.contains('collapsed')) {
    // Expand
    content.classList.remove('collapsed');
    icon.classList.remove('collapsed');
  } else {
    // Collapse
    content.classList.add('collapsed');
    icon.classList.add('collapsed');
  }
}

// Update handle count display
function updateHandleCount() {
  const handleCount = document.getElementsByClassName('accepted-handle').length;
  const countElement = document.getElementById('handle-count');
  if (countElement) {
    countElement.textContent = `(${handleCount} handle${handleCount !== 1 ? 's' : ''})`;
  }
}

// Initialize accordion state
window.addEventListener('load', () => {
  // Start with Configuration expanded and Handles collapsed
  const configContent = document.getElementById('config-content');
  const handlesContent = document.getElementById('handles-content');
  const configIcon = document.getElementById('config-icon');
  const handlesIcon = document.getElementById('handles-icon');
  
  // Configuration starts expanded
  configContent.classList.remove('collapsed');
  configIcon.classList.remove('collapsed');
  
  // Handles starts collapsed
  handlesContent.classList.add('collapsed');
  handlesIcon.classList.add('collapsed');
  
  // Update initial handle count
  updateHandleCount();
});

// Override the existing add_handle function to update count
const originalAddHandle = add_handle;
add_handle = function(handle) {
  originalAddHandle.call(this, handle);
  updateHandleCount();
};

// Also update count when handles are removed
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('accepted-handle')) {
    // Wait a bit for the removal animation to complete
    setTimeout(updateHandleCount, 250);
  }
});
