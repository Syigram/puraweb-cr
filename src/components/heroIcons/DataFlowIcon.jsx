import React from "react";

export default function DataFlowIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
      <defs>
        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#002B7F" />
          <stop offset="100%" stopColor="#1e5ba8" />
        </linearGradient>
        <linearGradient id="flowGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#CE1126" />
          <stop offset="100%" stopColor="#a00a20" />
        </linearGradient>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#e5e7eb" strokeWidth="1" />

      {/* Left column - input */}
      <rect x="40" y="70" width="35" height="60" fill="none" stroke="url(#flowGrad1)" strokeWidth="2" rx="2" />
      <circle cx="57.5" cy="95" r="4" fill="#002B7F" />
      <circle cx="57.5" cy="110" r="3" fill="#002B7F" opacity="0.6" />

      {/* Flow arrows */}
      <g stroke="#CE1126" strokeWidth="2">
        <path d="M 80 95 Q 90 90 100 95" fill="none" />
        <polygon points="105,95 100,92 103,95" fill="#CE1126" />
        
        <path d="M 80 110 Q 90 115 100 110" fill="none" />
        <polygon points="105,110 100,113 103,110" fill="#CE1126" />
      </g>

      {/* Center processing circle */}
      <circle cx="100" cy="100" r="12" fill="url(#flowGrad2)" />
      <circle cx="100" cy="100" r="6" fill="white" opacity="0.8" />

      {/* Right column - output */}
      <rect x="125" y="70" width="35" height="60" fill="none" stroke="url(#flowGrad1)" strokeWidth="2" rx="2" />
      <circle cx="142.5" cy="90" r="4" fill="#002B7F" />
      <circle cx="142.5" cy="105" r="3" fill="#002B7F" opacity="0.6" />
      <circle cx="142.5" cy="118" r="2" fill="#002B7F" opacity="0.4" />

      {/* Output arrows */}
      <g stroke="#002B7F" strokeWidth="2" opacity="0.5">
        <path d="M 115 95 Q 120 95 125 95" fill="none" />
        <path d="M 115 110 Q 120 110 125 110" fill="none" />
      </g>

      {/* Decorative locks - security indicator */}
      <g opacity="0.3">
        <rect x="95" y="130" width="10" height="12" fill="none" stroke="#002B7F" strokeWidth="1" />
        <circle cx="100" cy="135" r="2" fill="#002B7F" />
      </g>
    </svg>
  );
}