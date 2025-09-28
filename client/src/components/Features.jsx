// Features.jsx
import React from "react";

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="col-md-4">
    <div className="p-4 bg-white shadow-sm rounded-3 h-100">
      {/* Icon - Teal Color */}
      <div className="mb-3 fs-2" style={{ color: "#319795" }}>
        {icon} {/* Using emojis or an icon library like Font Awesome */}
      </div>
      {/* Title - Dark Text */}
      <h3 className="fw-bold mb-3" style={{ color: "#2D3748" }}>
        {title}
      </h3>
      {/* Description - Muted Text */}
      <p className="text-secondary">{description}</p>
    </div>
  </div>
);

const Features = () => (
  <section id="features" className="container py-5">
    <div className="row g-4 text-center">
      <FeatureCard
        icon="⚙️"
        title="Task Management"
        description="Simplify your to-do list with customizable views and priority sorting."
      />
      <FeatureCard
        icon="📝"
        title="Smart Notes"
        description="Capture and organize lecture notes, research, and ideas effortlessly."
      />
      <FeatureCard
        icon="🗓️"
        title="Deadline Reminders"
        description="Never miss an assignment with timely, focused alerts and calendar sync."
      />
    </div>
  </section>
);

export default Features;
