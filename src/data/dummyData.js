export const users = [
    {
      id: 1,
      email: "venkat@gmail.com",
      password: "password123",
      name: "Alice",
    },
    {
      id: 2,
      email: "chitti@yahoo.com",
      password: "password456",
      name: "Bob",
    },
  ];
  
  export const ideas = [
    {
      id: 1,
      title: "Smartwatch 2.0",
      description: "Advanced AI health monitoring watch",
      status: "Submitted",
      userId: 1, // belongs to Alice
    },
    {
      id: 2,
      title: "Flying Drone X",
      description: "Drone with AI-based path optimization",
      status: "In Progress",
      userId: 1, // belongs to Alice
    },
    {
      id: 3,
      title: "AI-Powered Bike",
      description: "Bike with smart route and fitness tracking",
      status: "Launch Ready",
      userId: 2, // belongs to Bob
    },
  ];
  