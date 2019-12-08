var app = new Vue({
    el: '#app',
    data: {
        words: [],
        currentWord: "",
        count: 0,
        score: 0,
        scroll: -1,
        countDown: 100,
        isActive: true,
        disableButton: false,
        isWrong: "Try Again!",
        isRight: "Correct!",
        isMatching: "",
        buttonText: ""
    },
    created() {
        this.loadQuote();
        // this.countDownTimer();
    },
    methods: {
        check(item) {
            if (this.disableButton == true && this.currentWord === this.words[this.count]) {

                this.count++;
                this.score++;
                this.isMatching = "true";
                this.currentWord = ""

                var myDiv = document.getElementById('words_');
                var element = document.getElementsByClassName("active");

                this.scroll++;

                if (this.scroll > 1) {

                    myDiv.scrollTop = element[0].clientHeight * this.scroll;
                }

            } else {
                this.isMatching = "false";
            }
        },
        countDownTimer() {

            this.disableButton = true;
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
        loadQuote() {

            var vm = this;

            axios.get('https://jsonplaceholder.typicode.com/comments')
                .then(function (response) {

                    for (var i = 0; i < 100; i++) {
                        vm.words.push(response.data[i].name.split(" ")[0]);
                    }
                });
        }
    },
    computed: {
        buttonTextSetter : function() {
            return this.disableButton == false ? "Start" : "Good Luck!"
        }
    },
});