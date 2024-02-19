const { createApp , ref } = Vue

createApp({
    setup() {
        const Name = ref("Test")
        const count = ref(0)

        const increase = function() {
            count.value++
        }

        const decrease = function() {
            count.value--
        }

        return {
            Name,
            count,
            increase,
            decrease
        }
    },
    mounted() {
        this.addAnimation()
    },
    methods: {
        addAnimation() {
            
        }
    }
}).mount("body")

function showPopupMenu() {
    let showPopup = document.getElementById('showPopup');

    if (showPopup.style.display === 'none') {
        showPopup.style.display = 'block';
    } else {
        showPopup.style.display = 'none';
    }
}