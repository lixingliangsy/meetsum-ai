import { ChartConfiguration } from 'chart.js';

interface GenerateRequest {
  data: string;
  description: string;
  chartType?: string;
}

interface GenerateResponse {
  success: boolean;
  config?: ChartConfiguration;
  code?: {
    python: string;
    javascript: string;
    r: string;
  };
  error?: string;
}

export class AIService {
  private apiKey: string | undefined;
  private baseUrl: string = 'https://api.openai.com/v1';

  constructor() {
    if (typeof window !== 'undefined') {
      this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    } else {
      this.apiKey = process.env.OPENAI_API_KEY;
    }
  }

  async generateChartConfig(data: string, description: string, chartType?: string): Promise<GenerateResponse> {
    if (!this.apiKey || this.apiKey === 'sk-your-openai-api-key-here') {
      return this.getDemoConfig(chartType);
    }

    try {
      const prompt = this.buildPrompt(data, description, chartType);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, description, chartType }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getDemoConfig(chartType);
    }
  }

  private buildPrompt(data: string, description: string, chartType?: string): string {
    return `Given the following data and description, generate a chart configuration for Chart.js.
Data: ${data}
Description: ${description}
Chart Type: ${chartType || 'auto-detect'}
Generate a valid JSON Chart.js configuration.`;
  }

  private getDemoConfig(chartType?: string): GenerateResponse {
    const type = chartType || 'bar';
    
    const demoConfigs: Record<string, ChartConfiguration> = {
      bar: {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Revenue',
            data: [45, 52, 48, 61],
            backgroundColor: [
              'rgba(99, 102, 241, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(192, 132, 252, 0.8)',
            ],
            borderRadius: 8,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: 'Quarterly Revenue' }
          }
        }
      },
      line: {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Users',
            data: [120, 190, 150, 220, 280, 350],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: true, text: 'User Growth' }
          }
        }
      },
      pie: {
        type: 'pie',
        data: {
          labels: ['Direct', 'Organic', 'Social', 'Referral'],
          datasets: [{
            data: [35, 40, 15, 10],
            backgroundColor: [
              'rgba(99, 102, 241, 0.85)',
              'rgba(168, 85, 247, 0.85)',
              'rgba(236, 72, 153, 0.85)',
              'rgba(34, 197, 94, 0.85)',
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            title: { display: true, text: 'Traffic Sources' }
          }
        }
      },
      scatter: {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Data Points',
            data: [
              { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 30 },
              { x: 25, y: 35 }, { x: 30, y: 42 }, { x: 35, y: 48 },
              { x: 40, y: 52 }, { x: 45, y: 58 }, { x: 50, y: 65 }
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: true, text: 'Correlation Analysis' }
          }
        }
      },
      radar: {
        type: 'radar',
        data: {
          labels: ['Speed', 'Quality', 'Price', 'Support', 'Features', 'Design'],
          datasets: [{
            label: 'Your Rating',
            data: [85, 90, 70, 95, 80, 88],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
          }]
        },
        options: {
          responsive: true,
          scales: { r: { suggestedMin: 0, suggestedMax: 100 } }
        }
      },
      doughnut: {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'In Progress', 'Pending'],
          datasets: [{
            data: [60, 25, 15],
            backgroundColor: [
              'rgba(99, 102, 241, 0.85)',
              'rgba(168, 85, 247, 0.85)',
              'rgba(236, 72, 153, 0.85)',
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            title: { display: true, text: 'Project Status' }
          }
        }
      },
      stackedBar: {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            { label: 'New', data: [12, 15, 18, 22], backgroundColor: 'rgba(99, 102, 241, 0.85)' },
            { label: 'Returning', data: [28, 32, 35, 40], backgroundColor: 'rgba(168, 85, 247, 0.85)' },
            { label: 'VIP', data: [8, 10, 12, 15], backgroundColor: 'rgba(236, 72, 153, 0.85)' },
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true }
          }
        }
      },
    };

    return {
      success: true,
      config: demoConfigs[type] || demoConfigs.bar,
      code: {
        python: this.generatePythonCode(type),
        javascript: this.generateJavaScriptCode(type),
        r: this.generateRCode(type),
      }
    };
  }

  private generatePythonCode(chartType: string): string {
    const templates: Record<string, string> = {
      bar: `import matplotlib.pyplot as plt
import numpy as np

quarters = ['Q1', 'Q2', 'Q3', 'Q4']
revenue = [45, 52, 48, 61]

plt.figure(figsize=(10, 6))
colors = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc']
bars = plt.bar(quarters, revenue, color=colors, edgecolor='white', linewidth=2)

for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height,
             f'{int(height)}K',
             ha='center', va='bottom', fontsize=12)

plt.title('Quarterly Revenue', fontsize=18, fontweight='bold', pad=20)
plt.xlabel('Quarter', fontsize=12)
plt.ylabel('Revenue ($K)', fontsize=12)
plt.tight_layout()
plt.show()`,
      line: `import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
users = [120, 190, 150, 220, 280, 350]

plt.figure(figsize=(10, 6))
plt.plot(months, users, marker='o', markersize=10,
         linewidth=3, color='#6366f1')
plt.fill_between(months, users, alpha=0.2, color='#6366f1')

for i, v in enumerate(users):
    plt.text(i, v + 10, str(v), ha='center', fontsize=11)

plt.title('User Growth', fontsize=18, fontweight='bold', pad=20)
plt.xlabel('Month', fontsize=12)
plt.ylabel('Users', fontsize=12)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
      pie: `import matplotlib.pyplot as plt

labels = ['Direct', 'Organic', 'Social', 'Referral']
sizes = [35, 40, 15, 10]
colors = ['#6366f1', '#a855f7', '#ec4899', '#22c55e']
explode = (0.05, 0.02, 0.02, 0.02)

plt.figure(figsize=(10, 8))
plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%',
        startangle=90, explode=explode, shadow=True)
plt.title('Traffic Sources', fontsize=18, fontweight='bold', pad=20)
plt.tight_layout()
plt.show()`,
      scatter: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.rand(20) * 50
y = x + np.random.randn(20) * 10

plt.figure(figsize=(10, 8))
plt.scatter(x, y, s=100, c='#6366f1', alpha=0.7, edgecolors='white', linewidth=2)

z = np.polyfit(x, y, 1)
p = np.poly1d(z)
plt.plot(x, p(x), "--", color='#ec4899', linewidth=2, label='Trend line')

plt.title('Correlation Analysis', fontsize=18, fontweight='bold', pad=20)
plt.xlabel('X Variable', fontsize=12)
plt.ylabel('Y Variable', fontsize=12)
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
      radar: `import matplotlib.pyplot as plt
import numpy as np

categories = ['Speed', 'Quality', 'Price', 'Support', 'Features', 'Design']
values = [85, 90, 70, 95, 80, 88]

angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
values += values[:1]
angles += angles[:1]

fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(polar=True))
ax.plot(angles, values, 'o-', linewidth=3, color='#6366f1')
ax.fill(angles, values, alpha=0.25, color='#6366f1')

