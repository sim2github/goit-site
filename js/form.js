const MODAL_ACTIVE_CLASS_NAME = 'modal-active';

const formModal = document.querySelector('#modal-form');
const successModal = document.querySelector('#modal-msg');
const form = document.querySelector('#form');

const openFormModalBtn = document.querySelector('#open-form-modal-btn');
const launchBtn = document.querySelector('#launch-btn');
const closeBtns = document.querySelectorAll('.modal-close');

openFormModalBtn.addEventListener('click', () => {
    formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
})

const closeFormModal = () => {
    formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
};

const closeSuccessModal = () => {
    successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
};

const openSuccessModal = () => {
    successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
};

closeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        closeFormModal();
        closeSuccessModal();
    })
})

function clearFormFields() {
    const modalFiends = formModal.querySelectorAll('input');

    modalFiends.forEach( field => { 
        field.value = ''
    });
}

function showGooseAnim() {
    const gooseImage = document.getElementById('goose-img');
    gooseImage.classList.replace('goose-hidden','goose-anim');

    setTimeout(2000, () => {
    gooseImage.classList.replace('goose-anim','goose-hidden');
    })
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        showGooseAnim();

        setTimeout(() => {
            closeFormModal();
            setTimeout(openSuccessModal, 700);
            setTimeout(closeSuccessModal, 4000);
            clearFormFields();
        }, 4000);
      })
      .catch((error) => console.log('Sending form failed'));
})

