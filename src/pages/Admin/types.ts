

// export type TabKey = 'dashboard' | 'tickets' | 'users' | 'freelancers' | 'vendors'

// export type TicketStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
// export type TicketPriority = 'low' | 'medium' | 'high'
// export type PaymentStatus = 'paid' | 'pending' | 'failed'

// export type Ticket = {
//   id: string
//   customer: string
//   service: string
//   date: string
//   serviceStatus: TicketStatus
//   assignedTo: string
//   priority: TicketPriority
//   paymentStatus: PaymentStatus
//   location: string
// }

// export type UserStatus = 'active' | 'blocked'
// export type User = {
//   id: string
//   name: string
//   email: string
//   joinDate: string
//   status: UserStatus
//   plan: string
//   location: string
// }

// export type VendorStatus = 'active' | 'inactive'
// export type Vendor = {
//   id: string
//   name: string
//   email: string
//   service: string
//   pan: string
//   status: VendorStatus
//   totalOrders: number
//   contact: string
//   location: string
// }

// export type FreelancerStatus = 'pending' | 'approved' | 'rejected'
// export type Freelancer = {
//   id: string
//   name: string
//   email: string
//   skills: string[]
//   completed: number
//   rating: number
//   status: FreelancerStatus
//   age: number
//   city: string
// }

     









export type TabKey = 'dashboard' | 'tickets' | 'users' | 'freelancers' | 'vendors'

export type TicketStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
export type TicketPriority = 'low' | 'medium' | 'high'
export type PaymentStatus = 'paid' | 'pending' | 'failed'

export type Ticket = {
  id: string
  customer: string
  service: string
  date: string
  serviceStatus: TicketStatus
  assignedTo: string
  priority: TicketPriority
  paymentStatus: PaymentStatus
  location: string
}

export type UserStatus = 'active' | 'blocked'
export type User = {
  id: string
  name: string
  email: string
  joinDate: string
  status: UserStatus
  plan: string
  location: string
}

export type VendorStatus = 'active' | 'inactive'
export type Vendor = {
  id: string
  name: string
  email: string
  service: string
  pan: string
  status: VendorStatus
  totalOrders: number
  contact: string
  location: string
}

export type FreelancerStatus = 'pending' | 'approved' | 'rejected'
export type Freelancer = {
  id: string
  name: string
  email: string
  skills: string[]
  completed: number
  rating: number
  status: FreelancerStatus
  age: number
  city: string
  aadhaar: string
  pan: string
}