ax.set_xticks(angles[:-1])
ax.set_xticklabels(categories, fontsize=12)
ax.set_ylim(0, 100)
plt.title('Performance Metrics', fontsize=18, fontweight='bold', pad=30)
plt.tight_layout()
plt.show()`,
      doughnut: `import matplotlib.pyplot as plt

labels = ['Completed', 'In Progress', 'Pending']
sizes = [60, 25, 15]
colors = ['#6366f1', '#a855f7', '#ec4899']

plt.figure(figsize=(10, 8))
wedges, texts, autotexts = plt.pie(sizes, labels=labels, colors=colors,
                                    autopct='%1.1f%%', startangle=90,
                                    wedgeprops=dict(width=0.5))
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontsize(12)
    autotext.set_fontweight('bold')
plt.title('Project Status', fontsize=18, fontweight='bold', pad=20)
plt.tight_layout()
plt.show()`,
      stackedBar: `import matplotlib.pyplot as plt
import numpy as np

weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
new_users = [12, 15, 18, 22]
returning = [28, 32, 35, 40]
vip = [8, 10, 12, 15]

plt.figure(figsize=(12, 7))
x = np.arange(len(weeks))
width = 0.6

p1 = plt.bar(x, new_users, width, label='New', color='#6366f1')
p2 = plt.bar(x, returning, width, bottom=new_users, label='Returning', color='#a855f7')
p3 = plt.bar(x, vip, width, bottom=np.array(new_users)+np.array(returning), label='VIP', color='#ec4899')

