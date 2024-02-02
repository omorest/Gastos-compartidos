export const FormNewGroup = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Submit form')
  }

  return (
    <div>
      <h3>Nuevo grupo</h3>
      <form onSubmit={handleSubmit}>

      </form>

    </div>
  )
}
