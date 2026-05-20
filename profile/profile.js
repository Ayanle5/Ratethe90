const dmBtn = document.querySelector('.navdm');

dmBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

document.querySelector('.edit-btn').addEventListener('click', () => {
    document.getElementById('editPopup').style.display = 'block';
});