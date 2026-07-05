import { ChartConfiguration, ChartType } from 'chart.js';

export interface ChartTemplate {
  type: ChartType;
  label: string;
  icon: string;
  description: string;
  defaultConfig: ChartConfiguration;
  codeTemplates: {
    python: string;
    javascript: string;
    r: string;
  };
}

export const chartTemplates: Record<string, ChartTemplate> = {
  bar: {
    type: 'bar',
    label: 'Bar Chart',
    icon: 'BarChart3',
    description: 'Compare values across categories',
    defaultConfig: {
      type: 'bar',
      data: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        datasets: [{
          label: 'Values',
          data: [65, 59, 80, 81],
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(192, 132, 252, 0.8)',
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(139, 92, 246)',
            'rgb(168, 85, 247)',
            'rgb(192, 132, 252)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgb(156, 163, 175)',
              font: { size: 12 }
            }
          },
          title: {
            display: true,
            text: 'Bar Chart',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' }
          },
          y: {
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' }
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt
import numpy as np

categories = ['Category A', 'Category B', 'Category C', 'Category D']
values = [65, 59, 80, 81]

plt.figure(figsize=(10, 6))
colors = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc']
bars = plt.bar(categories, values, color=colors, edgecolor='white', linewidth=2)

for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height,
             f'{int(height)}',
             ha='center', va='bottom', fontsize=12)

plt.title('Bar Chart', fontsize=18, fontweight='bold', pad=20)
plt.xlabel('Categories', fontsize=12)
plt.ylabel('Values', fontsize=12)
plt.tight_layout()
plt.show()`,
      javascript: `import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [{
      label: 'Values',
      data: [65, 59, 80, 81],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(192, 132, 252, 0.8)',
      ],
      borderColor: [
        'rgb(99, 102, 241)',
        'rgb(139, 92, 246)',
        'rgb(168, 85, 247)',
        'rgb(192, 132, 252)',
      ],
      borderWidth: 2,
      borderRadius: 8,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Bar Chart' }
    }
  }
});`,
      r: `# Bar Chart in R
library(ggplot2)

categories <- c("Category A", "Category B", "Category C", "Category D")
values <- c(65, 59, 80, 81)

df <- data.frame(Category = categories, Value = values)

ggplot(df, aes(x = Category, y = Value, fill = Category)) +
  geom_bar(stat = "identity", color = "white", linewidth = 2) +
  geom_text(aes(label = Value), vjust = -0.5, size = 5) +
  scale_fill_manual(values = c("#6366f1", "#8b5cf6", "#a855f7", "#c084fc")) +
  labs(title = "Bar Chart", x = "Categories", y = "Values") +
  theme_minimal() +
  theme(text = element_text(color = "#9ca3af"))`
    }
  },
  line: {
    type: 'line',
    label: 'Line Chart',
    icon: 'TrendingUp',
    description: 'Show trends over time',
    defaultConfig: {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [30, 45, 35, 50, 60, 75],
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: 'rgb(156, 163, 175)' }
          },
          title: {
            display: true,
            text: 'Line Chart',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' }
          },
          y: {
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' }
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
revenue = [30, 45, 35, 50, 60, 75]

plt.figure(figsize=(10, 6))
plt.plot(months, revenue, marker='o', markersize=10,
         linewidth=3, color='#6366f1')
plt.fill_between(months, revenue, alpha=0.2, color='#6366f1')

for i, v in enumerate(revenue):
    plt.text(i, v + 2, str(v), ha='center', fontsize=11)

plt.title('Revenue Trend', fontsize=18, fontweight='bold', pad=20)
plt.xlabel('Month', fontsize=12)
plt.ylabel('Revenue ($K)', fontsize=12)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
      javascript: `const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [30, 45, 35, 50, 60, 75],
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
      r: `library(ggplot2)

months <- c("Jan", "Feb", "Mar", "Apr", "May", "Jun")
revenue <- c(30, 45, 35, 50, 60, 75)

df <- data.frame(Month = months, Revenue = revenue)

ggplot(df, aes(x = Month, y = Revenue, group = 1)) +
  geom_line(color = "#6366f1", linewidth = 1.5) +
  geom_point(size = 4, color = "#6366f1") +
  geom_area(fill = "#6366f1", alpha = 0.2) +
  labs(title = "Revenue Trend", x = "Month", y = "Revenue ($K)") +
  theme_minimal()`
    }
  },
  pie: {
    type: 'pie',
    label: 'Pie Chart',
    icon: 'PieChart',
    description: 'Show proportions of a whole',
    defaultConfig: {
      type: 'pie',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: [
            'rgba(99, 102, 241, 0.85)',
            'rgba(168, 85, 247, 0.85)',
            'rgba(236, 72, 153, 0.85)',
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(168, 85, 247)',
            'rgb(236, 72, 153)',
          ],
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: { color: 'rgb(156, 163, 175)', padding: 20 }
          },
          title: {
            display: true,
            text: 'Device Usage',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt

labels = ['Desktop', 'Mobile', 'Tablet']
sizes = [45, 35, 20]
colors = ['#6366f1', '#a855f7', '#ec4899']
explode = (0.05, 0.02, 0.02)

plt.figure(figsize=(10, 8))
wedges, texts, autotexts = plt.pie(sizes, labels=labels, colors=colors,
                                    autopct='%1.1f%%', startangle=90,
                                    explode=explode, shadow=True)

for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontsize(14)
    autotext.set_fontweight('bold')

plt.title('Device Usage Distribution', fontsize=18, fontweight='bold', pad=20)
plt.tight_layout()
plt.show()`,
      javascript: `new Chart(document.getElementById('myChart'), {
  type: 'pie',
  data: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(168, 85, 247, 0.85)',
        'rgba(236, 72, 153, 0.85)',
      ],
      borderWidth: 3,
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'right' } }
  }
});`,
      r: `library(ggplot2)

