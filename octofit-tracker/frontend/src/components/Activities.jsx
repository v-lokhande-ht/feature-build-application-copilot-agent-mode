import ResourceView from './ResourceView'

function Activities() {
  return (
    <ResourceView
      title="Activities"
      eyebrow="Training Log"
      resourcePath="activities"
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