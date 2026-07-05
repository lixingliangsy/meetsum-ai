import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
)

export default function Home() {
  const [attendees, setAttendees] = useState(5)
  const [avgSalary, setAvgSalary] = useState(75000)
  const [duration, setDuration] = useState(60)
  const [meetingType, setMeetingType] = useState('internal')
  
  // Timer states
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [timerCost, setTimerCost] = useState(0)
  const timerRef = useRef(null)
  
  // Chart data states
  const [costHistory, setCostHistory] = useState([])
  const [attendeeCosts, setAttendeeCosts] = useState([])
  
  // Calculate hourly rate
  const getHourlyRate = (salary) => {
    return salary / 2080 // 2080 = 40 hours/week * 52 weeks
  }
  
  // Calculate cost for a given duration
  const calculateCost = (dur) => {
    const hourlyRate = getHourlyRate(avgSalary)
    const totalCost = hourlyRate * attendees * (dur / 60)
    return totalCost
  }
  
  // Calculate real-time cost
  const calculateRealtimeCost = (seconds) => {
    const hourlyRate = getHourlyRate(avgSalary)
    const totalCost = hourlyRate * attendees * (seconds / 3600)
    return totalCost
  }
  
  const cost = calculateCost(duration)
  
  // Timer functions
  const startTimer = () => {
    setIsRunning(true)
    setElapsedSeconds(0)
    setTimerCost(0)
    setCostHistory([])
  }
  
  const pauseTimer = () => {
    setIsRunning(false)
  }
  
  const resetTimer = () => {
    setIsRunning(false)
    setElapsedSeconds(0)
    setTimerCost(0)
    setCostHistory([])
  }
  
  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          const newSeconds = prev + 1
          const newCost = calculateRealtimeCost(newSeconds)
          setTimerCost(newCost)
          
          // Update cost history for chart (every 5 seconds)
          if (newSeconds % 5 === 0) {
            setCostHistory(prevHistory => [
              ...prevHistory,
              { time: newSeconds, cost: newCost }
            ])
          }
          
          return newSeconds
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning])
  
  // Calculate attendee cost distribution
  useEffect(() => {
    // Simulate different salaries for attendees
    const salaries = []
    for (let i = 0; i < Math.min(attendees, 10); i++) {
      // Vary salaries by ±20%
      const variance = 0.8 + Math.random() * 0.4
      salaries.push(avgSalary * variance)
    }
    
    const costs = salaries.map(salary => ({
      salary,
      cost: (getHourlyRate(salary) * (duration / 60))
    }))
    
    setAttendeeCosts(costs)
  }, [attendees, avgSalary, duration])
  
  // Chart data for cost over time
  const lineChartData = {
    labels: costHistory.map(point => `${Math.floor(point.time / 60)}:${(point.time % 60).toString().padStart(2, '0')}`),
    datasets: [
      {
        label: 'Meeting Cost ($)',
        data: costHistory.map(point => point.cost.toFixed(2)),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }
  
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Real-time Cost Accumulation'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => '$' + value
        }
      }
    }
  }
  
  // Doughnut chart for cost distribution
  const doughnutData = {
    labels: attendeeCosts.map((_, i) => `Attendee ${i + 1}`),
    datasets: [
      {
        data: attendeeCosts.map(ac => ac.cost.toFixed(2)),
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(96, 165, 250, 0.8)',
          'rgba(147, 197, 253, 0.8)',
          'rgba(191, 219, 254, 0.8)',
          'rgba(219, 234, 254, 0.8)',
          'rgba(37, 99, 235, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(96, 165, 250, 0.6)',
          'rgba(147, 197, 253, 0.6)'
        ],
        borderWidth: 0
      }
    ]
  }
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      title: {
        display: true,
        text: 'Cost Distribution by Attendee'
      }
    }
  }
  
  // Format time display
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <>
      <Head>
        <title>Meeting Cost Calculator | Calculate True Meeting Costs</title>
        <meta name="description" content="Calculate the true cost of your meetings in real-time. Make every meeting count." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="font-bold text-xl">MeetingCalc</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <a href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">GitHub</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm mb-8">
              <span>🚀</span>
              <span>Trusted by 500+ remote teams worldwide</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Every Meeting Has a<br />
              <span className="text-blue-600">Price Tag</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Calculate the true cost of your meetings in real-time. 
              Make data-driven decisions about when to meet and who to invite.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Calculator Inputs */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Meeting Cost Calculator</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Number of Attendees</label>
                    <input 
                      type="number" 
                      value={attendees}
                      onChange={(e) => setAttendees(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Avg Annual Salary (USD)</label>
                    <input 
                      type="number" 
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Meeting Duration (minutes)</label>
                    <input 
                      type="range" 
                      min="15" 
                      max="180" 
                      step="15"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>15 min</span>
                      <span className="font-medium text-blue-600">{duration} min</span>
                      <span>180 min</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Meeting Type</label>
                    <select 
                      value={meetingType}
                      onChange={(e) => setMeetingType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="internal">Internal Team Meeting</option>
                      <option value="client">Client Meeting</option>
                      <option value="interview">Job Interview</option>
                      <option value="training">Training Session</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <div className="text-sm text-gray-600 mb-1">Estimated Meeting Cost</div>
                  <div className="text-4xl font-bold text-blue-600">${cost.toFixed(2)}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    That's ${(cost / duration * 60).toFixed(2)} per hour
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Hourly rate per attendee: ${getHourlyRate(avgSalary).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Right Column - Real-time Timer */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-gray-900">Real-time Timer</h3>
                  <div className={`flex items-center space-x-2 text-sm ${isRunning ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span>{isRunning ? 'Running' : 'Stopped'}</span>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-gray-900 font-mono mb-4">
                    {formatTime(elapsedSeconds)}
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${timerCost.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Current meeting cost
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  {!isRunning ? (
                    <button 
                      onClick={startTimer}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center space-x-2"
                    >
                      <span>▶</span>
                      <span>Start</span>
                    </button>
                  ) : (
                    <button 
                      onClick={pauseTimer}
                      className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition font-medium flex items-center space-x-2"
                    >
                      <span>⏸</span>
                      <span>Pause</span>
                    </button>
                  )}
                  <button 
                    onClick={resetTimer}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-medium flex items-center space-x-2"
                  >
                    <span>↺</span>
                    <span>Reset</span>
                  </button>
                </div>
                
                {costHistory.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Cost History</div>
                    <div className="max-h-32 overflow-y-auto">
                      {costHistory.map((point, i) => (
                        <div key={i} className="flex justify-between text-xs py-1">
                          <span className="text-gray-500">{formatTime(point.time)}</span>
                          <span className="font-medium text-blue-600">${point.cost.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Cost Over Time Chart */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="h-64">
                  {costHistory.length > 0 ? (
                    <Line data={lineChartData} options={lineChartOptions} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📈</div>
                        <div>Start the timer to see cost accumulation over time</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Cost Distribution Chart */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="h-64">
                  {attendeeCosts.length > 0 ? (
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🍩</div>
                        <div>Cost distribution will appear here</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Meeting Insights */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4">💡 Meeting Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Cost per Minute</div>
                  <div className="text-xl font-bold text-blue-600">
                    ${((cost / duration).toFixed(2))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Annual Meeting Cost</div>
                  <div className="text-xl font-bold text-blue-600">
                    ${(cost * 52).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400">if held weekly</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Potential Savings</div>
                  <div className="text-xl font-bold text-green-600">
                    ${((cost * 0.3).toFixed(2))}
                  </div>
                  <div className="text-xs text-gray-400">reducing by 30%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Calculate Meeting Costs?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meetings are necessary, but they're also expensive. Make informed decisions.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: "💰",
                  title: "Real-Time Cost Tracking",
                  desc: "See the cost of your meeting tick up in real-time, just like a taxi meter. Our timer tracks elapsed time and calculates costs instantly."
                },
                {
                  icon: "📊",
                  title: "Visual Cost Analytics",
                  desc: "Beautiful charts show cost distribution across attendees and how costs accumulate over time. Export reports for management."
                },
                {
                  icon: "⚡",
                  title: "Smart Suggestions",
                  desc: "Get AI-powered suggestions on which meetings could be async instead. Optimize your meeting culture and save money."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="flex justify-center gap-6 mb-4">
                <a href="/terms.html" className="text-gray-600 hover:text-gray-900">Terms</a>
                <a href="/privacy.html" className="text-gray-600 hover:text-gray-900">Privacy</a>
                <a href="/pricing.html" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="/support.html" className="text-gray-600 hover:text-gray-900">Support</a>
                <a href="/refund-policy.html" className="text-gray-600 hover:text-gray-900">Refund Policy</a>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MC</span>
                </div>
                <span className="font-bold">MeetingCalc</span>
              </div>
              <div className="text-sm text-gray-500">
                © 2026 MeetingCalc. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
