import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign,
  Loader2,
  BarChart3,
  PieChart
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend
} from "recharts";
import { PLAN_IDS, PLAN_LABELS, PAYMENT_STATUS } from "@/components/paymentConstants";

const COLORS = {
  [PLAN_IDS.BASIC]: "#3B82F6",
  [PLAN_IDS.PROFESSIONAL]: "#8B5CF6",
  [PLAN_IDS.BUSINESS]: "#F59E0B"
};

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, payments] = await Promise.all([
          base44.entities.User.list(),
          base44.entities.Payment.list()
        ]);

        // Calculate stats
        const totalUsers = users.length;
        const adminUsers = users.filter(u => u.role === "admin").length;
        const regularUsers = totalUsers - adminUsers;

        // Payment stats
        const successfulPayments = payments.filter(p => p.status === PAYMENT_STATUS.SUCCEEDED);
        const totalRevenue = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        const totalTransactions = payments.length;

        // Plan distribution
        const planCounts = {
          [PLAN_IDS.BASIC]: 0,
          [PLAN_IDS.PROFESSIONAL]: 0,
          [PLAN_IDS.BUSINESS]: 0
        };
        
        successfulPayments.forEach(p => {
          if (p.plan_id && planCounts.hasOwnProperty(p.plan_id)) {
            planCounts[p.plan_id]++;
          }
        });

        const planDistribution = Object.entries(planCounts).map(([planId, count]) => ({
          name: PLAN_LABELS.es[planId] || planId,
          value: count,
          planId
        }));

        // Monthly revenue (last 6 months)
        const monthlyRevenue = calculateMonthlyRevenue(successfulPayments);

        // Payment status distribution
        const statusCounts = {
          succeeded: payments.filter(p => p.status === PAYMENT_STATUS.SUCCEEDED).length,
          pending: payments.filter(p => p.status === PAYMENT_STATUS.PENDING).length,
          failed: payments.filter(p => p.status === PAYMENT_STATUS.FAILED).length,
          canceled: payments.filter(p => p.status === PAYMENT_STATUS.CANCELED).length
        };

        setStats({
          totalUsers,
          regularUsers,
          adminUsers,
          totalRevenue,
          totalTransactions,
          successfulTransactions: successfulPayments.length,
          planDistribution,
          monthlyRevenue,
          statusCounts
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Usuarios"
          value={stats.totalUsers}
          subtitle={`${stats.regularUsers} usuarios, ${stats.adminUsers} admins`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Ingresos Totales"
          value={`₡${(stats.totalRevenue / 100).toLocaleString()}`}
          subtitle="Pagos exitosos"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Transacciones"
          value={stats.totalTransactions}
          subtitle={`${stats.successfulTransactions} exitosas`}
          icon={CreditCard}
          color="purple"
        />
        <StatCard
          title="Tasa de Éxito"
          value={stats.totalTransactions > 0 
            ? `${Math.round((stats.successfulTransactions / stats.totalTransactions) * 100)}%`
            : "N/A"
          }
          subtitle="Pagos completados"
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Ingresos Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => `₡${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₡${value.toLocaleString()}`, "Ingresos"]}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Bar dataKey="revenue" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Distribución de Planes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={stats.planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => 
                      percent > 0 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''
                    }
                    labelLine={false}
                  >
                    {stats.planDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.planId] || "#94A3B8"} 
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [value, "Suscripciones"]} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Estado de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatusBadge 
              label="Exitosos" 
              count={stats.statusCounts.succeeded} 
              color="green" 
            />
            <StatusBadge 
              label="Pendientes" 
              count={stats.statusCounts.pending} 
              color="yellow" 
            />
            <StatusBadge 
              label="Fallidos" 
              count={stats.statusCounts.failed} 
              color="red" 
            />
            <StatusBadge 
              label="Cancelados" 
              count={stats.statusCounts.canceled} 
              color="gray" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600"
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ label, count, color }) {
  const colorClasses = {
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]} text-center`}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function calculateMonthlyRevenue(payments) {
  const months = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString('es-CR', { month: 'short', year: '2-digit' });
    months.push({
      month: monthKey,
      revenue: 0,
      date
    });
  }

  payments.forEach(payment => {
    const paymentDate = new Date(payment.created_date);
    months.forEach(m => {
      if (
        paymentDate.getMonth() === m.date.getMonth() &&
        paymentDate.getFullYear() === m.date.getFullYear()
      ) {
        m.revenue += (payment.amount || 0) / 100; // Convert from cents
      }
    });
  });

  return months.map(({ month, revenue }) => ({ month, revenue }));
}