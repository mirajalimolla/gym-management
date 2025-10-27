// src/components/Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh">
      {/*  Sidebar  */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/*  Page  */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}