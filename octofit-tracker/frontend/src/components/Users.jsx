import ResourceView from './ResourceView'

function Users() {
  return (
    <ResourceView
      title="Users"
      eyebrow="Profiles"
      resourcePath="users"
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