labels <- c("Desktop", "Mobile", "Tablet")
sizes <- c(45, 35, 20)
colors <- c("#6366f1", "#a855f7", "#ec4899")

df <- data.frame(Device = labels, Share = sizes)

ggplot(df, aes(x = "", y = Share, fill = Device)) +
  geom_bar(stat = "identity", width = 1) +
  coord_polar("y", start = 0) +
  scale_fill_manual(values = colors) +
  geom_text(aes(label = paste0(Share, "%")), position = stack(vjust = 0.5), color = "white") +
  labs(title = "Device Usage Distribution") +
  theme_void()`
    }
  },
  scatter: {
    type: 'scatter',
    label: 'Scatter Plot',
    icon: 'ScatterChart',
    description: 'Display relationships between variables',
    defaultConfig: {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Data Points',
          data: [
            { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 30 },
            { x: 25, y: 35 }, { x: 30, y: 40 }, { x: 35, y: 45 },
            { x: 40, y: 50 }, { x: 45, y: 55 }, { x: 50, y: 60 }
          ],
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderColor: 'rgb(99, 102, 241)',
          pointRadius: 10,
          pointHoverRadius: 14,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: 'rgb(156, 163, 175)' }
          },
          title: {
            display: true,
            text: 'Scatter Plot',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' },
            title: { display: true, text: 'X Axis', color: 'rgb(156, 163, 175)' }
          },
          y: {
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' },
            title: { display: true, text: 'Y Axis', color: 'rgb(156, 163, 175)' }
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.rand(20) * 50
y = x + np.random.randn(20) * 10

plt.figure(figsize=(10, 8))
plt.scatter(x, y, s=100, c='#6366f1', alpha=0.7, edgecolors='white', linewidth=2)

z = np.polyfit(x, y, 1)
p = np.poly1d(z)
plt.plot(x, p(x), "--", color='#ec4899', linewidth=2, label=f'Trend line')

plt.title('Scatter Plot with Trend', fontsize=18, fontweight='bold', pad=20)
plt.xlabel('X Axis', fontsize=12)
plt.ylabel('Y Axis', fontsize=12)
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
      javascript: `new Chart(document.getElementById('myChart'), {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Data Points',
      data: [
        { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 30 },
        { x: 25, y: 35 }, { x: 30, y: 40 }, { x: 35, y: 45 },
        { x: 40, y: 50 }, { x: 45, y: 55 }, { x: 50, y: 60 }
      ],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      pointRadius: 10,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'X Axis' } },
      y: { title: { display: true, text: 'Y Axis' } }
    }
  }
});`,
      r: `library(ggplot2)

set.seed(42)
df <- data.frame(
  x = runif(20, 0, 50),
  y = runif(20, 0, 50) + rnorm(20, 0, 5)
)

