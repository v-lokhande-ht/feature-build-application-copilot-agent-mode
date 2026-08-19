import ResourceView from './ResourceView'

function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      eyebrow="Competition"
      endpoint="/api/leaderboard/"
      columns={[
        { label: 'Rank', accessor: (entry) => `#${entry.rank}` },
        { label: 'Points', accessor: 'points' },
        { label: 'Minutes', accessor: 'totalMinutes' },
        { label: 'User', accessor: 'user' },
      ]}
    />
  )
}

export default Leaderboard