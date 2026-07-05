'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  pendingInvoices: number;
  totalHours: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeProjects: 0,
    pendingInvoices: 0,
    totalHours: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from API
    // For now, using dummy data
    setTimeout(() => {
      setStats({
        totalClients: 12,
        activeProjects: 5,
        pendingInvoices: 3,
        totalHours: 147.5,
      });
      setLoading(false);
    }, 500);
  }, []);

  const statCards = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: '👥',
      color: 'bg-blue-500',
      href: '/clients',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: '📋',
      color: 'bg-green-500',
      href: '/projects',
    },
    {
      title: 'Pending Invoices',
      value: stats.pendingInvoices,
      icon: '💰',
      color: 'bg-yellow-500',
      href: '/invoices',
    },
    {
      title: 'Total Hours',
      value: stats.totalHours,
      icon: '⏱️',
      color: 'bg-purple-500',
      href: '/time',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's an overview of your freelance business.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-3 rounded-md ${stat.color}`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {[
              { name: 'Website Redesign', client: 'Acme Corp', status: 'In Progress', hours: 24 },
              { name: 'Mobile App Development', client: 'TechStart Inc', status: 'Review', hours: 45 },
              { name: 'Brand Identity', client: 'Creative Co', status: 'Completed', hours: 18 },
            ].map((project, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{project.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h2>
          <div className="space-y-4">
            {[
              { id: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'Paid' },
              { id: 'INV-002', client: 'TechStart Inc', amount: 4800, status: 'Pending' },
              { id: 'INV-003', client: 'Creative Co', amount: 1200, status: 'Overdue' },
            ].map((invoice, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${invoice.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