ggplot(df, aes(x = x, y = y)) +
  geom_point(size = 4, color = "#6366f1", alpha = 0.7) +
  geom_smooth(method = "lm", color = "#ec4899", linetype = "dashed") +
  labs(title = "Scatter Plot with Trend", x = "X Axis", y = "Y Axis") +
  theme_minimal() +
  theme(text = element_text(color = "#9ca3af"))`
    }
  },
  radar: {
    type: 'radar',
    label: 'Radar Chart',
    icon: 'Radar',
    description: 'Compare multiple variables',
    defaultConfig: {
      type: 'radar',
      data: {
        labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
        datasets: [
          {
            label: 'Product A',
            data: [85, 90, 78, 92, 88, 76],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            pointBackgroundColor: 'rgb(99, 102, 241)',
            pointBorderColor: '#fff',
          },
          {
            label: 'Product B',
            data: [78, 85, 92, 80, 75, 90],
            borderColor: 'rgb(236, 72, 153)',
            backgroundColor: 'rgba(236, 72, 153, 0.2)',
            pointBackgroundColor: 'rgb(236, 72, 153)',
            pointBorderColor: '#fff',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: 'rgb(156, 163, 175)' }
          },
          title: {
            display: true,
            text: 'Product Comparison',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(75, 85, 99, 0.5)' },
            grid: { color: 'rgba(75, 85, 99, 0.5)' },
            pointLabels: { color: 'rgb(156, 163, 175)' },
            ticks: { display: false },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt
import numpy as np

categories = ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design']
product_a = [85, 90, 78, 92, 88, 76]
product_b = [78, 85, 92, 80, 75, 90]

angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
product_a += product_a[:1]
product_b += product_b[:1]
angles += angles[:1]

fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(polar=True))

ax.plot(angles, product_a, 'o-', linewidth=3, color='#6366f1', label='Product A')
ax.fill(angles, product_a, alpha=0.25, color='#6366f1')
ax.plot(angles, product_b, 'o-', linewidth=3, color='#ec4899', label='Product B')
ax.fill(angles, product_b, alpha=0.25, color='#ec4899')

ax.set_xticks(angles[:-1])
ax.set_xticklabels(categories, fontsize=12)
ax.set_ylim(0, 100)
ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.0))
plt.title('Product Comparison', fontsize=18, fontweight='bold', pad=30)
plt.tight_layout()
plt.show()`,
      javascript: `new Chart(document.getElementById('myChart'), {
  type: 'radar',
  data: {
    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
    datasets: [
      { label: 'Product A', data: [85, 90, 78, 92, 88, 76],
        borderColor: 'rgb(99, 102, 241)', backgroundColor: 'rgba(99, 102, 241, 0.2)' },
      { label: 'Product B', data: [78, 85, 92, 80, 75, 90],
        borderColor: 'rgb(236, 72, 153)', backgroundColor: 'rgba(236, 72, 153, 0.2)' }
    ]
  },
  options: {
    responsive: true,
    scales: { r: { suggestedMin: 0, suggestedMax: 100 } }
  }
});`,
      r: `library(fmsb)

categories <- c("Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Design")
product_a <- c(85, 90, 78, 92, 88, 76)
product_b <- c(78, 85, 92, 80, 75, 90)

df <- as.data.frame(rbind(rep(100, 6), rep(0, 6), product_a, product_b))
colnames(df) <- categories

radarchart(df, axistype = 1,
           pcol = c("#6366f1", "#ec4899"),
           pfcol = c(scales::alpha("#6366f1", 0.25), scales::alpha("#ec4899", 0.25)),
           cglcol = "grey", cglwd = 1,
           vlcex = 1.2)
legend("topright", legend = c("Product A", "Product B"),
       col = c("#6366f1", "#ec4899"), lwd = 3)`
    }
  },
  doughnut: {
    type: 'doughnut',
    label: 'Doughnut Chart',
    icon: 'Circle',
    description: 'Pie chart with center cutout',
    defaultConfig: {
      type: 'doughnut',
      data: {
        labels: ['Social Media', 'Organic', 'Direct', 'Referral'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            'rgba(99, 102, 241, 0.85)',
            'rgba(168, 85, 247, 0.85)',
            'rgba(236, 72, 153, 0.85)',
            'rgba(34, 197, 94, 0.85)',
          ],
          borderWidth: 0,
          hoverOffset: 20,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: { color: 'rgb(156, 163, 175)', padding: 20 }
          },
          title: {
            display: true,
            text: 'Traffic Sources',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt

labels = ['Social Media', 'Organic', 'Direct', 'Referral']
sizes = [40, 30, 20, 10]
colors = ['#6366f1', '#a855f7', '#ec4899', '#22c55e']

plt.figure(figsize=(10, 8))
wedges, texts, autotexts = plt.pie(sizes, labels=labels, colors=colors,
                                    autopct='%1.1f%%', startangle=90,
                                    wedgeprops=dict(width=0.5))

for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontsize(12)
    autotext.set_fontweight('bold')

plt.title('Traffic Sources', fontsize=18, fontweight='bold', pad=20)
plt.tight_layout()
plt.show()`,
      javascript: `new Chart(document.getElementById('myChart'), {
  type: 'doughnut',
  data: {
    labels: ['Social Media', 'Organic', 'Direct', 'Referral'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(168, 85, 247, 0.85)',
        'rgba(236, 72, 153, 0.85)',
        'rgba(34, 197, 94, 0.85)',
      ],
      hoverOffset: 20,
    }]
  },
  options: {
    responsive: true,
    cutout: '60%',
    plugins: { legend: { position: 'right' } }
  }
});`,
      r: `library(ggplot2)

labels <- c("Social Media", "Organic", "Direct", "Referral")
sizes <- c(40, 30, 20, 10)
colors <- c("#6366f1", "#a855f7", "#ec4899", "#22c55e")

df <- data.frame(Source = labels, Share = sizes)

ggplot(df, aes(x = 2, y = Share, fill = Source)) +
  geom_bar(stat = "identity", width = 1, color = "white") +
  coord_polar("y", start = 0) +
  xlim(0.5, 2.5) +
  scale_fill_manual(values = colors) +
  geom_text(aes(label = paste0(Share, "%")), position = stack(vjust = 0.5), color = "white") +
  labs(title = "Traffic Sources") +
  theme_void() +
  theme(plot.title = element_text(hjust = 0.5))`
    }
  },
  stackedBar: {
    type: 'bar',
    label: 'Stacked Bar Chart',
    icon: 'Layers',
    description: 'Compare totals and parts',
    defaultConfig: {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Product A',
            data: [30, 45, 35, 50],
            backgroundColor: 'rgba(99, 102, 241, 0.85)',
          },
          {
            label: 'Product B',
            data: [25, 30, 40, 35],
            backgroundColor: 'rgba(168, 85, 247, 0.85)',
          },
          {
            label: 'Product C',
            data: [20, 25, 30, 28],
            backgroundColor: 'rgba(236, 72, 153, 0.85)',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: 'rgb(156, 163, 175)' }
          },
          title: {
            display: true,
            text: 'Quarterly Sales by Product',
            color: 'rgb(249, 250, 251)',
            font: { size: 18, weight: 'bold' }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: 'rgb(156, 163, 175)' }
          },
          y: {
            stacked: true,
            grid: { color: 'rgba(75, 85, 99, 0.3)' },
            ticks: { color: 'rgb(156, 163, 175)' }
          }
        }
      }
    },
    codeTemplates: {
      python: `import matplotlib.pyplot as plt
import numpy as np

quarters = ['Q1', 'Q2', 'Q3', 'Q4']
product_a = [30, 45, 35, 50]
product_b = [25, 30, 40, 35]
product_c = [20, 25, 30, 28]

plt.figure(figsize=(12, 7))
x = np.arange(len(quarters))
width = 0.6

p1 = plt.bar(x, product_a, width, label='Product A', color='#6366f1')
p2 = plt.bar(x, product_b, width, bottom=product_a, label='Product B', color='#a855f7')
p3 = plt.bar(x, product_c, width, bottom=np.array(product_a)+np.array(product_b),
             label='Product C', color='#ec4899')

plt.xlabel('Quarter', fontsize=12)
plt.ylabel('Sales ($K)', fontsize=12)
plt.title('Quarterly Sales by Product', fontsize=18, fontweight='bold', pad=20)
plt.xticks(x, quarters)
plt.legend(loc='upper left')
plt.tight_layout()
plt.show()`,
      javascript: `new Chart(document.getElementById('myChart'), {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Product A', data: [30, 45, 35, 50], backgroundColor: 'rgba(99, 102, 241, 0.85)' },
      { label: 'Product B', data: [25, 30, 40, 35], backgroundColor: 'rgba(168, 85, 247, 0.85)' },
      { label: 'Product C', data: [20, 25, 30, 28], backgroundColor: 'rgba(236, 72, 153, 0.85)' }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  }
});`,
      r: `library(ggplot2)

