document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".navbar-brand");
    const menu = document.querySelector(".navbar-menu");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active"); // Tambahkan/hapus kelas active
    });
});
