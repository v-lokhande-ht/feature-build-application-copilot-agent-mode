import ResourceView from './ResourceView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <ResourceView
      title="Users"
      eyebrow="Profiles"
      endpoint={endpoint}
      columns={[
        { label: 'Name', accessor: 'displayName' },
        { label: 'Username', accessor: 'username' },
        { label: 'Email', accessor: 'email' },
        { label: 'Goal', accessor: 'fitnessGoal' },
      ]}
    />
  )
}

export default Users