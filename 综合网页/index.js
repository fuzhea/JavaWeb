let contentItem = document.querySelectorAll('.contentItem');
let choosedItem;
let lesson = document.querySelectorAll('.lessonArrange .lessonCate');
let yearSelect = document.querySelector('.chooseYear');
let allYear = document.querySelector('.allYear');
let allYearItem = document.querySelectorAll('.yearItem');
let schoolSelect = document.querySelector('.chooseSchool');
let provinces = document.querySelectorAll('.procvince ');
let allSchool = document.querySelector('.allSchool');
let schoolItem = document.querySelectorAll('.schoolItem');


chooseLesson();
displayAllYear();
displaySchool();
chooseSchool();
choosePro()
//课程分类功能
function chooseLesson() {
    for (let i = 0; i < contentItem.length; i++) {
        contentItem[i].addEventListener('click', (event) => {
            if (event.target.className.includes('chooseLesson')) return;
            else {
                event.target.classList.add('chooseLesson');
                for (let j = 0; j < contentItem.length; j++) {
                    if (j != i) {
                        contentItem[j].classList.remove('chooseLesson')
                    }
                }

            }
            choosedItem = event.target.innerHTML
            displayLesson(choosedItem)
        })


    }
}

function displayLesson(choosedItem) {
    console.log(choosedItem)
    if (choosedItem == "HTML") {
        console.log(1)
        for (let i = 0; i < lesson.length; i++) {
            if (i != 0 && i != 3) {
                // lesson[i].setAttribute('display', 'none')
                lesson[i].style.display = 'none'
            } else {
                // lesson[i].setAttribute('display', 'block')
                lesson[i].style.display = 'flex'
            }
        }
    } else if (choosedItem == "CSS") {
        for (let i = 0; i < lesson.length; i++) {
            if (i != 1 && i != 3) {
                // lesson[i].setAttribute('display', 'none')
                lesson[i].style.display = 'none'
            } else {
                // lesson[i].setAttribute('display', 'block')
                lesson[i].style.display = 'flex'
            }
        }
    } else if (choosedItem == "JavaScript") {
        for (let i = 0; i < lesson.length; i++) {
            if (i != 2 && i != 3) {
                // lesson[i].setAttribute('display', 'none')
                lesson[i].style.display = 'none'
            } else {
                // lesson[i].setAttribute('display', 'block')
                lesson[i].style.display = 'flex'
            }
        }
    } else if (choosedItem == "全部") {
        for (let i = 0; i < lesson.length; i++) {
            // lesson[i].setAttribute('display', 'block')
            lesson[i].style.display = 'flex'
        }
    }



}

//选择年份
function displayAllYear() {
    yearSelect.addEventListener('mouseover', () => {
        if ((allYear.style.display == 'none' || allYear.style.display == '')&&allSchool.className.includes('hideSchool')) {
            allYear.style.display = 'grid';
            chooseYear();
        }
    })


}

function chooseYear() {
    for (let i = 0; i < allYearItem.length; i++) {
        allYearItem[i].addEventListener('click', function (event) {
            yearSelect.innerHTML = event.target.innerHTML;
            allYear.style.display = 'none'
        })
    }

}

allYear.addEventListener("mouseleave", function () {
    // 隐藏年份表
    allYear.style.display = 'none'
})

//选择学校功能
function displaySchool() {
    schoolSelect.addEventListener('mouseover', (event) => {

        if (allSchool.className.includes('hideSchool') && (allYear.style.display == 'none' || allYear.style.display == '')) {
            allSchool.classList.remove('hideSchool');
        } else {
            allSchool.classList.add('hideSchool')
        }
    })
}

function chooseSchool() {
    for (let i = 0; i < schoolItem.length; i++) {
        schoolItem[i].addEventListener('click', (event) => {
            schoolSelect.innerHTML = event.target.innerHTML;
            allSchool.classList.add('hideSchool')

        })
    }
}

allSchool.addEventListener('mouseleave', () => {
    allSchool.classList.add('hideSchool');
})

function choosePro() {
    for (let i = 0; i < provinces.length; i++) {
        provinces[i].addEventListener('mouseover', function (event) {
            // console.log(event.target.innerHTML);
            if (event.target.innerHTML == '广东') {
                togglePro('guangDong')
            } else if (event.target.innerHTML == '上海') {
                togglePro('shangHai');
            } else if (event.target.innerHTML == '武汉') {
                togglePro('wuHan');

            } else if (event.target.innerHTML == '北京') {
                togglePro('beiJing');

            } else if (event.target.innerHTML == '湖南') {
                togglePro('huNan');

            }
        })
    }
}

function togglePro(provinces) {

    let pro = document.querySelector('.' + provinces);
    if (pro.className.includes('hideSchool')) {
        pro.classList.remove('hideSchool')
    }
    let sch = document.querySelectorAll('.sch');
    for (let j = 0; j < sch.length; j++) {
        if (sch[j] != pro) sch[j].classList.add('hideSchool');
    }

}
