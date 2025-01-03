import {
  LucideAward,
  LucideEdit,
  LucideMessageSquare,
  LucideSearch,
  LucideTrash2,
  LucideUsers,
} from "lucide-react";

export const features = [
  {
    icon: <LucideEdit className="h-10 w-10 text-primary" />,
    title: "Create & Edit Tickets",
    description:
      "Easily create and modify tickets for bugs, issues, or todos with our intuitive interface",
  },
  {
    icon: <LucideSearch className="h-10 w-10 text-primary" />,
    title: "Advanced Search",
    description:
      "Quickly find the tickets you need with our powerful and flexible search feature.",
  },
  {
    icon: <LucideMessageSquare className="h-10 w-10 text-primary" />,
    title: "Collaborative Comments",
    description:
      "Foster teamwork by adding comments and discussions directly to tickets.",
  },
  {
    icon: <LucideTrash2 className="h-10 w-10 text-primary" />,
    title: "Efficient Organization",
    description:
      "Keep your board clean by archiving or deleting completed and unnecessary tickets.",
  },
  {
    icon: <LucideAward className="h-10 w-10 text-primary" />,
    title: "Bounty System",
    description:
      "Motivate your team with rewards for completing high-priority tickets.",
  },
  {
    icon: <LucideUsers className="h-10 w-10 text-primary" />,
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team members, assign tasks, and track progress together.",
  },
];

export const steps = [
  {
    step: 1,
    title: "Sign Up",
    description:
      "Create your account and get started immediately with our user-friendly onboarding process.",
  },
  {
    step: 2,
    title: "Create Tickets",
    description:
      "Add new tickets with detailed titles, descriptions, and relevant tags to categorize your tasks.",
  },
  {
    step: 3,
    title: "Assign & Track",
    description:
      "Easily assign tickets to team members and track progress through customizable workflow stages.",
  },
  {
    step: 4,
    title: "Collaborate",
    description:
      "Foster teamwork by adding comments, attachments, and updates to tickets in real-time.",
  },
  {
    step: 5,
    title: "Resolve & Earn",
    description:
      "Complete tickets efficiently and earn bounties for high-priority or challenging tasks.",
  },
  {
    step: 6,
    title: "Analyze & Improve",
    description:
      "Utilize advanced search and filtering to gain insights and continuously improve your processes.",
  },
];
