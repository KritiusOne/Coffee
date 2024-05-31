import React, { useState } from "react";
import { Layout } from "../components/UI/Layout";
import { Button } from "../components/UI/Button";
import { ProductsTextInfo } from "../components/ProductsTextInfo";
import { Input } from "../components/UI/Input";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export const Reservation: React.FC = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleValueChange = (newValue: DateValueType) => {
    const actualDate = new Date
    if (newValue?.startDate != null && newValue.startDate < actualDate){
      setValue(newValue);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col w-4/5 gap-3 mx-auto justify-center items-center py-8">
        <h2 className="text-3xl font-semibold font-serif text-dark">Reservacion</h2>
        <ProductsTextInfo />
        <form className="flex flex-col gap-3 w-3/5">
          <Input typeInput="text" placeholder="Nombre"/>
          <Input typeInput="text" placeholder="email"/>
          <Input typeInput="text" placeholder="Telefono"/>
          <Datepicker primaryColor="yellow" asSingle={true} value={value} onChange={handleValueChange} />
          <Input placeholder="Time"/>
          <textarea className="resize-none border-2 border-dark border-solid">

          </textarea>
        </form>
        <Button>Realizar reservacion</Button>
      </div>
    </Layout>
  )
}