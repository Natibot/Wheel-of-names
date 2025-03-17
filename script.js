let names = ["Alice", "Bob", "Charlie", "David"];
let canvas = document.getElementById("wheelCanvas");
let ctx = canvas.getContext("2d");
let spinning = false;
let angle = 0;
let spinSpeed = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let numSegments = names.length;
    let segmentAngle = (2 * Math.PI) / numSegments;
    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, angle + i * segmentAngle, angle + (i + 1) * segmentAngle);
        ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff6666";
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + (i + 0.5) * segmentAngle);
        ctx.fillStyle = "black";
        ctx.fillText(names[i], 100, 0);
        ctx.restore();
    }
}

function addName() {
    let input = document.getElementById("nameInput").value.trim();
    if (input && !names.includes(input)) {
        names.push(input);
        updateNameList();
        drawWheel();
    }
    document.getElementById("nameInput").value = "";
}

function removeName(name) {
    names = names.filter(n => n !== name);
    updateNameList();
    drawWheel();
}

function updateNameList() {
    let nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
    names.forEach(name => {
        let li = document.createElement("li");
        li.textContent = name;
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeName(name);
        li.appendChild(removeBtn);
        nameList.appendChild(li);
    });
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    spinSpeed = Math.random() * 0.3 + 0.2;
    let interval = setInterval(() => {
        angle += spinSpeed;
        spinSpeed *= 0.98;
        drawWheel();
        if (spinSpeed < 0.01) {
            clearInterval(interval);
            spinning = false;
            selectWinner();
        }
    }, 30);
}

function selectWinner() {
    let numSegments = names.length;
    let segmentAngle = (2 * Math.PI) / numSegments;

    // Normalize angle to be within 0 to 2π
    let adjustedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    // Determine the winning index by calculating which segment the arrow is pointing at
    let winningIndex = Math.floor((adjustedAngle + segmentAngle / 2) / segmentAngle) % numSegments;

    // Ensure the index is valid and display the winner
    if (names[winningIndex]) {
        document.getElementById("winner").textContent = "Winner: " + names[winningIndex];
    } else {
        document.getElementById("winner").textContent = "Error: Could not determine winner.";
    }
}



updateNameList();
drawWheel();
