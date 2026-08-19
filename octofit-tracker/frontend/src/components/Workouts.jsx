import ResourceView from './ResourceView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      eyebrow="Suggestions"
      endpoint={endpoint}
      columns={[
        { label: 'Workout', accessor: 'title' },
        { label: 'Focus', accessor: 'focus' },
        { label: 'Difficulty', accessor: 'difficulty' },
        { label: 'Duration', accessor: (workout) => `${workout.durationMinutes} min` },
      ]}
    />
  )
}

export default Workouts