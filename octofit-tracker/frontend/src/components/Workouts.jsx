import ResourceView from './ResourceView'

function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      eyebrow="Suggestions"
      endpoint="/api/workouts/"
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