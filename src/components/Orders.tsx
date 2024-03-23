import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { useUser } from '@/store/useUser';
import { useLoading } from '@/store/useLoading';
import services from '@/utils/service';
import { delay } from '@/lib/utils';
import { toast } from 'sonner';
import ButtonWithLoading from './ui/button-loading';

export interface IOrdersrops {
  orders: Order[] | null;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const Orders = ({ orders, setOrders }: IOrdersrops) => {
  const { showButtonLoading, hideButtonLoading } = useLoading();
  const { getUserData } = useUser();
  const [canceled, setCanceled] = useState('');

  const onCancelOrder = async (order_id: string, title: string) => {
    showButtonLoading();
    setCanceled(order_id);
    const { error, message } = await services.deleteOrderBook(order_id);

    await delay(1000);

    if (error) {
      toast.error(message);
      hideButtonLoading();
    }

    if (!error) {
      toast.success(`${message} for ${title}`);
      setOrders((prev) => prev.filter((order) => order.order_id !== order_id));
      getUserData();
    }
    hideButtonLoading();
  };

  if (!orders) {
    return null;
  }
  return (
    <>
      {orders?.length > 0 ? (
        orders.map((order) => (
          <Card key={order.order_id}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <Image
                width={200}
                height={200}
                src={order.book.cover}
                alt={order.book.title}
                className="object-contain h-48"
              />
            </CardContent>
            <CardFooter className="text-center flex flex-col ">
              <CardTitle>{order.book.title}</CardTitle>
              <CardDescription>
                <p>Writer: {order.writer.name}</p>
                <p>Point: {order.point}</p>
              </CardDescription>
              <ButtonWithLoading
                variant="destructive"
                className="mt-2"
                onClick={() => onCancelOrder(order.order_id, order.book.title)}
                loadingContent={order.order_id === canceled && 'Canceling'}
                buttonContent="Cancel Order"
              />
            </CardFooter>
          </Card>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Orders;
