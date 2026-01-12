import React, { useState } from "react";
import { Card, Button, Space, Tag } from "antd";
import {
  EnvironmentOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Students.css";

interface Student {
  id: string;
  name: string;
  degree: string;
  location: string;
  distance: string;
  institute: string;
  aggregate: number;
}

type StudentsProps = {
  onBack?: () => void;
};

const students: Student[] = [
  {
    id: "STU002",
    name: "Rohan Kumar",
    degree: "MBA Finance",
    location: "Mumbai",
    distance: "5.2 km away",
    institute: "IIM Mumbai",
    aggregate: 9.2,
  },
  {
    id: "STU004",
    name: "Arjun Reddy",
    degree: "B.Tech Computer Science",
    location: "Hyderabad",
    distance: "8.4 km away",
    institute: "IIIT Hyderabad",
    aggregate: 9,
  },
  {
    id: "STU001",
    name: "Ananya Sharma",
    degree: "B.Tech Computer Science",
    location: "Bangalore",
    distance: "2.5 km away",
    institute: "IIT Bangalore",
    aggregate: 8.9,
  },
  {
    id: "STU005",
    name: "Sneha Singh",
    degree: "BBA Marketing",
    location: "Delhi",
    distance: "12 km away",
    institute: "Delhi University",
    aggregate: 8.7,
  },
  {
    id: "STU003",
    name: "Priya Patel",
    degree: "B.Sc Data Science",
    location: "Pune",
    distance: "3.1 km away",
    institute: "MIT Pune",
    aggregate: 8.5,
  },
  {
    id: "STU006",
    name: "Vikram Joshi",
    degree: "B.Tech Mechanical",
    location: "Chennai",
    distance: "15.5 km away",
    institute: "Anna University",
    aggregate: 8.3,
  },
 
];

const colleges = [
  "All Colleges",
  "IIT Bangalore",
  "IIM Mumbai",
  "MIT Pune",
  "IIIT Hyderabad",
  "Delhi University",
  "Anna University",
];

const getDistanceValue = (distance: string): number => {
  return parseFloat(distance); // "5.2 km away" → 5.2
};



const Students: React.FC<StudentsProps> = ({ onBack }) => {

  // State for selected filters
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [selectedSort, setSelectedSort] = useState("Student Aggregate");

  const filteredAndSortedStudents = students
  // FILTER BY COLLEGE
  .filter((student) => {
    if (selectedCollege === "All Colleges") return true;
    return student.institute === selectedCollege;
  })
  // SORT
  .sort((a, b) => {
    if (selectedSort === "Student Aggregate") {
      return b.aggregate - a.aggregate; // DESCENDING
    }

    if (selectedSort === "Location (Nearby)") {
      return (
        getDistanceValue(a.distance) - getDistanceValue(b.distance)
      ); // NEAREST FIRST
    }

    return 0;
  });


  return (
   
   <div>
    <div className="sw-s-header">
  <div className="sw-s-header-inner">
<span
  className="sw-s-back-arrow"
  onClick={() => onBack?.()}
>
  ←
</span>
    <span className="sw-s-header-title">Students</span>
  </div>
</div>
     <div className="sw-s-wrapper">
      {/* Page Header */}
   

      {/* Filter by College */}
      <Card className="sw-s-card">
        <h3>Filter by College</h3>
        <Space wrap>
          {colleges.map((college) => (
            <Tag
              key={college}
              className={`sw-s-filter-tag ${
                selectedCollege === college ? "sw-s-active" : ""
              }`}
              onClick={() => setSelectedCollege(college)}
            >
              {college}
            </Tag>
          ))}
        </Space>
      </Card>

      {/* Sort By */}
      <Card className="sw-s-card">
        <h3>Sort By</h3>
        <div className="sw-s-sort-container">
             <Space>
          <Button
           type="text"
            className={`sw-s-sort-btn ${
              selectedSort === "Location (Nearby)" ? "sw-s-active" : ""
            }`}
            onClick={() => setSelectedSort("Location (Nearby)")}
          >
            Location (Nearby)
          </Button>
          <Button
            className={`sw-s-sort-btn ${
              selectedSort === "Student Aggregate" ? "sw-s-active" : ""
            }`}
            onClick={() => setSelectedSort("Student Aggregate")}
          >
            Student Aggregate
          </Button>
        </Space>
        </div>
       
      </Card>

      {/* Student Cards */}
      {filteredAndSortedStudents.map((student) => (
        <Card key={student.id} className="sw-s-card">
          {/* DETAILS + AGGREGATE ROW */}
          <div className="sw-s-top-row">
            {/* Details (includes name) */}
            <div className="sw-s-details">
              <h2 className="sw-s-name">{student.name}</h2>

              <div className="sw-s-row">
                <UserOutlined />
                <span>{student.degree}</span>
              </div>

              <div className="sw-s-row">
                <IdcardOutlined />
                <span>ID: {student.id}</span>
              </div>

              <div className="sw-s-row">
                <EnvironmentOutlined />
                <span>
                  {student.location} ({student.distance})
                </span>
              </div>

              <div className="sw-s-institute">{student.institute}</div>
            </div>

            {/* Aggregate */}
            <div className="sw-s-aggregate-box">
              <div className="sw-s-aggregate-score">{student.aggregate}</div>
              <div className="sw-s-aggregate-label">Aggregate</div>
            </div>
          </div>

          {/* Divider */}
          <div className="sw-s-divider" />

          {/* Button */}
          <Button className="sw-s-btn" block>
            View Profile
          </Button>
        </Card>
      ))}
    </div>
   </div>
  );
};

export default Students;  
