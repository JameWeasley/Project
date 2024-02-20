// const { createApp , ref } = Vue

document.addEventListener("DOMContentLoaded" , async () => {
    const respone = await fetch("http://localhost:500/", {
        method: "GET",
    })

    if (respone.ok) {
        console.log(respone);
        const responeData = await respone.text()

        console.log(responeData);
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