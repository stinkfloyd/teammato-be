document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById(`form`)
  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = {
      username: event.target.username.value,
      password: event.target.username.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value
    }
    const response = await fetch('/users', {
      method: "POST",
      body: formData,
    })
    const resJson = await JSON.parse(response)
    console.log("resJson: ", resJson)
  })
})