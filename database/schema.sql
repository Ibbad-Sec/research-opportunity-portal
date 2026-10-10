-- ============================================
-- Research Opportunity Portal - Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS research_portal;
USE research_portal;

DROP TABLE IF EXISTS opportunities;

CREATE TABLE opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    research_area VARCHAR(150) NOT NULL,
    faculty_name VARCHAR(150) NOT NULL,
    department VARCHAR(150) NOT NULL,
    required_skills TEXT NOT NULL,
    available_positions INT NOT NULL DEFAULT 1,
    application_deadline DATE NOT NULL,
    status ENUM('Open', 'Closed') NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample seed data
INSERT INTO opportunities
(title, description, research_area, faculty_name, department, required_skills, available_positions, application_deadline, status)
VALUES
('AI for Healthcare Diagnostics',
 'Research on machine learning models for early disease detection using medical imaging data.',
 'Artificial Intelligence',
 'Dr. Ayesha Khan',
 'Computer Science',
 'Python, TensorFlow, Data Analysis',
 2,
 '2026-12-31',
 'Open'),

('Sustainable Energy Systems',
 'Investigating solar micro-grids for rural electrification and energy storage optimization.',
 'Renewable Energy',
 'Dr. Bilal Ahmed',
 'Electrical Engineering',
 'MATLAB, Power Systems, IoT',
 3,
 '2026-11-30',
 'Open'),

('Cybersecurity Threat Detection',
 'Building ML-based anomaly detection systems for real-time network traffic monitoring.',
 'Cybersecurity',
 'Dr. Sana Malik',
 'Computer Science',
 'Networking, Python, Machine Learning',
 1,
 '2026-10-15',
 'Open');
