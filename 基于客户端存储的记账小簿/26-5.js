window.onload = function () {
    // localStorage.clear()
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
    })

    let textInput = document.querySelector('#text');
    let amountInput = document.querySelector('#amount');
    let addTransitionBtn = document.querySelector('.addTransition');
    let list = document.querySelector('ul');
    let moneyPLus = document.querySelector('#money-plus');
    let moneyMinus = document.querySelector('#money-minus');
    let balanceMoney = document.querySelector('#balance')

    let count = 0;

    //导入Web Storage数据
    if (localStorage.length != 0) {
        // let record = localStorage.getItem('transition');
        // console.log(record);
        for (let i = 0; i < localStorage.length; i++) {
            let transitionObj = JSON.parse(localStorage.getItem(localStorage.key(i)));

            let li = document.createElement('li');
            let text = document.createElement('span')
            let amount = document.createElement('span')
            let del = document.createElement('button')

            if (Number(amountInput.value) > 0) {
                amount.textContent = '+' + Number(transitionObj.amount);
                li.classList.add('add');

            } else {
                amount.textContent = Number(transitionObj.amount);
                li.classList.add('sub');
            }
            text.textContent = transitionObj.text;
            del.textContent = 'DEL';

            li.append(text);
            li.append(amount);
            li.append(del);
            list.append(li);

            calcu()
        }
    }

    addTransitionBtn.addEventListener('click', function () {

        //
        if (amountInput.value != '' && textInput.value != '') {
            let li = document.createElement('li');
            let text = document.createElement('span')
            let amount = document.createElement('span')
            let del = document.createElement('button')

            //判断正负
            if (Number(amountInput.value) > 0) {
                amount.textContent = '+' + Number(amountInput.value);
                li.classList.add('add');

            } else {
                amount.textContent = Number(amountInput.value);
                li.classList.add('sub');
            }
            text.textContent = textInput.value;
            del.textContent = "DEL";

            li.append(text);
            li.append(amount);
            li.append(del);
            list.append(li);

            let transition = {};
            transition.id = ++count;
            transition.text = textInput.value;
            transition.amount = amountInput.value;
            // console.log(transition);
            localStorage.setItem(transition.id, JSON.stringify(transition));


            textInput.value = '';
            amountInput.value = '';
        }

        calcu();

    })

    list.addEventListener('click', function (event) {
        if (event.target.tagName == 'BUTTON') {
            // console.log(event.target)
            // console.log(localStorage)
            let li = event.target.parentNode;
            // console.log(li);
            // let liCount = list.childElementCount;
            for (let i = 0; i < list.children.length; i++) {
                if (li == list.children[i]) {
                    // console.log(i);
                    // console.log(localStorage.key(i + 1))
                    localStorage.removeItem(localStorage.key(i + 1));
                    localStorage.clear();
                    li.remove();
                    for (let j = 0; j < list.children.length; j++) {
                        if (li) {
                            let transition = {};
                            transition.id = j + 1;
                            transition.text = list.children[j].firstElementChild.innerHTML;
                            transition.amount = list.children[j].firstElementChild.nextElementSibling.innerHTML;
                            localStorage.setItem(transition.id, JSON.stringify(transition));
                        }
                    } 
                    // console.log(localStorage);
                }
            }
        }
        calcu()
    })

    //根据localStorage计算资金
    function calcu() {
        let plus = 0;
        let minus = 0;
        let balance = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let transitionObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            // console.log(transitionObj);
            if (transitionObj.amount > 0) {
                // console.log(transitionObj.amount);
                plus += +transitionObj.amount
            } else {
                // console.log(transitionObj.amount);
                minus += +transitionObj.amount
            }
        }
        balance = plus + minus;
        if (balance >= 0) {
            balanceMoney.textContent = '+$' + (balance);
        } else {
            balanceMoney.textContent = '-$' + (-balance);
        }

        moneyPLus.textContent = '+$' + plus;
        moneyMinus.textContent = '-$' + (-minus);
    }
}
