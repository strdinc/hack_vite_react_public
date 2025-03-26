document.getElementById('consent_file').addEventListener('change', function () {
  const label = document.getElementById('consent_upload_button_label');
  const fileName = this.files[0] ? this.files[0].name : 'выберите файл';
  label.textContent = fileName;
});
