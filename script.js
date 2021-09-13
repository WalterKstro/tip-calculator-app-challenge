const vm = new Vue({
    el: '#app',
    data: {
        bill: '',
        tip_percentage:'',
        people: '',
        btnIsActivePercentage: '',
        showAlert : false
    },
    methods: {
        setPercentage(evt) {
            this.btnIsActivePercentage = evt.target
            this.tip_percentage = Number(evt.target.value)
        },
        setCustomPercentage(evt) {
            /*DELETE THE CLASS ACTIVE OF BTN ACTIVE*/
            if(this.btnIsActivePercentage != '') {
                this.btnIsActivePercentage.classList.remove('active')
            }
            this.tip_percentage = Number(evt.target.value)
        },
        resetValues() {
            this.bill = ''
            this.tip_percentage = ''
            this.people = ''
            this.$refs.custom.value=''
            this.btnIsActivePercentage.classList.remove('active')
        },
        focusPeople() {
            this.$refs.people.select()
        }
    },
    computed: {
        calculateTipAmount() {
            if (this.people != ''  && this.people != 0) {
                return Number(((this.bill * this.tip_percentage) / 100) / this.people)
            }
            return   Number('0.00')
        },
        calculateTotalPeople() {
            if( this.bill != '' && this.people != '' ) {
                return Number((this.bill / this.people) + this.calculateTipAmount)
            }
            return Number('0.00')
        }
    },
    filters: {
        round(value) {
            return Number(value).toFixed(2)
        }
    },
    watch: {
        people(newVal,oldVal) {
            if (newVal < 1 && newVal !== '') {
                this.showAlert = true
            }else {
                this.showAlert = false
            }
        },
        btnIsActivePercentage(newVal,oldVal) {
            if (this.btnIsActivePercentage != ''){
                if(oldVal == '') {
                    newVal.classList.add('active')
                }else {
                    oldVal.classList.remove('active')
                    newVal.classList.add('active')
                }
            }
        }
    }
})