plt.xlabel('Week', fontsize=12)
plt.ylabel('Users', fontsize=12)
plt.title('Weekly User Breakdown', fontsize=18, fontweight='bold', pad=20)
plt.xticks(x, weeks)
plt.legend(loc='upper left')
plt.tight_layout()
plt.show()`,
    };

    return templates[chartType] || templates.bar;
  }

  private generateJavaScriptCode(chartType: string): string {
    const templates: Record<string, string> = {
      bar: `import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Revenue',
      data: [45, 52, 48, 61],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(192, 132, 252, 0.8)',
      ],
      borderRadius: 8,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Quarterly Revenue' }
    }
  }
});`,
      line: `import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Users',
      data: [120, 190, 150, 220, 280, 350],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } }
  }
});`,
      pie: `const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Direct', 'Organic', 'Social', 'Referral'],
    datasets: [{
      data: [35, 40, 15, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(168, 85, 247, 0.85)',
        'rgba(236, 72, 153, 0.85)',
        'rgba(34, 197, 94, 0.85)',
      ],
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'right' } }
  }
});`,
      scatter: `const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Data Points',
      data: [
        { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 30 },
        { x: 25, y: 35 }, { x: 30, y: 42 }, { x: 35, y: 48 },
        { x: 40, y: 52 }, { x: 45, y: 58 }, { x: 50, y: 65 }
      ],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'X Variable' } },
      y: { title: { display: true, text: 'Y Variable' } }
    }
  }
});`,
      radar: `const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Speed', 'Quality', 'Price', 'Support', 'Features', 'Design'],
    datasets: [{
      label: 'Your Rating',
      data: [85, 90, 70, 95, 80, 88],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
    }]
  },
  options: {
    responsive: true,
    scales: { r: { suggestedMin: 0, suggestedMax: 100 } }
  }
});`,
      doughnut: `const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(168, 85, 247, 0.85)',
        'rgba(236, 72, 153, 0.85)',
      ],
    }]
  },
  options: {
    responsive: true,
    cutout: '60%',
    plugins: { legend: { position: 'right' } }
  }
});`,
      stackedBar: `const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'New', data: [12, 15, 18, 22], backgroundColor: 'rgba(99, 102, 241, 0.85)' },
      { label: 'Returning', data: [28, 32, 35, 40], backgroundColor: 'rgba(168, 85, 247, 0.85)' },
      { label: 'VIP', data: [8, 10, 12, 15], backgroundColor: 'rgba(236, 72, 153, 0.85)' }
    ]
  },
  options: {
    responsive: true,
    scales: { x: { stacked: true }, y: { stacked: true } }
  }
});`,
    };

    return templates[chartType] || templates.bar;
  }

  private generateRCode(chartType: string): string {
    const templates: Record<string, string> = {
      bar: `library(ggplot2)

quarters <- c("Q1", "Q2", "Q3", "Q4")
revenue <- c(45, 52, 48, 61)

df <- data.frame(Quarter = quarters, Revenue = revenue)

ggplot(df, aes(x = Quarter, y = Revenue, fill = Quarter)) +
  geom_bar(stat = "identity", color = "white", linewidth = 2) +
  geom_text(aes(label = paste0(Revenue, "K")), vjust = -0.5, size = 5) +
  scale_fill_manual(values = c("#6366f1", "#8b5cf6", "#a855f7", "#c084fc")) +
  labs(title = "Quarterly Revenue", x = "Quarter", y = "Revenue ($K)") +
  theme_minimal() +
  theme(text = element_text(color = "#9ca3af"))`,
      line: `library(ggplot2)

