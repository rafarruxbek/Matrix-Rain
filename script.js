const state = {
  fps: 90,
  color: "#0f0",
  charset: "01",
  size: 20,
};

const gui = new dat.GUI();
gui.add(state, "fps").min(1).max(120).step(1);
gui.addColor(state, "color");
gui.add(state, "charset");
const sizeCtrl = gui.add(state, "size").min(1).max(120).step(1);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h, columns, drops;

const resize = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.floor(w / state.size);
  drops = Array(columns).fill(1);
};

const draw = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = state.color;
  ctx.font = `${state.size}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text =
      state.charset[Math.floor(Math.random() * state.charset.length)];
    ctx.fillText(text, i * state.size, drops[i] * state.size);

    if (drops[i] * state.size > h && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
};

const animate = () => {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / state.fps);
};

window.addEventListener("resize", resize);
sizeCtrl.onFinishChange(resize);

resize();
animate();
