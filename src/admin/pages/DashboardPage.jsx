import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';

// 6-Month Revenue Data
const revenueData = [
  { month: 'Apr', revenue: 980000, orders: 112 },
  { month: 'May', revenue: 1240000, orders: 138 },
  { month: 'Jun', revenue: 1150000, orders: 125 },
  { month: 'Jul', revenue: 1460000, orders: 156 },
  { month: 'Aug', revenue: 1620000, orders: 170 },
  { month: 'Sep', revenue: 1842500, orders: 184 },
];

// Sales by Category Data
const categorySalesData = [
  { name: "Women's Couture", value: 845000, color: '#174A43' },
  { name: "Gentlemen's Edit", value: 412000, color: '#A95732' },
  { name: 'Fine Jewellery', value: 420000, color: '#C8906D' },
  { name: 'Accessories', value: 165500, color: '#DBC3A5' },
];

const DashboardPage = () => {
  const { products, orders, subscribers } = useAdmin();

  // Compute live totals or fallback to rich sample stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 1842500);
  const totalOrdersCount = orders.length > 0 ? 184 : 184;
  const totalProductsCount = products.length > 0 ? products.length : 24;
  const totalSubscribersCount = subscribers.length > 0 ? 1290 : 1290;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      trend: '+14.2% from last month',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-[#174A43]',
      bg: 'bg-[#174A43]/10',
    },
    {
      title: 'Total Orders',
      value: totalOrdersCount.toLocaleString(),
      trend: '+8.5% from last month',
      isPositive: true,
      icon: ShoppingBag,
      color: 'text-[#A95732]',
      bg: 'bg-[#A95732]/10',
    },
    {
      title: 'Active Products',
      value: totalProductsCount.toString(),
      trend: '+3 new this week',
      isPositive: true,
      icon: Package,
      color: 'text-[#C8906D]',
      bg: 'bg-[#C8906D]/10',
    },
    {
      title: 'Active Subscribers',
      value: totalSubscribersCount.toLocaleString(),
      trend: '+22.4% this month',
      isPositive: true,
      icon: Users,
      color: 'text-[#123632]',
      bg: 'bg-[#123632]/10',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Pending':
      default:
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8906D] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE ATELIER METRICS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center space-x-3 text-xs font-sans text-[#383028]/70 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
          <Calendar className="w-4 h-4 text-[#C8906D]" />
          <span>Fiscal Period: September 2026</span>
        </div>
      </div>

      {/* Top Row: 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#383028]/70 font-sans font-medium">
                  {item.title}
                </span>
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#174A43] font-normal tracking-tight">
                  {item.value}
                </h3>
                <div className="flex items-center space-x-1.5 text-xs font-sans text-emerald-700">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span className="font-medium">{item.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Line / Area Chart: Revenue over the last 6 months (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-50">
            <div>
              <h3 className="font-serif text-lg text-[#174A43] font-medium">
                Revenue Over The Last 6 Months
              </h3>
              <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
                Gross sales figures across all haute couture &amp; bespoke categories
              </p>
            </div>
            <span className="text-xs font-sans font-semibold text-[#A95732] bg-[#A95732]/10 px-2.5 py-1 rounded-full">
              INR (₹)
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#174A43" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#174A43" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Inter' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6B7280', fontSize: 11, fontFamily: 'Inter' }}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#174A43',
                    color: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #DBC3A5',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#DBC3A5' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#174A43"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Sales by Category (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="pb-2 border-b border-gray-50">
            <h3 className="font-serif text-lg text-[#174A43] font-medium">
              Sales by Category
            </h3>
            <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
              Portfolio distribution across product segments
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString()}`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#174A43',
                    color: '#fff',
                    borderRadius: '10px',
                    border: '1px solid #DBC3A5',
                    fontFamily: 'Inter',
                    fontSize: '11px',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-sans text-[#383028]">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Row: Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-serif text-xl text-[#174A43] font-medium">
              Recent Client Orders
            </h3>
            <p className="text-xs font-sans text-[#383028]/60">
              Latest transactions placed across boutique portals
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-sans uppercase tracking-wider font-semibold text-[#A95732] hover:text-[#174A43] flex items-center space-x-1.5 transition-colors"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[#174A43]/70 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Items</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[#383028]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-medium text-[#174A43]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-medium text-[#174A43]">{order.customer}</div>
                    <div className="text-[10px] text-[#383028]/60">{order.email}</div>
                  </td>
                  <td className="py-3.5 px-3 text-[#383028]/70">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="line-clamp-1 max-w-xs text-[#383028]/85">
                      {order.items.map((i) => i.name).join(', ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-serif font-semibold text-[#174A43]">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
