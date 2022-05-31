let parent = document.querySelector(".parent");
let gtPro = JSON.parse(window.localStorage.getItem("products"));
console.log("from cart", gtPro.flat(20))
if (gtPro !== null) {
    gtPro.flat(20).map(i => {
        const { title, price, img } = i;
        parent.innerHTML += `<div class="content d-flex align-items-center justify-content-between mt-5">
        <div class="img">
            <img style="width:150px;" src="${img}" />
        </div>
        <div class="title">
            <h2>${title}</h2>
        </div>
        <div class="quantity">
            <span class="moin me-1">-</span>
            <span class="num me-1">1</span>
            <span class="plus me-1">+</span>
        </div>
        <div class="price">
            $<span>${price}</span>
        </div>
        <div class="remove">
            <span>remove</span>
        </div>
    </div>`;
    })
}


let prodct = document.querySelectorAll(".content");
let sum = 0;
for (let i = 0; i < prodct.length; i++) {
    let pls = prodct[i].querySelector(".quantity .plus");
    let moin = prodct[i].querySelector(".quantity .moin");
    let num = prodct[i].querySelector(".quantity .num");
    let price = prodct[i].querySelector(".price span");
    let title = prodct[i].querySelector(".title");
    let remove = prodct[i].querySelector(".remove");
    let pr = price.innerHTML;
    sum += parseInt(pr);
    document.querySelector(".total h3").innerHTML = sum;

    pls.onclick = () => {
        price.innerHTML = ++num.innerHTML * pr;
        updateTo()
    }
    moin.onclick = () => {
        if (price.innerHTML > 1) {
            price.innerHTML = --num.innerHTML * pr;
            updateTo();
        }
    }
    remove.onclick = () => {
        remove.parentElement.remove();

        for (let i = 0; i < gtPro.length; i++) {
            if (gtPro[i].title == title.textContent.trim()) {
                removeFromLocal(i);
            }
        }
        updateTo();
    }
}
function removeFromLocal(i) {
    gtPro.splice(i, 1);
    window.localStorage.setItem("products", JSON.stringify(gtPro));

}
function updateTo() {
    let prodct = document.querySelectorAll(".content");
    let sm = 0;
    for (let i = 0; i < prodct.length; i++) {
        let price = prodct[i].querySelector(".price span");
        sm += parseInt(price.innerHTML);
        document.querySelector(".total h3").innerHTML = sm;
    }
    if (prodct.length == 0) {
        document.querySelector(".total h3").innerHTML = 0;
    }
}