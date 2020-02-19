(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const Form = document.getElementById('Form-0000')
    let inputs = null

    const setupForm = (Form) => {
      inputs = Form.querySelectorAll('input')
      handleInputInteractions()
      handleSubmit()
    }

    const handleInputInteractions = () => {
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.addEventListener('focus', toggleHighlight)
        input.addEventListener('blur', toggleHighlight)
      }
    }

    handleSubmit = () => {
      Form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(Form)
        fetch(
          '/handle-form',
          {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
          })
      })
    }

    const toggleHighlight = (e) => {
      e.target.previousElementSibling.classList.toggle('Form__Label--focused')
    }

    if (Form) {
      setupForm(Form)
    }
  })
})()