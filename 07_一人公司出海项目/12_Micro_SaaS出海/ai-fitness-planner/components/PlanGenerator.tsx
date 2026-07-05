import { useState } from 'react'

interface FormData {
  goal: string
  fitnessLevel: string
  availableDays: string
  equipment: string
  limitations: string
}

interface PlanData {
  plan: string
  tips: string[]
}

const PlanGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    goal: '',
    fitnessLevel: '',
    availableDays: '',
    equipment: '',
    limitations: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<PlanData | null>(null)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPlan(null)

    try {
      const response = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成计划失败')
      }

      setPlan(data)
    } catch (err: any) {
      setError(err.message || '生成计划时发生错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">生成您的个性化健身计划</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                健身目标 *
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">选择目标</option>
                <option value="weight_loss">减脂</option>
                <option value="muscle_gain">增肌</option>
                <option value="endurance">增强耐力</option>
                <option value="strength">增强力量</option>
                <option value="flexibility">提高柔韧性</option>
                <option value="general_fitness">整体健身</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                健身水平 *
              </label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">选择水平</option>
                <option value="beginner">初学者</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                每周可用天数 *
              </label>
              <select
                name="availableDays"
                value={formData.availableDays}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">选择天数</option>
                <option value="2">2天</option>
                <option value="3">3天</option>
                <option value="4">4天</option>
                <option value="5">5天</option>
                <option value="6">6天</option>
                <option value="7">7天</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                可用设备
              </label>
              <select
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">选择设备</option>
                <option value="none">无设备（徒手训练）</option>
                <option value="dumbbells">哑铃</option>
                <option value="barbell">杠铃</option>
                <option value="resistance_bands">弹力带</option>
                <option value="pull_up_bar">引体向上杆</option>
                <option value="full_gym">全套健身房设备</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                身体限制或注意事项
              </label>
              <textarea
                name="limitations"
                value={formData.limitations}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="例如：膝盖受伤、腰痛、高血压等（选填）"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '生成中...' : '生成健身计划'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
          {error}
        </div>
      )}

      {plan && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">您的个性化健身计划</h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">{plan.plan}</pre>
          </div>
          
          {plan.tips && plan.tips.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">重要提示</h3>
              <ul className="list-disc pl-5 space-y-2">
                {plan.tips.map((tip, index) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlanGenerator
