<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./26-5.css">
    <script src="./26-5.js"></script>
</head>

<body>
    <h2>记账小簿</h2>

    <div class="container">

        <h4>你的资金平衡</h4>
        <h1 id="balance">$0.00</h1>
        <div class="inc-exp-container">
            <div>
                <h4>收入</h4>
                <p id="money-plus" class="money plus">+$0.00</p>
            </div>
            <div>
                <h4>支出</h4>
                <p id="money-minus" class="money minus">-$0.00</p>
            </div>
        </div>

        <h3>收入&支出记录</h3>
        <ul id="list" class="list">
            
        </ul>

        <h3>收支条目添加</h3>
        <form id="form">
            <div class="form-control">
                <label for="text">明细</label>
                <input type="text" id="text" placeholder="输入明细..." />
            </div>
            <div class="form-control">
                <label for="amount">金额
                    <br />
                    (负数 - 支出, 正数 + 收入)</label>
                <input type="number" id="amount" placeholder="输入金额..." />
            </div>
            <button class="addTransition">添加</button>
        </form>
    </div>
</body>

</html>
