import React, { useState } from 'react';
import { Eye, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useCart();
  const { language } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered'>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-500" size={16} />;
      case 'confirmed': return <CheckCircle className="text-blue-500" size={16} />;
      case 'shipped': return <Truck className="text-orange-500" size={16} />;
      case 'delivered': return <Package className="text-green-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const selectedOrderData = selectedOrder ? orders.find(o => o.id === selectedOrder) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الطلبيات</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'الكل' : getStatusText(status)}
              {status === 'all' 
                ? ` (${orders.length})`
                : ` (${orders.filter(o => o.status === status).length})`
              }
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          {sortedOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">لا توجد طلبيات</p>
            </div>
          ) : (
            sortedOrders.map(order => (
              <div
                key={order.id}
                className={`bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer ${
                  selectedOrder === order.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedOrder(order.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">طلب #{order.id.slice(-6)}</h3>
                    <p className="text-gray-600">{order.customerInfo.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('ar-DZ')}
                    </p>
                  </div>
                  <div className="text-left">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} mb-2`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      {order.total.toLocaleString()} دج
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{order.items.length} منتج</span>
                  <span>{order.customerInfo.wilaya} - {order.customerInfo.commune}</span>
                  <span>{order.shippingType === 'home' ? 'توصيل منزلي' : 'مكتب التوصيل'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          {selectedOrderData ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">تفاصيل الطلب #{selectedOrderData.id.slice(-6)}</h3>
                
                {/* Customer Info */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">معلومات العميل</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>الاسم:</strong> {selectedOrderData.customerInfo.fullName}</p>
                    {selectedOrderData.customerInfo.phone && (
                      <p><strong>الهاتف:</strong> {selectedOrderData.customerInfo.phone}</p>
                    )}
                    <p><strong>الولاية:</strong> {selectedOrderData.customerInfo.wilaya}</p>
                    <p><strong>البلدية:</strong> {selectedOrderData.customerInfo.commune}</p>
                    <p><strong>نوع التوصيل:</strong> {selectedOrderData.shippingType === 'home' ? 'توصيل منزلي' : 'مكتب التوصيل'}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">المنتجات</h4>
                  <div className="space-y-2">
                    {selectedOrderData.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium">{item.name[language]}</p>
                          {item.selectedFlavor && <p className="text-gray-600">النكهة: {item.selectedFlavor}</p>}
                          {item.selectedSize && <p className="text-gray-600">الحجم: {item.selectedSize}</p>}
                        </div>
                        <div className="text-left">
                          <p>الكمية: {item.quantity}</p>
                          <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} دج</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>المنتجات</span>
                    <span>{(selectedOrderData.total - selectedOrderData.shippingCost).toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>التوصيل</span>
                    <span>{selectedOrderData.shippingCost.toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>المجموع</span>
                    <span className="text-green-600">{selectedOrderData.total.toLocaleString()} دج</span>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h4 className="font-medium mb-2">تحديث حالة الطلب</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['pending', 'confirmed', 'shipped', 'delivered'].map(status => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrderData.id, status as any)}
                        className={`p-2 rounded text-sm font-medium transition-colors ${
                          selectedOrderData.status === status
                            ? getStatusColor(status)
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {getStatusText(status)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Eye size={48} className="mx-auto mb-4 text-gray-300" />
              <p>اختر طلباً لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};