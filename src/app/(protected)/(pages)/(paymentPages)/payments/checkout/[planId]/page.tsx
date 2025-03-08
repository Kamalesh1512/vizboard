import React from 'react'
import CustomerPaymentForm from '../_components/customer-form'
import { dodoPaymentsClient } from '@/lib/dodoPayments'


interface CheckoutProps{
  params:Promise<{
    planId:string
  }>
}

const Checkout = async ({params}:CheckoutProps) => {

  const {planId} = await params

  const Product = await dodoPaymentsClient.products.retrieve(planId);

  if(!Product || !Product?.description){
    return (<div>Product not Found</div>);
  }
   // checkout page
  return (
    <div className="w-full px-3 lg:px-10 mt-10">
    <div className="flex flex-col lg:flex-row bg-primary-foreground rounded-r-xl">
      <CustomerPaymentForm ProductDetails={Product}/>
    </div>
  </div>
  )
}

export default Checkout