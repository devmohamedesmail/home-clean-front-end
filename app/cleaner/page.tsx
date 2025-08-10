import React from 'react'
import CleanerHomeItem from '../items/cleaner_home_item'
import { TbBrandBooking } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";

export default function CleanerHome() {
    return (
        <div className='container m-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
            <CleanerHomeItem label="New Booking" count={30} />
            <CleanerHomeItem label="Revenue" count={3000}  />
            <CleanerHomeItem label="Paid Commissions" count={2000}  />
            <CleanerHomeItem label="Net Profit" count={3000}  />
            <CleanerHomeItem label="Capacity OverLoad" count={'50%'} />
            <CleanerHomeItem label="New Booking" count={500}  />
            <CleanerHomeItem label="New Booking" count={300}  />
        </div>
    )
}
