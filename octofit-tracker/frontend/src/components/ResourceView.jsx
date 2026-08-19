import { useApiResource } from '../api'

function getValue(record, accessor) {
  if (typeof accessor === 'function') {
    return accessor(record)
  }

  const value = record[accessor]

  if (Array.isArray(value)) {
    return `${value.length} items`
  }

  if (value && typeof value === 'object') {
    return value.displayName || value.name || value.username || value.title || value._id || 'Linked record'
  }

  return value ?? 'Not set'
}

function ResourceView({ title, eyebrow, resourcePath, columns }) {
  const { records, status, error, apiBaseUrl } = useApiResource(resourcePath)

  return (
    <section className="resource-view" aria-labelledby={`${resourcePath}-heading`}>
      <div className="resource-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${resourcePath}-heading`}>{title}</h1>
        </div>
        <span className="record-count">{records.length} records</span>
      </div>

      <p className="api-path">{apiBaseUrl}/{resourcePath}/</p>

      {status === 'loading' && <div className="notice">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="notice error">{error}</div>}

      {status === 'success' && (
        <div className="table-shell">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.label}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id || JSON.stringify(record)}>
                  {columns.map((column) => (
                    <td key={column.label}>{getValue(record, column.accessor)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceView