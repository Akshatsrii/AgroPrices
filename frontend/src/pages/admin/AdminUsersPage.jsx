import React from 'react';

const USERS_ADMIN = [
  { name: 'Gurpreet Singh', phone: '+91 9876543210', location: 'Ludhiana, Punjab', status: 'Active' },
  { name: 'Harpreet Sharma', phone: '+91 98140 55443', location: 'Karnal, Haryana', status: 'Active' },
  { name: 'Ramesh Patel', phone: '+91 94250 11223', location: 'Indore, MP', status: 'Active' },
];

export function AdminUsersPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">User & Farmer Management 👨‍🌾</h1>
        <p className="text-xs text-gray-500 m-0">Directory of registered farmers and activity logs.</p>
      </div>

      <div className="space-y-3">
        {USERS_ADMIN.map((u, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center text-xs">
            <div>
              <strong className="text-slate-900 font-extrabold block text-sm">{u.name}</strong>
              <span className="text-gray-400">{u.phone} • {u.location}</span>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl">
              {u.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
