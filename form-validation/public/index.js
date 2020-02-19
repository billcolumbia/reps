(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const Form = document.getElementById('Form-0000')

    const setupForm = (Form) => {
      handleSubmit()
    }

    handleSubmit = () => {
      Form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(Form)
        fetch(
          '/handle-register',
          {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then((response) => response.json())
          .then((result) => {
            console.log(
              JSON.parse(result)
            )
          })
      })
    }

    if (Form) {
      setupForm(Form)
    }
  })
})()
