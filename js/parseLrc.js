// console.log(lrc)

const parseLrc = () => {
    let result = []
    const row = lrc.split('\n');
    for (let i = 0; i < row.length; i++) {
        const row1 = row[i].split(']');
        const t = row1[0].split(':');
        let obj = {
            time: +t[0].substring(1) * 60 + +t[1],
            words: row1[1],
        }
        result.push(obj)
    }
    return result
}
let lrcData = parseLrc()


let doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.container ul'),
    container: document.querySelector('.container'),
}
const findIndex = () => {
    // let currentTime = doms.audio.currentTime;
    for (let i = 0; i < lrcData.length; i++) {
        if (lrcData[i].time >= doms.audio.currentTime) {
            return i - 1;
        }
    }
    return lrcData.length - 1;
}


const creatLrcElements = () => {
    for (let i = 0; i < lrcData.length; i++) {
        let li = document.createElement('li');
        li.textContent = lrcData[i].words
        doms.ul.appendChild(li)
    }
}
creatLrcElements()

let containerHeight = doms.container.clientHeight;
let liHeight = doms.ul.children[0].clientHeight;
const setOffset = () => {
    // console.log(findIndex())
    const index = findIndex();
    let number = containerHeight/2-liHeight*index-liHeight;
    // let number = -liHeight*index-liHeight/2;
    // console.log(containerHeight-liHeight*lrcData.length)
    // number = Math.min(0,Math.max(number,containerHeight-liHeight*lrcData.length-liHeight))
    doms.ul.style.transform = `translateY(${number}px)`
    let li = doms.ul.querySelector('.active');
    if (li) {
        li.classList.remove('active');
        // console.log(li.className)
    }
    if (index !== -1) doms.ul.children[index].classList.add('active')

}

doms.audio.addEventListener('timeupdate',
    setOffset);






