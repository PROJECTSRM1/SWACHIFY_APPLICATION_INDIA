
import { Card, Col, Divider, Row, Space, Statistic, Table, Tag, Typography } from 'antd'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { dashboardStats, statusColors, ticketChartData } from './data'
import type { Ticket } from './types'


type Props = {
  tickets: Ticket[]
}

const DashboardPage = ({ tickets }: Props) => {
  const recentTickets = tickets.slice(0, 4)

  return (
    <div className="sw-ad-page-card">
      <section className="sw-ad-stats-grid">
        {dashboardStats.map((stat) => (
          <Card key={stat.key} className="sw-ad-stat-card" bordered={false}>
            <Space size="large" align="center">
              <div className="sw-ad-stat-icon">{stat.icon}</div>
              <div>
                <Typography.Text className="sw-ad-stat-label">{stat.label}</Typography.Text>
                <Typography.Title level={3} className="sw-ad-stat-value">
                  {stat.value.toLocaleString()}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        ))}
      </section>

      <div className="sw-ad-chart-scroll">
        <Row gutter={24} className="sw-ad-chart-row">
          <Col xs={24} lg={12}>
            <Card title="Ticket Volume Trend" className="sw-ad-chart-card" extra={<Tag color="green">Live</Tag>}>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={ticketChartData}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#52c41a" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#52c41a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="active" stroke="#ff4d4f" fillOpacity={1} fill="url(#colorActive)" />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#52c41a"
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Operational Snapshot" className="sw-ad-chart-card">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic title="Avg. Resolution" value="6h 18m" />
                </Col>
                <Col span={12}>
                  <Statistic title="SLA Compliance" value="92%" />
                </Col>
                <Col span={12}>
                  <Statistic title="Escalations" value={4} suffix="/ week" />
                </Col>
                <Col span={12}>
                  <Statistic title="Pending Approvals" value={12} />
                </Col>
              </Row>
              <Divider />
              <Space direction="vertical" className="sw-ad-legend">
                <div className="sw-ad-legend-row">
                  <span className="sw-ad-legend-dot sw-ad-legend-dot--red" />
                  Active tickets are trending upward this week
                </div>
                <div className="sw-ad-legend-row">
                  <span className="sw-ad-legend-dot sw-ad-legend-dot--green" />
                  Completion rate is stable across categories
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      <Card title="Recent Tickets" className="sw-ad-recent-card">
        <div className="sw-ad-table-wrapper">
          <Table
            dataSource={recentTickets}
            pagination={false}
            rowKey="id"
            size="small"
            columns={[
              { title: 'Ticket ID', dataIndex: 'id' },
              { title: 'Service', dataIndex: 'service' },
              { title: 'Customer', dataIndex: 'customer' },
              { title: 'Date', dataIndex: 'date' },
              {
                title: 'Status',
                render: (_, record) => <Tag color={statusColors[record.serviceStatus]}>{record.serviceStatus}</Tag>,
              },
              {
                title: 'Assigned To',
                dataIndex: 'assignedTo',
                render: (text: string) => (text ? text : '-'),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage

