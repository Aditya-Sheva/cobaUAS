// Seleksi elemen-elemen yang diperlukan
const openPopupButtons = document.querySelectorAll('.text-pink-500'); // Tombol "Lihat Detail"

// Fungsi untuk menampilkan popup
function openPopup(popup) {
    popup.classList.add('active');
    popup.classList.remove('hidden');
}

// Fungsi untuk menyembunyikan popup
function closePopup(popup) {
    popup.classList.remove('active');
    popup.classList.add('hidden');
}

// Tambahkan event listener pada setiap tombol "Lihat Detail"
openPopupButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah tindakan default (navigasi)
        const parent = button.closest('.bg-white'); // Cari elemen parent terdekat
        const popup = parent.querySelector('.popup'); // Cari popup dalam elemen tersebut
        openPopup(popup);
    });
});

// Menutup popup ketika pengguna mengklik tombol "Close" atau di luar konten popup
document.querySelectorAll('.popup').forEach((popup) => {
    const closePopupButton = popup.querySelector('.close-popup');

    // Event listener untuk tombol close
    closePopupButton.addEventListener('click', () => closePopup(popup));

    // Event listener untuk klik di luar konten popup
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup(popup);
        }
    });
});
