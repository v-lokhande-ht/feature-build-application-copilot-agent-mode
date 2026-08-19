import ResourceView from './ResourceView'

function Teams() {
  return (
    <ResourceView
      title="Teams"
      eyebrow="Groups"
      endpoint="/api/teams/"
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