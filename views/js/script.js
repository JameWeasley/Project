// const { createApp , ref } = Vue

document.addEventListener("DOMContentLoaded" , async () => {
    const respone = await fetch("http://localhost:500/", {
        method: "GET",
    })

    if (respone.ok) {
        const responeData = await respone.text()

    }
})

// createApp({
//     setup() {
//         const Name = ref("Test")
//         const count = ref(0)

//         const increase = function() {
//             count.value++
//         }

//         const decrease = function() {
//             count.value--
//         }

//         return {
//             Name,
//             count,
//             increase,
//             decrease
//         }
//     },
//     mounted() {
//         this.addAnimation()
//     },
//     methods: {
//         addAnimation() {
            
//         }
//     }
// }).mount("body")

function showPopupMenu() {
    let showPopup = document.getElementById('showPopup');

    if (showPopup.style.display === 'none') {
        showPopup.style.display = 'block';
    } else {
        showPopup.style.display = 'none';
    }
}

function success() {
    swal.fire({
        title: "Send message success!",
        text: "You clicked the button",
        icon: "success"
    });
}

// Swal.fire({
//     title: "Good job!",
//     text: "You clicked the button!",
//     icon: "success"
//   });