import ResourceView from './ResourceView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      eyebrow="Competition"
      endpoint={endpoint}
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