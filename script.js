let walletConnected = false;
let nftCount = 0;

// Toggle Dark/Light Mode
function toggleMode(){
    document.body.classList.toggle('light-mode');
}

// Typing Effect
function typeStatus(message, elementId){
    const el = document.getElementById(elementId);
    el.innerText='';
    let i=0;
    const interval = setInterval(()=>{
        el.innerText += message[i];
        i++;
        if(i>=message.length) clearInterval(interval);
    },30);
}

// Wallet Connect
function connectWallet(){
    walletConnected = true;
    typeStatus("Wallet Connected! Mint your holographic NFTs now.", "typingStatus");
    document.getElementById("mintNFT").disabled=false;
}

// Mint NFT → 3D Cube
function mintNFT(){
    if(!walletConnected) return;
    nftCount++;
    typeStatus(`NFT #${nftCount} minted!`, "typingStatus");

    const cube = document.createElement("div");
    cube.className="nft-cube";
    cube.innerHTML=`
        <div style="transform:rotateY(0deg) translateZ(40px)">#${nftCount}</div>
        <div style="transform:rotateY(90deg) translateZ(40px)">#${nftCount}</div>
        <div style="transform:rotateY(180deg) translateZ(40px)">#${nftCount}</div>
        <div style="transform:rotateY(270deg) translateZ(40px)">#${nftCount}</div>
        <div style="transform:rotateX(90deg) translateZ(40px)">#${nftCount}</div>
        <div style="transform:rotateX(-90deg) translateZ(40px)">#${nftCount}</div>
    `;
    document.getElementById("dashboard").appendChild(cube);
}

// Particle Background
const canvas=document.getElementById("particleCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let i=0;i<100;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*3+1,
        dx:(Math.random()-0.5)*1.5,
        dy:(Math.random()-0.5)*1.5
    });
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="#00ffff";
        ctx.fill();
        p.x+=p.dx;
        p.y+=p.dy;
        if(p.x<0||p.x>canvas.width)p.dx*=-1;
        if(p.y<0||p.y>canvas.height)p.dy*=-1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();