quarters <- c("Q1", "Q2", "Q3", "Q4")
df <- data.frame(
  Quarter = rep(quarters, 3),
  Sales = c(30, 45, 35, 50, 25, 30, 40, 35, 20, 25, 30, 28),
  Product = rep(c("A", "B", "C"), each = 4)
)

ggplot(df, aes(x = Quarter, y = Sales, fill = Product)) +
  geom_bar(stat = "identity") +
  scale_fill_manual(values = c("A" = "#6366f1", "B" = "#a855f7", "C" = "#ec4899")) +
  labs(title = "Quarterly Sales by Product", y = "Sales ($K)") +
  theme_minimal() +
  theme(text = element_text(color = "#9ca3af"))`
    }
  }
};

export const CHART_TYPES = [
  { id: 'bar', name: 'Bar Chart', icon: 'BarChart3' },
  { id: 'line', name: 'Line Chart', icon: 'TrendingUp' },
  { id: 'pie', name: 'Pie Chart', icon: 'PieChart' },
  { id: 'scatter', name: 'Scatter Plot', icon: 'ScatterChart' },
  { id: 'radar', name: 'Radar Chart', icon: 'Radar' },
  { id: 'doughnut', name: 'Doughnut Chart', icon: 'Circle' },
  { id: 'stackedBar', name: 'Stacked Bar', icon: 'Layers' },
] as const;

export type ChartTypeId = typeof CHART_TYPES[number]['id'];