months <- c("Jan", "Feb", "Mar", "Apr", "May", "Jun")
users <- c(120, 190, 150, 220, 280, 350)

df <- data.frame(Month = months, Users = users)

ggplot(df, aes(x = Month, y = Users, group = 1)) +
  geom_line(color = "#6366f1", linewidth = 1.5) +
  geom_point(size = 4, color = "#6366f1") +
  geom_area(fill = "#6366f1", alpha = 0.2) +
  labs(title = "User Growth", x = "Month", y = "Users") +
  theme_minimal()`,
      pie: `library(ggplot2)

labels <- c("Direct", "Organic", "Social", "Referral")
sizes <- c(35, 40, 15, 10)
colors <- c("#6366f1", "#a855f7", "#ec4899", "#22c55e")

df <- data.frame(Source = labels, Share = sizes)

ggplot(df, aes(x = "", y = Share, fill = Source)) +
  geom_bar(stat = "identity", width = 1) +
  coord_polar("y", start = 0) +
  scale_fill_manual(values = colors) +
  geom_text(aes(label = paste0(Share, "%")), position = stack(vjust = 0.5), color = "white") +
  labs(title = "Traffic Sources") +
  theme_void()`,
      scatter: `library(ggplot2)

set.seed(42)
df <- data.frame(
  x = runif(20, 0, 50),
  y = runif(20, 0, 50) + rnorm(20, 0, 5)
)

ggplot(df, aes(x = x, y = y)) +
  geom_point(size = 4, color = "#6366f1", alpha = 0.7) +
  geom_smooth(method = "lm", color = "#ec4899", linetype = "dashed") +
  labs(title = "Correlation Analysis", x = "X Variable", y = "Y Variable") +
  theme_minimal()`,
      radar: `library(fmsb)

categories <- c("Speed", "Quality", "Price", "Support", "Features", "Design")
values <- c(85, 90, 70, 95, 80, 88)

df <- as.data.frame(rbind(rep(100, 6), rep(0, 6), values))
colnames(df) <- categories

radarchart(df, axistype = 1,
           pcol = "#6366f1",
           pfcol = scales::alpha("#6366f1", 0.25),
           cglcol = "grey", cglwd = 1,
           vlcex = 1.2)
title(main = "Performance Metrics")`,
      doughnut: `library(ggplot2)

labels <- c("Completed", "In Progress", "Pending")
sizes <- c(60, 25, 15)
colors <- c("#6366f1", "#a855f7", "#ec4899")

df <- data.frame(Status = labels, Share = sizes)

ggplot(df, aes(x = 2, y = Share, fill = Status)) +
  geom_bar(stat = "identity", width = 1, color = "white") +
  coord_polar("y", start = 0) +
  xlim(0.5, 2.5) +
  scale_fill_manual(values = colors) +
  geom_text(aes(label = paste0(Share, "%")), position = stack(vjust = 0.5), color = "white") +
  labs(title = "Project Status") +
  theme_void()`,
      stackedBar: `library(ggplot2)

weeks <- c("Week 1", "Week 2", "Week 3", "Week 4")
df <- data.frame(
  Week = rep(weeks, 3),
  Users = c(12, 15, 18, 22, 28, 32, 35, 40, 8, 10, 12, 15),
  Type = rep(c("New", "Returning", "VIP"), each = 4)
)

ggplot(df, aes(x = Week, y = Users, fill = Type)) +
  geom_bar(stat = "identity") +
  scale_fill_manual(values = c("New" = "#6366f1", "Returning" = "#a855f7", "VIP" = "#ec4899")) +
  labs(title = "Weekly User Breakdown", y = "Users") +
  theme_minimal()`,
    };

    return templates[chartType] || templates.bar;
  }

  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey !== 'sk-your-openai-api-key-here';
  }
}

export const aiService = new AIService();
export default aiService;
