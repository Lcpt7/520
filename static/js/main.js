const heart = document.querySelector("#heart");
const playBtn = document.querySelector("#playBtn");
const reply = document.querySelector("#reply");
const answerButtons = document.querySelectorAll("[data-answer]");

function burstHearts() {
  for (let i = 0; i < 18; i += 1) {
    const piece = document.createElement("span");
    piece.className = "falling-heart";
    piece.textContent = "❤";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    piece.style.fontSize = `${0.9 + Math.random() * 1.4}rem`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4200);
  }
}

playBtn?.addEventListener("click", () => {
  heart?.classList.add("bright");
  burstHearts();
  setTimeout(() => heart?.classList.remove("bright"), 1800);
});

answerButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const answer = button.dataset.answer;
    reply.textContent = "正在把你的回答放进心里...";

    try {
      const response = await fetch("/api/confession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      const result = await response.json();
      reply.textContent = `${result.message} (${result.time})`;

      if (answer === "yes") {
        burstHearts();
      }
    } catch (error) {
      reply.textContent = "网络好像走神了，但这份心意还在。";
    }
  });
});

const style = document.createElement("style");
style.textContent = `
  .falling-heart {
    position: fixed;
    top: -2rem;
    z-index: 10;
    color: #e85d75;
    pointer-events: none;
    animation-name: fallHeart;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    text-shadow: 0 8px 22px rgba(232, 93, 117, 0.35);
  }

  @keyframes fallHeart {
    to {
      transform: translateY(110vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
