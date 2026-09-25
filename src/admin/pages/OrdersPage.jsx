import React, { useState } from 'react';
import { ShoppingBag, Eye, Calendar, MapPin, Mail, Phone, Clock, CheckCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Table from '../components/UI/Table';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';

const OrdersPage = () => {
  const { orders, changeOrderStatus, loading } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    await changeOrderStatus(orderId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8906D] font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>TRANSACTION AUDIT</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#174A43] font-normal tracking-tight mt-1">
            Order Management
          </h1>
        </div>

        {/* Filter by Status */}
        <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-sans text-[#383028]/60 uppercase tracking-wider font-semibold">
            Filter Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-sans text-[#174A43] font-medium bg-transparent focus:outline-none"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Data Table: Order ID, Customer Name, Date, Total Amount, Status (Dropdown), Actions */}
      <Table
        headers={['Order ID', 'Customer Name', 'Date', 'Total Amount', 'Fulfillment Status', 'Actions']}
        loading={loading}
        colSpan={6}
        emptyMessage="No orders found for the selected status filter."
      >
        {filteredOrders.map((order) => (
          <tr key={order.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
            {/* Order ID */}
            <td className="py-4 px-5 font-mono text-xs font-semibold text-[#174A43]">
              {order.id}
            </td>

            {/* Customer Name & Email */}
            <td className="py-4 px-5">
              <div className="font-medium text-[#174A43] font-serif text-sm">
                {order.customer}
              </div>
              <div className="text-[11px] font-sans text-[#383028]/60">
                {order.email}
              </div>
            </td>

            {/* Date */}
            <td className="py-4 px-5 font-sans text-xs text-[#383028]/70">
              {order.date}
            </td>

            {/* Total Amount */}
            <td className="py-4 px-5 font-serif font-semibold text-[#174A43] text-sm">
              ₹{Number(order.amount).toLocaleString()}
            </td>

            {/* Status Update Dropdown: triggers PUT request */}
            <td className="py-4 px-5">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full border focus:outline-none transition-colors ${
                  order.status === 'Delivered'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : order.status === 'Shipped'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-orange-50 text-orange-800 border-orange-300'
                }`}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>

            {/* Actions: View Details */}
            <td className="py-4 px-5 text-right">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* View Details Side Drawer / Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details &bull; ${selectedOrder?.id}`}
        subtitle="Complete shipping manifest and bespoke line items."
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Top Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#F9F6F0] border border-[#DBC3A5]/40 text-xs font-sans">
              <div>
                <span className="text-[#383028]/60 uppercase tracking-wider block">Date Placed</span>
                <strong className="text-[#174A43] font-medium mt-0.5 block">{selectedOrder.date}</strong>
              </div>
              <div>
                <span className="text-[#383028]/60 uppercase tracking-wider block">Order Status</span>
                <span className="text-[#A95732] font-semibold mt-0.5 block">{selectedOrder.status}</span>
              </div>
              <div>
                <span className="text-[#383028]/60 uppercase tracking-wider block">Total Transaction</span>
                <strong className="text-[#174A43] font-serif text-sm block">
                  ₹{Number(selectedOrder.amount).toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Customer & Shipping Manifest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
                <h4 className="font-serif text-sm font-semibold text-[#174A43]">
                  Client Information
                </h4>
                <div className="text-xs font-sans text-[#383028]/80 space-y-1">
                  <p><strong>Name:</strong> {selectedOrder.customer}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Contact:</strong> {selectedOrder.phone || '+91 98201 44821'}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
                <h4 className="font-serif text-sm font-semibold text-[#174A43]">
                  Destination Address
                </h4>
                <div className="text-xs font-sans text-[#383028]/80 space-y-1">
                  <p>{selectedOrder.shippingAddress}</p>
                  <p className="text-[11px] text-[#A95732]">Insured White-Glove Courier</p>
                </div>
              </div>
            </div>

            {/* Items Ordered List */}
            <div>
              <h4 className="font-serif text-base font-medium text-[#174A43] mb-3">
                Items In This Order
              </h4>
              <div className="space-y-3">
                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-[#F9F6F0]/40"
                  >
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={item.image || '/images/hero.jpg'}
                        alt={item.name}
                        className="w-14 h-16 object-cover rounded-lg border border-gray-200"
                      />
                      <div>
                        <h5 className="font-serif text-sm font-medium text-[#174A43]">
                          {item.name}
                        </h5>
                        <p className="text-xs font-sans text-[#383028]/60 mt-0.5">
                          Quantity: {item.qty || 1} &bull; Hand-packaged with seal
                        </p>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-semibold text-[#174A43]">
                      ₹{Number(item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                Close Manifest
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
