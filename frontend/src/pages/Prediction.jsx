import { useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import PredictionResult from '../components/PredictionResult'
import LoadingSpinner from '../components/LoadingSpinner'
import { predictionApi } from '../api/predictionApi'

function Prediction() {
  const [formData, setFormData] = useState({
    follicle_no_r: '',
    follicle_no_l: '',
    skin_darkening: '',
    hair_growth: '',
    weight_gain: '',
    cycle: '',
    fast_food: '',
    pimples: '',
    weight: '',
    bmi_update: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [result, setResult] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.follicle_no_r) newErrors.follicle_no_r = 'Required'
    else if (isNaN(formData.follicle_no_r) || formData.follicle_no_r <= 0)
      newErrors.follicle_no_r = 'Must be a positive number'

    if (!formData.follicle_no_l) newErrors.follicle_no_l = 'Required'
    else if (isNaN(formData.follicle_no_l) || formData.follicle_no_l <= 0)
      newErrors.follicle_no_l = 'Must be a positive number'

    if (formData.skin_darkening === '')
      newErrors.skin_darkening = 'Required'

    if (formData.hair_growth === '')
      newErrors.hair_growth = 'Required'

    if (formData.weight_gain === '')
      newErrors.weight_gain = 'Required'

    if (!formData.cycle) newErrors.cycle = 'Required'
    else if (isNaN(formData.cycle) || formData.cycle <= 0)
      newErrors.cycle = 'Must be a positive number'

    if (formData.fast_food === '')
      newErrors.fast_food = 'Required'

    if (formData.pimples === '')
      newErrors.pimples = 'Required'

    if (!formData.weight) newErrors.weight = 'Required'
    else if (isNaN(formData.weight) || formData.weight <= 0)
      newErrors.weight = 'Must be a positive number'

    if (!formData.bmi_update) newErrors.bmi_update = 'Required'
    else if (isNaN(formData.bmi_update) || formData.bmi_update <= 0)
      newErrors.bmi_update = 'Must be a positive number'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Convert string values to numbers and boolean fields to integers
      const payload = {
        follicle_no_r: parseInt(formData.follicle_no_r),
        follicle_no_l: parseInt(formData.follicle_no_l),
        skin_darkening: parseInt(formData.skin_darkening),
        hair_growth: parseInt(formData.hair_growth),
        weight_gain: parseInt(formData.weight_gain),
        cycle: parseInt(formData.cycle),
        fast_food: parseInt(formData.fast_food),
        pimples: parseInt(formData.pimples),
        weight: parseFloat(formData.weight),
        bmi_update: parseFloat(formData.bmi_update),
      }

      const response = await predictionApi.predict(payload)
      setPrediction(response.prediction)
      setResult(response.result)
      setSubmitted(true)
    } catch (err) {
      console.error('Prediction error:', err)
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        'Failed to get prediction. Please try again.'
      setApiError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleNewPrediction = () => {
    setFormData({
      follicle_no_r: '',
      follicle_no_l: '',
      skin_darkening: '',
      hair_growth: '',
      weight_gain: '',
      cycle: '',
      fast_food: '',
      pimples: '',
      weight: '',
      bmi_update: '',
    })
    setErrors({})
    setApiError('')
    setPrediction(null)
    setResult(null)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8">
            <div className="mb-6">
              <PredictionResult
                prediction={prediction}
                result={result}
                isLoading={false}
              />
            </div>
            <div className="pt-6 border-t border-gray-200">
              <Button
                onClick={handleNewPrediction}
                className="w-full"
                variant="primary"
              >
                Make Another Prediction
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PCOS Prediction
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your clinical data to get a prediction. All fields are required.
          </p>

          {apiError && (
            <div className="mb-6">
              <ErrorMessage
                message={apiError}
                onClose={() => setApiError('')}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Follicle Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Follicle Count
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Right Follicle Count"
                  type="number"
                  name="follicle_no_r"
                  placeholder="e.g., 5"
                  value={formData.follicle_no_r}
                  onChange={handleInputChange}
                  error={errors.follicle_no_r}
                  disabled={loading}
                  required
                />
                <Input
                  label="Left Follicle Count"
                  type="number"
                  name="follicle_no_l"
                  placeholder="e.g., 5"
                  value={formData.follicle_no_l}
                  onChange={handleInputChange}
                  error={errors.follicle_no_l}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Symptoms Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Symptoms
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Skin Darkening"
                  name="skin_darkening"
                  value={formData.skin_darkening}
                  onChange={handleInputChange}
                  error={errors.skin_darkening}
                  disabled={loading}
                  options={[
                    { label: 'No (0)', value: '0' },
                    { label: 'Yes (1)', value: '1' },
                  ]}
                  required
                />
                <Select
                  label="Hair Growth"
                  name="hair_growth"
                  value={formData.hair_growth}
                  onChange={handleInputChange}
                  error={errors.hair_growth}
                  disabled={loading}
                  options={[
                    { label: 'No (0)', value: '0' },
                    { label: 'Yes (1)', value: '1' },
                  ]}
                  required
                />
                <Select
                  label="Weight Gain"
                  name="weight_gain"
                  value={formData.weight_gain}
                  onChange={handleInputChange}
                  error={errors.weight_gain}
                  disabled={loading}
                  options={[
                    { label: 'No (0)', value: '0' },
                    { label: 'Yes (1)', value: '1' },
                  ]}
                  required
                />
                <Select
                  label="Pimples"
                  name="pimples"
                  value={formData.pimples}
                  onChange={handleInputChange}
                  error={errors.pimples}
                  disabled={loading}
                  options={[
                    { label: 'No (0)', value: '0' },
                    { label: 'Yes (1)', value: '1' },
                  ]}
                  required
                />
              </div>
            </div>

            {/* Menstrual Cycle Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Menstrual History
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Menstrual Cycle Length (days)"
                  type="number"
                  name="cycle"
                  placeholder="e.g., 28"
                  value={formData.cycle}
                  onChange={handleInputChange}
                  error={errors.cycle}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Lifestyle Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Lifestyle
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <Select
                  label="Fast Food Consumption"
                  name="fast_food"
                  value={formData.fast_food}
                  onChange={handleInputChange}
                  error={errors.fast_food}
                  disabled={loading}
                  options={[
                    { label: 'No (0)', value: '0' },
                    { label: 'Yes (1)', value: '1' },
                  ]}
                  required
                />
              </div>
            </div>

            {/* Body Measurements Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Body Measurements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Weight (kg)"
                  type="number"
                  step="0.1"
                  name="weight"
                  placeholder="e.g., 65.5"
                  value={formData.weight}
                  onChange={handleInputChange}
                  error={errors.weight}
                  disabled={loading}
                  required
                />
                <Input
                  label="BMI (kg/m²)"
                  type="number"
                  step="0.1"
                  name="bmi_update"
                  placeholder="e.g., 22.5"
                  value={formData.bmi_update}
                  onChange={handleInputChange}
                  error={errors.bmi_update}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              {loading && <LoadingSpinner text="Analyzing your data..." />}
              {!loading && (
                <Button type="submit" variant="primary" className="w-full">
                  Get Prediction
                </Button>
              )}
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}

export default Prediction
