import styles from "./Home.module.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = ({ userRole = "sales" }) => {
  // Data untuk Sales Role
  const salesStats = [
    { label: "Total Leads (Monthly)", value: 126 },
    { label: "Conversion Rate (Monthly)", value: 40 },
    { label: "Total Calls (Monthly)", value: 63 },
    { label: "Follow-Up Today", value: "4/10" },
  ];

  const leadsPriorityData = [
    { name: "High", value: 21, percentage: 16.67, color: "#4ade80" },
    { name: "Medium", value: 30, percentage: 23.81, color: "#3b82f6" },
    { name: "Low", value: 45, percentage: 35.71, color: "#fbbf24" },
    { name: "Lowest", value: 30, percentage: 23.81, color: "#ef4444" },
  ];

  const leadsSubscribersData = [
    { name: "Leads", subscribed: 40, notSubscribed: 86 },
  ];

  const leadsConvertedData = [
    { month: "Jan", leads: 120, converted: 95 },
    { month: "Feb", leads: 115, converted: 90 },
    { month: "Mar", leads: 110, converted: 85 },
    { month: "Apr", leads: 105, converted: 88 },
    { month: "May", leads: 108, converted: 92 },
    { month: "Jun", leads: 112, converted: 90 },
    { month: "Jul", leads: 118, converted: 95 },
    { month: "Aug", leads: 122, converted: 98 },
    { month: "Sep", leads: 120, converted: 96 },
    { month: "Oct", leads: 125, converted: 100 },
    { month: "Nov", leads: 128, converted: 102 },
    { month: "Dec", leads: 126, converted: 100 },
  ];

  // Data untuk Admin Role
  const adminStats = [
    { label: "Total Sales", value: 30 },
    { label: "Total Leads", value: 126 },
    { label: "Total Conversions", value: 80 },
  ];

  const adminChartData = [
    { date: "1 Oct", desc1: 2, desc2: 0 },
    { date: "3 Oct", desc1: 2.5, desc2: 1 },
    { date: "7 Oct", desc1: 2, desc2: 1.5 },
    { date: "10 Oct", desc1: 1, desc2: 3 },
    { date: "14 Oct", desc1: 4, desc2: 2.5 },
    { date: "20 Oct", desc1: 3.5, desc2: 3.5 },
    { date: "23 Oct", desc1: 1.5, desc2: 2.5 },
    { date: "27 Oct", desc1: 3, desc2: 0.5 },
    { date: "30 Oct", desc1: 3.5, desc2: 2 },
  ];

  if (userRole === "admin") {
    return (
      <div className={styles.home}>
        {/* Admin Stats Cards */}
        <div className={styles.statsGrid}>
          {adminStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Admin Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Title Chart</h3>
            <div className={styles.chartControls}>
              <div className={styles.legend}>
                <span className={styles.legendItem}>
                  <span
                    className={styles.legendDot}
                    style={{ background: "#1e293b" }}
                  ></span>
                  Description
                </span>
                <span className={styles.legendItem}>
                  <span
                    className={styles.legendDot}
                    style={{ background: "#d97706" }}
                  ></span>
                  Description
                </span>
              </div>
              <div className={styles.tabs}>
                <button className={styles.tab}>Day</button>
                <button className={styles.tab}>Week</button>
                <button className={`${styles.tab} ${styles.tabActive}`}>
                  Month
                </button>
                <button className={styles.tab}>Year</button>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="desc1"
                stroke="#1e293b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="desc2"
                stroke="#d97706"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      {/* Sales Stats Cards */}
      <div className={styles.statsGrid}>
        {salesStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <h3 className={styles.statLabel}>{stat.label}</h3>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Leads by Priority */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Leads by Priority</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leadsPriorityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {leadsPriorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.pieLegend}>
            {leadsPriorityData.map((item, index) => (
              <div key={index} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ background: item.color }}
                ></span>
                <span className={styles.legendText}>{item.name}</span>
                <span className={styles.legendPercent}>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leads by Subscribers */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Leads by Subcribers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leadsSubscribersData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <Tooltip />
              <Bar dataKey="subscribed" fill="#a78bfa" stackId="a" />
              <Bar dataKey="notSubscribed" fill="#f9a8d4" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.barLegend}>
            <span className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: "#a78bfa" }}
              ></span>
              Subscribed
            </span>
            <span className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: "#f9a8d4" }}
              ></span>
              Non-subscribed
            </span>
          </div>
        </div>
      </div>

      {/* Leads and Converted Chart */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Leads and Converted per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={leadsConvertedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="converted"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
