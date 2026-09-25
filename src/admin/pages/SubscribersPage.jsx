import React, { useState } from 'react';
import { Users, Download, Search, Mail, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';

const SubscribersPage = () => {
  const { subscribers, exportSubscribers, loading } = useAdmin();
  const [search, setSearch] = useState('');

  const filteredSubs = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with "Export to CSV" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8906D] font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>AUDIENCE AUDIT</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1">
            Subscriber Management
          </h1>
        </div>

        {/* Action: "Export to CSV" Button */}
        <Button
          variant="primary"
          icon={Download}
          onClick={exportSubscribers}
          className="shadow-copper"
        >
          Export to CSV
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-[#383028]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscribed email address..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/40 text-xs font-sans focus:outline-none focus:border-[#C8906D]"
          />
        </div>

        <div className="text-xs font-sans text-[#383028]/70">
          Total Subscribers: <strong className="text-[#174A43]">{subscribers.length}</strong>
        </div>
      </div>

      {/* Data Table: Columns for Email Address and Date Subscribed */}
      <Table
        headers={['Email Address', 'Date Subscribed', 'Status', 'Newsletter Audience']}
        loading={loading}
        colSpan={4}
        emptyMessage="No subscribers found matching your query."
      >
        {filteredSubs.map((sub) => (
          <tr key={sub.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
            {/* Email Address */}
            <td className="py-4 px-5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#174A43]/10 text-[#174A43] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-sans text-sm font-medium text-[#174A43]">
                  {sub.email}
                </span>
              </div>
            </td>

            {/* Date Subscribed */}
            <td className="py-4 px-5 font-sans text-xs text-[#383028]/70">
              {sub.date}
            </td>

            {/* Status */}
            <td className="py-4 px-5">
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active &bull; Opted-In
              </span>
            </td>

            {/* Newsletter Segment */}
            <td className="py-4 px-5 font-sans text-xs text-[#383028]/60">
              Lumière Society Autumn Lookbook
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default SubscribersPage;
