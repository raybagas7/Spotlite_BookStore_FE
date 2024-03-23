import { fetchOrders } from '@/actions/fetch-orders';
import AsideInformation from '@/components/AsideInformation';
import MainLayout from '@/components/Layout/MainLayout';
import OrderLoad from '@/components/OrderLoad';
import Spinner from '@/components/ui/spinner';
import React, { ReactElement, useEffect, useState } from 'react';

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrder = async () => {
      const orders = await fetchOrders(1, 12);
      if (orders) {
        setOrders(orders);
      }
    };

    getOrder();
  }, []);

  if (!orders) {
    return <Spinner />;
  }

  console.log(orders);

  return (
    <main className="container mx-auto p-4 min-h-screen max-w-5xl mt-10">
      <AsideInformation />
      <h1 className="text-center my-4 text-5xl font-bold">My Order List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <OrderLoad orders={orders} setOrders={setOrders} />
      </div>
    </main>
  );
};

export default Order;

Order.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};