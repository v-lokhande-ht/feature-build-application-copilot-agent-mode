import ResourceView from './ResourceView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <ResourceView
      title="Teams"
      eyebrow="Groups"
      endpoint={endpoint}
      columns={[
        { label: 'Team', accessor: 'name' },
        { label: 'Mascot', accessor: 'mascot' },
        { label: 'Weekly Goal', accessor: (team) => `${team.weeklyGoalMinutes} min` },
        { label: 'Members', accessor: 'members' },
      ]}
    />
  )
}

export default Teams