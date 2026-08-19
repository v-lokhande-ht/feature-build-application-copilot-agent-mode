import ResourceView from './ResourceView'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <ResourceView
      title="Activities"
      eyebrow="Training Log"
      endpoint={endpoint}
      columns={[
        { label: 'Activity', accessor: 'activityType' },
        { label: 'Duration', accessor: (activity) => `${activity.durationMinutes} min` },
        { label: 'Calories', accessor: 'caloriesBurned' },
        { label: 'Notes', accessor: 'notes' },
      ]}
    />
  )
}

export default Activities