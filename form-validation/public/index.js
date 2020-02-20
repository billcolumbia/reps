(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const Form = document.getElementById('Form-0000')
    const SuccessUI = document.getElementById('SuccessUI')

    const errorFeedback = (fields) => {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        const messageEl = document.getElementById(field.name).nextElementSibling
        const iconEl = messageEl.nextElementSibling
        iconEl.style.display = 'block'
        if (!field.valid) {
          messageEl.innerText = field.message
          messageEl.setAttribute('aria-hidden', false)
          iconEl.querySelector('.Icon--error').style.display = 'block'
          iconEl.querySelector('.Icon--success').style.display = 'none'
        } else {
          messageEl.innerText = ''
          messageEl.setAttribute('aria-hidden', true)
          iconEl.querySelector('.Icon--error').style.display = 'none'
          iconEl.querySelector('.Icon--success').style.display = 'block'
        }
      }
    }

    const successFeedback = () => {
      lockForm(true)
      Form.style.display = 'none'
      Form.setAttribute('aria-hidden', true)
      SuccessUI.setAttribute('aria-hidden', false)
      SuccessUI.style.display = 'block'
    }

    const handleResponse = (response) => {
      response.valid
        ? successFeedback()
        : errorFeedback(response.validations)
    }

    const setupForm = () => {
      // handleSubmit()
    }

    const lockForm = (lock) => {
      const fields = Form.querySelectorAll('input, textarea, select')
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        lock
          ? field.setAttribute('disabled', lock)
          : field.removeAttribute('disabled')
      }
    }

    handleSubmit = () => {
      Form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(Form)
        formData.append('XHR', true)
        lockForm(true)
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
          .then((response) => {
            lockForm(false)
            handleResponse(JSON.parse(response))
          })
      })
    }

    if (Form) {
      setupForm()
    }
  })
})()
