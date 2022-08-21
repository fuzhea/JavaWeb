window.onload = function () {
    getCart();
    getTotal();
    delGood();

    let addGoodsBtn = document.querySelectorAll('.add');

    for (let i = 0; i < addGoodsBtn.length; i++) {
        addGoodsBtn[i].addEventListener('click', function (event) {

            //获取商品信息
            let goodDiv = event.target.parentNode;
            // console.log(goodDiv);
            let goodImg = goodDiv.previousElementSibling.getAttribute('src');
            let goodName = goodDiv.querySelector('.good-name').innerHTML;
            let goodEngName = goodDiv.querySelector('.engName').innerHTML;
            let goodPrice = goodDiv.querySelector('.price').innerHTML;
            let goodQuantity = 1;

            // console.log(goodImg);
            // console.log(goodPrice);
            if (getCookie(goodEngName)) {
                let trs = document.querySelectorAll('tbody tr');
                
                goodQuantity = +document.querySelector('input').value;
                for (let i = 0; i < trs.length; i++) {
                    let trName = trs[i].querySelector("span").innerHTML;
                    // console.log(trName);
                    if (goodName == trName) {
                        goodQuantity = +trs[i].children[2].querySelector('input').value + 1;
                        trs[i].children[2].querySelector('input').value = goodQuantity;
                    }
                }
                // console.log(goodQuantity);
                setCookie(goodEngName, `${goodName} ${goodEngName} ${goodImg} ${goodPrice} ${goodQuantity}`, {});
            } else {
                setCookie(goodEngName, `${goodName} ${goodEngName} ${goodImg} ${goodPrice} ${goodQuantity}`, {});
                addGoods(event);
            }
            getTotal();
            delGood();
        })



    }

}

function delGood() {
    let delBtn = document.querySelectorAll('.del')
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', function (event) {
            let tr = event.target.parentNode.parentNode;
            // console.log(tr);
            let name = tr.firstElementChild.lastElementChild.innerHTML;
            let nameSpan = document.querySelectorAll('.good-name');
            let engName;
            for (let j = 0; j < nameSpan.length; j++) {
                if (name == nameSpan[j].innerHTML) {
                    engName = nameSpan[j].nextElementSibling.innerHTML;
                }
            }
            // console.log(engName);
            deleteCookie(engName)
            // console.log(name);
            tr.remove();
            getTotal();
        })
    }
}
function addGoods(event) {


    let goodDiv = event.target.parentNode;
    // console.log(goodDiv);
    let goodImg = goodDiv.previousElementSibling.getAttribute('src');
    let goodName = goodDiv.querySelector('.good-name').innerHTML;
    let goodEngName = goodDiv.querySelector('.engName').innerHTML;
    let goodPrice = goodDiv.querySelector('.price').innerHTML;
    let tbody = document.querySelector('tbody');


    let tr = document.createElement('tr');
    let tdItem = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdNum = document.createElement('td');
    let tdDel = document.createElement('td');
    let img = document.createElement('img');
    let span = document.createElement('span')
    let button = document.createElement('button');
    let input = document.createElement('input');

    tdItem.append(img);
    tdItem.append(span);
    img.setAttribute('src', goodImg);
    span.textContent = goodName;

    tdPrice.textContent = goodPrice;

    tdNum.append(input);
    input.setAttribute('type', 'number');
    input.setAttribute('value', 1);

    tdDel.append(button);
    button.classList.add('del')
    button.textContent = 'X';

    tr.append(tdItem);
    tr.append(tdPrice);
    tr.append(tdNum);
    tr.append(tdDel);

    tbody.append(tr);




}

function getTotal() {
    let tbody = document.querySelector('tbody');
    let length = tbody.childElementCount;
    let totalMoney = document.querySelector('.total-money')
    let money = 0;
    // console.log(length);
    for (let i = 0; i < length; i++) {
        let price = tbody.children[i].children[1].innerHTML.substring(1);
        let num = tbody.children[i].children[2].children[0].value;
        // console.log(price,num)
        money += price * num;

    }
    // console.log(money)
    totalMoney.textContent = '￥' + money.toFixed(2);
}

function getCart() {
    // console.log(document.cookie)
    let goodImg;
    let goodName;
    let goodPrice;
    let goodQuantity;
    if (document.cookie != '') {
        let nameArr = document.cookie.match(/(\w+)(?=\=%)/g)
        // console.log(nameArr);
        for (let i = 0; i < nameArr.length; i++) {
            let goodEngName = nameArr[i];
            let goodInfoStr = getCookie(goodEngName);

            console.log(goodInfoStr);
            let goodInfoArr = goodInfoStr.split(' ');
            for (let j = 0; j < goodInfoArr.length; j++) {
                // console.log(goodInfoArr[j]);
                goodName = goodInfoArr[0];
                goodImg = goodInfoArr[2];
                goodPrice = goodInfoArr[3];
                goodQuantity = goodInfoArr[4];
                // console.log(goodName+goodImg+goodPrice);
            }
            let tbody = document.querySelector('tbody');
            let tr = document.createElement('tr');
            let tdItem = document.createElement('td');
            let tdPrice = document.createElement('td');
            let tdNum = document.createElement('td');
            let tdDel = document.createElement('td');
            let img = document.createElement('img');
            let span = document.createElement('span')
            let button = document.createElement('button');
            let input = document.createElement('input');

            tdItem.append(img);
            tdItem.append(span);
            img.setAttribute('src', goodImg);
            span.textContent = goodName;

            tdPrice.textContent = goodPrice;

            tdNum.append(input);
            input.setAttribute('type', 'number');
            input.setAttribute('value', goodQuantity);

            tdDel.append(button);
            button.classList.add('del')
            button.textContent = 'X';

            tr.append(tdItem);
            tr.append(tdPrice);
            tr.append(tdNum);
            tr.append(tdDel);

            tbody.append(tr);
        }
    }
}
