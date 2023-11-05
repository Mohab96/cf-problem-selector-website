// const Swal = require('sweetalert2')
// import Swal from 'sweetalert2'


let btns = document.getElementsByClassName('tag-btn');

for (let i = 0; i < btns.length; i++) {
    let element = btns[i];
    let green = "rgb(51, 172, 113)";
    let blue = "rgb(0, 188, 212)";

    element.style.backgroundColor = blue;

    element.addEventListener("click",
        () => {
            if (element.style.backgroundColor == blue) {
                // Include
                element.style.backgroundColor = green;
            } else {
                // Exclude
                element.style.backgroundColor = blue;
            }
        }
    );
}

let rating_slider = document.getElementById('rating');

rating_slider.addEventListener("change",
    () => {
        // console.log(rating_slider.value);
    });

function valid_handle(handle) {
    if (handle == '')
        return false;

    let url = `https://codeforces.com/api/user.status?handle=${handle}`;
    return true;
}

let add_handle_btn = document.getElementsByClassName('add-handle-btn')[0];

add_handle_btn.addEventListener('click',
    () => {
        let handle = document.getElementById('handles').value;

        if (valid_handle(handle)) {

        } else {
            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Invalid Codefroces Handle',
            //     icon: 'error',
            //     confirmButtonText: 'Try again'
            // });
            alert('Invalid Codeforces Handle');
        }
    });