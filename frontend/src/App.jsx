
import { useEffect, useState } from 'react'
import './App.css'

const API = `${import.meta.env.VITE_API_URL}/api/irrigation`;


function App() {
  const [systems, setSystems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const [form, setForm] = useState({
    systemName: '',
    systemType: '',
    areaAcres: '',
    automated: 'true',
  })

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
  }

  const loadSystems = async () => {
    setLoading(true)

    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(`Unable to load records (${response.status}).`)
      }

      const data = await response.json()
      setSystems(Array.isArray(data) ? data : [])
    } catch {
      showMessage(
        'Cannot connect to the backend. Make sure Spring Boot is running on port 9000.',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSystems()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    const payload = {
      systemName: form.systemName.trim(),
      systemType: form.systemType,
      areaAcres: Number(form.areaAcres),
      automated: form.automated === 'true',
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
          errorData?.message ||
            errorData?.error ||
            'Could not save the irrigation system.'
        )
      }

      setForm({
        systemName: '',
        systemType: '',
        areaAcres: '',
        automated: 'true',
      })

      showMessage('Irrigation system added successfully!')
      await loadSystems()
    } catch (error) {
      showMessage(
        error.message || 'Unable to save the irrigation system.',
        'error'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this irrigation system?'
      )
    ) {
      return
    }

    setDeletingId(id)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Could not delete the irrigation system.')
      }

      setSystems((previous) =>
        previous.filter((system) => system.id !== id)
      )

      showMessage('Irrigation system deleted successfully!')
    } catch (error) {
      showMessage(
        error.message || 'Unable to delete the record.',
        'error'
      )
    } finally {
      setDeletingId(null)
    }
  }

  const isAutomated = (system) =>
    system.automated === true || system.automated === 'true'

  const automatedCount = systems.filter(isAutomated).length

  const totalArea = systems.reduce(
    (sum, system) => sum + Number(system.areaAcres || 0),
    0
  )

  return (
    <div className="app-shell">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            <span className="brand-icon">🌱</span> IrrigaSmart
          </a>

          <div className="navbar-nav ms-auto flex-row gap-3">
            <a className="nav-link active" href="#home">
              Dashboard
            </a>
            <a className="nav-link" href="#add-system">
              Add System
            </a>
            <a className="nav-link" href="#records">
              Records
            </a>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5" id="home">
        {/* Welcome banner */}
        <section className="welcome-section mb-4">
          <div>
            <p className="eyebrow">SMART FARMING MANAGEMENT</p>
            <h1>Irrigation Dashboard</h1>
            <p className="welcome-text">
              Manage your irrigation systems efficiently, all in one place.
            </p>
          </div>

          <div className="welcome-illustration" aria-hidden="true">
            <span className="plant-emoji">🌿</span>
            <span className="water-emoji">💧</span>
          </div>
        </section>

        {/* Success and error messages */}
        {message && (
          <div
            className={`alert ${
              messageType === 'error'
                ? 'alert-danger'
                : 'alert-success'
            } alert-dismissible fade show`}
            role="alert"
          >
            {message}

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setMessage('')}
            />
          </div>
        )}

        {/* Dashboard statistics */}
        <section className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-icon">🌱</div>
            <div>
              <p>Total Systems</p>
              <h3>{systems.length}</h3>
              <span>Registered systems</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div>
              <p>Total Area</p>
              <h3>
                {totalArea.toFixed(2)} <small>acres</small>
              </h3>
              <span>Land under irrigation</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚙️</div>
            <div>
              <p>Automated Systems</p>
              <h3>{automatedCount}</h3>
              <span>Automatic irrigation</span>
            </div>
          </div>
        </section>

        {/* Add irrigation system */}
        <section className="content-card mb-4" id="add-system">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SYSTEM MANAGEMENT</p>
              <h2>Add Irrigation System</h2>
              <p className="section-description">
                Register a new irrigation system using the form below.
              </p>
            </div>

            <div className="stat-icon">＋</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="systemName" className="form-label">
                  System Name *
                </label>
                <input
                  id="systemName"
                  name="systemName"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Green Valley System"
                  value={form.systemName}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="systemType" className="form-label">
                  Irrigation Type *
                </label>
                <select
                  id="systemType"
                  name="systemType"
                  className="form-select"
                  value={form.systemType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select irrigation type</option>
                  <option value="Drip">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler Irrigation</option>
                  <option value="Surface">Surface Irrigation</option>
                  <option value="Subsurface">Subsurface Irrigation</option>
                  <option value="Center Pivot">Center Pivot</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="areaAcres" className="form-label">
                  Area (acres) *
                </label>
                <input
                  id="areaAcres"
                  name="areaAcres"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 2.5"
                  value={form.areaAcres}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="automated" className="form-label">
                  Automation Status *
                </label>
                <select
                  id="automated"
                  name="automated"
                  className="form-select"
                  value={form.automated}
                  onChange={handleChange}
                  required
                >
                  <option value="true">Automated</option>
                  <option value="false">Manual</option>
                </select>
              </div>
            </div>

            <div className="form-footer mt-4">
              <p className="required-note">* Required fields</p>
              <button
                type="submit"
                className="btn btn-primary add-button"
                disabled={saving}
              >
                {saving ? 'Saving...' : '+ Add System'}
              </button>
            </div>
          </form>
        </section>

        {/* Irrigation records */}
        <section className="content-card" id="records">
          <div className="section-heading records-heading">
            <div>
              <p className="eyebrow">YOUR INFRASTRUCTURE</p>
              <h2>Irrigation Records</h2>
              <p className="section-description">
                View and manage all registered systems.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline-success refresh-button"
              onClick={loadSystems}
              disabled={loading}
            >
              {loading ? 'Loading...' : '↻ Refresh'}
            </button>
          </div>

          {loading ? (
            <div className="empty-state">
              <div
                className="spinner-border text-success"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading irrigation records...</p>
            </div>
          ) : systems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌾</div>
              <h3>No irrigation systems yet</h3>
              <p>Add your first system using the form above.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle records-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>System Name</th>
                    <th>Type</th>
                    <th>Area</th>
                    <th>Automation</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {systems.map((system) => (
                    <tr key={system.id}>
                      <td>
                        <span className="record-id">
                          #{system.id}
                        </span>
                      </td>

                      <td className="system-name">
                        {system.systemName}
                      </td>

                      <td>{system.systemType}</td>

                      <td>{system.areaAcres} acres</td>

                      <td>
                        <span
                          className={`status-badge ${
                            isAutomated(system)
                              ? 'status-auto'
                              : 'status-manual'
                          }`}
                        >
                          {isAutomated(system)
                            ? '● Automated'
                            : '● Manual'}
                        </span>
                      </td>

                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(system.id)}
                          disabled={deletingId === system.id}
                        >
                          {deletingId === system.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <span>🌱 IrrigaSmart</span>
          <span>
            Smart irrigation management for smarter farming.
          </span>
        </footer>
      </main>
    </div>
  )
}

export default App
