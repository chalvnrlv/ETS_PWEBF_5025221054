// Get DOM elements
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

let score = 0;
let lives = 3; // Set initial lives to 3

// Update score and lives on the page
function updateScoreAndLives() {
  scoreElement.textContent = score;
  livesElement.textContent = lives;
}

// Function untuk mengakhiri permainan dan menampilkan highscore
function gameOver() {
  result.textContent = "GAME OVER";
  optionImages.forEach((image) => {
      image.style.pointerEvents = "none"; // Menonaktifkan klik lebih lanjut
  });

  // Menyimpan highscore pemain saat ini
  saveHighscore();
}

// Function to reset the game
function resetGame() {
  score = 0;
  lives = 3;
  updateScoreAndLives();
  result.textContent = "Let's Play!!"; // Reset result text

  // Enable option images for the next game and remove "active" class
  optionImages.forEach((image) => {
    image.style.pointerEvents = "auto";
    image.classList.remove("active");
  });

  // Clear "GAME OVER" text
  if (result.textContent === "GAME OVER") {
    result.textContent = "Let's Play!!";
  }
}

// Attach the resetGame function to the reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    if (lives === 0) {
      return; // Game over, no further actions
    }

    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    setTimeout(() => {
      gameContainer.classList.remove("start");

      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;

      let randomNumber = Math.floor(Math.random() * 3);
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      cpuResult.src = cpuImages[randomNumber];

      let cpuValue = ["R", "P", "S"][randomNumber];
      let userValue = ["R", "P", "S"][index];

      let outcomes = {
        RR: "DRAW",
        RP: "CPU",
        RS: "YOU",
        PP: "DRAW",
        PR: "YOU",
        PS: "CPU",
        SS: "DRAW",
        SR: "CPU",
        SP: "YOU",
      };

      let outComeValue = outcomes[userValue + cpuValue];

      result.textContent = userValue === cpuValue ? "MATCH DRAW" : `${outComeValue} WON!!`;

      if (outComeValue === "YOU") {
        score++;
      } else if (outComeValue === "CPU") {
        lives--; // Decrease lives when CPU wins
        if (lives === 0) {
          gameOver(); // Game over when no lives left
        }
      }

      updateScoreAndLives();

      

    }, 2500);
  });
});

// Update score and lives on page load
updateScoreAndLives();

function fetchHighscore() {
  fetch('https://ets-pemrograman-web-f.cyclic.app/users/score/scores')
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
              const highscoreList = document.getElementById('highscore-list');
              highscoreList.innerHTML = ''; // Kosongkan isi sebelum menambahkan data baru
              data.data.slice(0, 3).forEach(player => {
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${player.nama}</td><td>${player.score}</td>`;
                  highscoreList.appendChild(row);
              });
          } else {
              console.error('Gagal mengambil highscore.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

// Update score and lives on page load
updateScoreAndLives();

// Fetch highscore after the game loads
fetchHighscore();

// Membuat variabel untuk menyimpan nama pemain dan skor saat ini
let playerName = "Nama Pemain"; // Ganti dengan nama pemain yang sesuai
let currentScore = 0;

// ...

// Function untuk menampilkan highscore
function showHighscore() {
    fetch('https://ets-pemrograman-web-f.cyclic.app/users/score/scores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const highscoreList = document.getElementById('highscore-list');
            highscoreList.innerHTML = ''; // Mengosongkan daftar highscore sebelum menambahkan yang baru

            // Mengurutkan data highscore berdasarkan skor tertinggi
            data.data.sort((a, b) => b.score - a.score);

            // Hanya menampilkan 3 highscore teratas
            const topHighscores = data.data.slice(0, 3);

            topHighscores.forEach((highscore, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}. ${highscore.nama}</td>
                    <td>${highscore.score}</td>
                `;
                highscoreList.appendChild(row);
            });
        } else {
            console.error('Gagal mendapatkan data highscore.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function untuk menyimpan highscore
function saveHighscore() {
    fetch('https://ets-pemrograman-web-f.cyclic.app/users/score/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama: playerName,
            score: currentScore
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Highscore berhasil disimpan, tampilkan daftar highscore
            showHighscore();
        } else {
            console.error('Gagal menyimpan highscore.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



// Panggil fungsi showHighscore saat halaman dimuat
showHighscore();
