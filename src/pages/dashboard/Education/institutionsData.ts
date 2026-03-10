export type Course = {
  name: string
  fee: string
  seats: number
}

export type Branch = {
  city: string
  address: string
  seats: number
  phone: string
}

export type Institution = {
  id: number
  name: string
  city: string
  seats: number
  rating: number
  type: string
  image: string

  students: number
  branches: number
  courses: number
  about: string

  facilities: string[]
  coursesList: Course[]
  branchList: Branch[]
}

export const institutions: Institution[] = [
{
id:1,
name:"Aditya Institutions",
city:"Hyderabad",
seats:45,
rating:4.8,
type:"Graduation",
image:"https://images.unsplash.com/photo-1562774053-701939374585",

students:5000,
branches:3,
courses:5,

about:
"Aditya Institutions is a premier educational institution committed to academic excellence and innovation. Established in 1998, it has consistently produced toppers and leaders across various fields.",

facilities:[
"Transport Facility",
"Library",
"CCTV Surveillance",
"Hostel (Boys)",
"Hostel (Girls)",
"Placement Cell",
"Internship Support",
"Research Labs",
"Innovation Cell",
"Auditorium",
"Seminar Halls",
"WiFi Campus",
"Cafeteria",
"Sports Complex"
],

coursesList:[
{name:"B.Tech (CSE)",fee:"₹1,20,000 / yr",seats:180},
{name:"B.Tech (ECE)",fee:"₹1,10,000 / yr",seats:120},
{name:"B.Sc (Computer Sci)",fee:"₹45,000 / yr",seats:60},
{name:"B.Com (General)",fee:"₹30,000 / yr",seats:100},
{name:"BBA",fee:"₹50,000 / yr",seats:60}
],

branchList:[
{
city:"Hyderabad",
address:"Madhapur, Hi-Tech City",
seats:120,
phone:"+91 98765 43210"
},
{
city:"Bangalore",
address:"Koramangala Sector 5",
seats:90,
phone:"+91 91234 56789"
},
{
city:"Vijayawada",
address:"Benz Circle, MG Road",
seats:75,
phone:"+91 99988 77665"
}
]
},

{
id:2,
name:"Sri Chaitanya Academy",
city:"Hyderabad",
seats:50,
rating:4.6,
type:"Inter",
image:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&q=80",

students:4000,
branches:4,
courses:6,

about:"Sri Chaitanya Academy focuses on IIT-JEE and NEET coaching with world-class faculty.",

facilities:[
"Library",
"Hostel",
"Transport",
"Digital Classrooms",
"Sports",
"WiFi Campus"
],

coursesList:[
{name:"MPC",fee:"₹80,000 / yr",seats:200},
{name:"BiPC",fee:"₹85,000 / yr",seats:150}
],

branchList:[
{
city:"Hyderabad",
address:"Ameerpet",
seats:150,
phone:"+91 90000 12345"
}
]
},

{
id:3,
name:"Narayana Group",
city:"Delhi",
seats:88,
rating:4.7,
type:"High School",
image:"https://images.unsplash.com/photo-1509062522246-3755977927d7",

students:3500,
branches:2,
courses:4,

about:"Narayana provides high-quality school education with strong academic performance.",

facilities:[
"Library",
"Smart Classrooms",
"Sports Ground",
"Cafeteria"
],

coursesList:[
{name:"CBSE Grade 8",fee:"₹40,000 / yr",seats:120}
],

branchList:[
{
city:"Delhi",
address:"Rohini Sector 10",
seats:120,
phone:"+91 91111 22222"
}
]
},

{
id:4,
name:"Vibrant Academy",
city:"Kota",
seats:5,
rating:4.5,
type:"Training",
image:"https://images.unsplash.com/photo-1523240795612-9a054b0db644",

students:2000,
branches:1,
courses:3,

about:"Vibrant Academy is known for top IIT-JEE coaching results.",

facilities:[
"Hostel",
"Library",
"Digital Classes"
],

coursesList:[
{name:"IIT JEE Advanced",fee:"₹1,50,000 / yr",seats:60}
],

branchList:[
{
city:"Kota",
address:"Talwandi",
seats:60,
phone:"+91 93333 44444"
}
]
},

{
id:5,
name:"Oxford Public School",
city:"Mumbai",
seats:40,
rating:4.4,
type:"Primary School",
image:"https://images.unsplash.com/photo-1580582932707-520aed937b7b",

students:1200,
branches:1,
courses:6,

about:"Oxford Public School offers quality education with modern infrastructure.",

facilities:[
"Library",
"Playground",
"CCTV",
"Transport"
],

coursesList:[
{name:"Primary School",fee:"₹25,000 / yr",seats:80}
],

branchList:[
{
city:"Mumbai",
address:"Andheri East",
seats:80,
phone:"+91 95555 66666"
}
]
}
]