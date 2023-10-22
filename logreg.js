// LOGIN
document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const data = {
        email: loginEmail,
        password: loginPassword
    };

    fetch('https://ets-pemrograman-web-f.cyclic.app/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const accessToken = data.data.access_token;
            alert('Login berhasil!');
            window.location.href = 'Game/index.html';
        } else {
            alert('Login gagal. Periksa email dan password Anda!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Register
const authForm = document.getElementById('authForm');

authForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const registerName = document.getElementById('registerName').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;

    const userData = {
        nama: registerName,
        email: registerEmail,
        password: registerPassword
    };

    fetch('https://ets-pemrograman-web-f.cyclic.app/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'failed') {
            alert('Pendaftaran gagal. ' + data.error);
        } else if (data.status === 'success') {
            alert('Pendaftaran berhasil! Silakan login.');
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Menampilkan data pengguna
function showUserData() {
    fetch('https://ets-pemrograman-web-f.cyclic.app/users')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const userList = document.getElementById('userList');
                userList.innerHTML = '<h2>Data Pengguna</h2>';
                data.data.forEach(user => {
                    userList.innerHTML += '<p>ID: ' + user.id + '</p>';
                    userList.innerHTML += '<p>Nama: ' + user.nama + '</p>';
                    userList.innerHTML += '<p>Email: ' + user.email + '</p>';
                    userList.innerHTML += '<p>Login Terakhir: ' + (user.login_at || 'Belum pernah login') + '</p>';
                    userList.innerHTML += '<hr>';
                });
            } else {
                alert('Gagal mendapatkan data pengguna.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Menampilkan data pengguna saat halaman dimuat
showUserData();
